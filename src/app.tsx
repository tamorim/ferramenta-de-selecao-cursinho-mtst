import { useState, useRef } from "react";
import { SearchBox } from "@mapbox/search-js-react";
import { read, utils, writeFile } from "xlsx";

import "./styles/styles.css";

import {
  MAPBOX_API_TOKEN,
  TRANSPORTATIONS,
  NOT_FOUND,
  DEFAULT_PAGE_NAME,
  DEFAULT_FILE_NAME,
  ColumnPosition,
} from "./constants";

import {
  readUploadedFile,
  fetchCoordinatesGMaps,
  fetchDirectionsGMaps,
} from "./utils";

import {
  Transportation,
  Spinner,
  TableInfo,
  Table,
  Footer,
} from "./components";

import type { ChangeEvent } from "react";
import type {
  SearchBoxRetrieveResponse,
  SearchBoxFeatureSuggestion,
} from "@mapbox/search-js-core";

import type { FileHeaders, Row } from "./types";
import type { FetchDirectionsGMapsRoute } from "./utils/fetchDirectionsGMaps";

export default function App() {
  const [search, setSearch] = useState("");
  const [uploadedFile, setUploadedFile] = useState<FileHeaders[]>([]);
  const [placeIds, setPlaceIds] = useState<(string | undefined)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const uploadButtonRef = useRef<HTMLInputElement>(null);

  const [transportation, setTransportation] = useState<TRANSPORTATIONS>(
    TRANSPORTATIONS.WALKING,
  );

  const [retrievedSearch, setRetrievedSearch] = useState<
    SearchBoxFeatureSuggestion | undefined
  >();

  const [directions, setDirections] = useState<
    (FetchDirectionsGMapsRoute | undefined)[]
  >([]);

  const notFoundCoordinatesCount =
    placeIds?.filter((placeId, index) => {
      const [name, address] = uploadedFile[index];

      return name && address && !placeId;
    }).length ?? 0;

  const notFoundDirectionsCount =
    directions?.filter((direction, index) => {
      const [name, address] = uploadedFile[index];
      const placeId = placeIds[index];

      return name && address && placeId && !direction;
    }).length ?? 0;

  const handleSearchRetrieve = (value: SearchBoxRetrieveResponse) => {
    setRetrievedSearch(value.features[0]);
  };

  const handleTransportationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTransportation(event.target.value as TRANSPORTATIONS);
  };
  null;

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const unparsedFile = await readUploadedFile(files[0]);
    const parsedFile = read(unparsedFile);

    const jsonFile = utils.sheet_to_json(
      parsedFile.Sheets[parsedFile.SheetNames[0]],
      { header: 1, defval: null },
    ) as FileHeaders[];

    setUploadedFile(jsonFile.slice(1));
  };

  const handleGetDirections = async () => {
    setPlaceIds([]);
    setDirections([]);
    setRows([]);
    setIsLoading(true);

    if (!uploadedFile) {
      return;
    }

    const retrievedPlaceIds = await Promise.all(
      uploadedFile.map(async (row) => {
        const address = row[ColumnPosition.ADDRESS];
        if (!address) {
          return;
        }

        return await fetchCoordinatesGMaps(address);
      }),
    );

    const retrievedDirections = await Promise.all(
      retrievedPlaceIds.map<Promise<FetchDirectionsGMapsRoute | undefined>>(
        async (placeId) => {
          if (!placeId) {
            return;
          }

          const response = await fetchDirectionsGMaps(
            placeId,
            retrievedSearch.geometry.coordinates,
            transportation,
          );

          return response?.routes?.[0];
        },
      ),
    );

    const fileWithDirections = uploadedFile
      .map<Row>((row, index) => {
        const name = row[ColumnPosition.NAME];
        const socialName = row[ColumnPosition.SOCIAL_NAME];
        const hasDisability = row[ColumnPosition.HAS_DISABILITY];
        const race = row[ColumnPosition.RACE];
        const income = row[ColumnPosition.INCOME];
        const education = row[ColumnPosition.EDUCATION];
        const highschool = row[ColumnPosition.HIGHSCHOOL];
        const courseLocation = row[ColumnPosition.COURSE_LOCATION];
        const saturdayAvailability = row[ColumnPosition.SATURDAY_AVAILABILITY];
        const occupationName = row[ColumnPosition.OCCUPATION_NAME];
        const address = row[ColumnPosition.ADDRESS];
        const direction = retrievedDirections[index];

        const isMemberOfOccupation =
          row[ColumnPosition.IS_MEMBER_OF_OCCUPATION];

        return [
          name,
          socialName,
          hasDisability,
          race,
          income,
          education,
          highschool,
          courseLocation,
          saturdayAvailability,
          isMemberOfOccupation,
          occupationName,
          address,
          direction?.distance,
          direction?.duration,
        ];
      })
      .sort((a, b) => {
        const distanceA = (a[12] as google.maps.Distance)?.value;
        const distanceB = (b[12] as google.maps.Distance)?.value;

        if ((distanceA && !distanceB) || distanceA < distanceB) {
          return -1;
        }

        if ((!distanceA && distanceB) || distanceA > distanceB) {
          return 1;
        }

        return 0;
      });

    setPlaceIds(retrievedPlaceIds);
    setDirections(retrievedDirections);
    setRows(fileWithDirections);
    setIsLoading(false);
  };

  const handleDownload = () => {
    if (!rows) {
      return;
    }

    const transformedRows = rows
      .map((row) => {
        const name = row[0];
        const address = row[11];
        const distance = row[12];
        const duration = row[13];

        return {
          Nome: name,
          Endereço: address,
          Distância: distance?.text ?? NOT_FOUND,
          Duração: duration?.text ?? NOT_FOUND,
        };
      })
      .filter(({ Nome, Endereço }) => Nome && Endereço);

    const worksheet = utils.json_to_sheet(transformedRows);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, DEFAULT_PAGE_NAME);
    writeFile(workbook, DEFAULT_FILE_NAME, { compression: true });
  };

  const handleReset = () => {
    if (uploadButtonRef.current) {
      uploadButtonRef.current.value = "";
    }

    setUploadedFile([]);
    setPlaceIds([]);
    setDirections([]);
    setRows([]);
    setIsLoading(false);
  };

  return (
    <>
      <h1 className="title">Ordenador de planilha por endereço</h1>

      <div className="searchbox-wrapper">
        <SearchBox
          accessToken={MAPBOX_API_TOKEN}
          options={{ language: "pt", country: "BR" }}
          value={search}
          onChange={setSearch}
          onRetrieve={handleSearchRetrieve}
        />
      </div>

      <Transportation
        value={transportation}
        onChange={handleTransportationChange}
      />

      <div className="buttons-wrapper">
        <input
          ref={uploadButtonRef}
          className="upload-button"
          type="file"
          accept=".xls,.xlsx,application/msexcel,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={handleUpload}
        />

        <div className="calculate-buttons-container">
          <button
            className="calculate-button"
            disabled={!retrievedSearch || !uploadedFile || isLoading}
            onClick={handleGetDirections}
          >
            Calcular distâncias
          </button>

          <button
            className="reset-button"
            disabled={!uploadedFile.length || isLoading}
            onClick={handleReset}
          >
            Limpar
          </button>
        </div>
      </div>

      {isLoading ? <Spinner /> : null}

      {rows?.length ? (
        <div className="table-container">
          <TableInfo
            notFoundCoordinatesCount={notFoundCoordinatesCount}
            notFoundDirectionsCount={notFoundDirectionsCount}
            onDownload={handleDownload}
          />

          <Table
            rows={rows}
            destination={retrievedSearch.properties.full_address}
            transportation={transportation}
          />

          <p className="powered-by-google">
            Powered by{" "}
            <img src="https://cdn.glitch.global/1e6131d5-39ad-425c-8590-0ec8aa67c53f/google_logo.png?v=1740154927550" />
          </p>
        </div>
      ) : null}

      <Footer />
    </>
  );
}
