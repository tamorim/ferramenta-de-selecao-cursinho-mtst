import { useState } from "react";
import { SearchBox } from "@mapbox/search-js-react";
import { read, utils, writeFile } from "xlsx";

import "./styles/styles.css";

import {
  MAPBOX_API_TOKEN,
  TRANSPORTATIONS,
  NOT_FOUND,
  DEFAULT_PAGE_NAME,
  DEFAULT_FILE_NAME,
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

type FileWithDirections = Array<
  [
    person: string,
    address: string,
    distance: google.maps.Distance,
    duration: google.maps.Duration,
  ]
>;

export default function App() {
  const [search, setSearch] = useState("");
  const [retrievedSearch, setRetrievedSearch] =
    useState<SearchBoxFeatureSuggestion | null>(null);
  const [transportation, setTransportation] = useState(TRANSPORTATIONS.WALKING);
  const [uploadedFile, setUploadedFile] = useState<string[][] | null>(null);
  const [placeIds, setPlaceIds] = useState<string[]>([]);
  const [directions, setDirections] = useState<string[]>([]);
  const [sortedFile, setSortedFile] = useState<FileWithDirections | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const notFoundCoordinatesCount =
    placeIds?.filter((placeId, index) => {
      if (!uploadedFile) {
        return;
      }

      const [person, address] = uploadedFile[index];

      return person && address && !placeId;
    }).length ?? 0;

  const notFoundDirectionsCount =
    directions?.filter((direction, index) => {
      if (!uploadedFile) {
        return;
      }

      const [person, address] = uploadedFile[index];
      const placeId = placeIds[index];

      return person && address && placeId && !direction;
    }).length ?? 0;

  const handleSearchRetrieve = (value: SearchBoxRetrieveResponse) => {
    setRetrievedSearch(value.features[0]);
  };

  const handleTransportationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTransportation(event.target.value);
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const unparsedFile = await readUploadedFile(files[0]);
    const parsedFile = read(unparsedFile);
    const jsonFile = utils.sheet_to_json(
      parsedFile.Sheets[parsedFile.SheetNames[0]],
      { header: 1 },
    ) as string[][];

    setUploadedFile(jsonFile.slice(1));
  };

  const handleGetDirections = async () => {
    setPlaceIds([]);
    setDirections([]);
    setSortedFile(null);
    setIsLoading(true);

    if (!uploadedFile) {
      return;
    }

    const retrievedPlaceIds = await Promise.all(
      uploadedFile.map(async (row) => {
        const [address] = row;
        if (!address) {
          return;
        }

        return await fetchCoordinatesGMaps(address);
      }),
    );

    const retrievedDirections = await Promise.all(
      retrievedPlaceIds.map(async (placeId) => {
        if (!placeId) {
          return;
        }

        const response = await fetchDirectionsGMaps(
          placeId,
          retrievedSearch.geometry.coordinates,
          transportation,
        );

        return response?.routes?.[0];
      }),
    );

    const fileWithDirections = uploadedFile
      .map(([person, address], index) => {
        const direction = retrievedDirections[index];
        return [person, address, direction?.distance, direction?.duration];
      })
      .sort((a, b) => {
        const distanceA = a[2]?.value;
        const distanceB = b[2]?.value;

        if ((distanceA && !distanceB) || distanceA < distanceB) {
          return -1;
        }

        if ((!distanceA && distanceB) || distanceA > distanceB) {
          return 1;
        }

        if ((!distanceA && !distanceB) || distanceA === distanceB) {
          return 0;
        }
      });

    setPlaceIds(
      retrievedPlaceIds.filter((retrievedPlaceId): retrievedPlaceId is string =>
        Boolean(retrievedPlaceId),
      ),
    );

    setDirections(
      retrievedDirections.filter(
        (retrievedDirection): retrievedDirection is google.maps.Distance =>
          Boolean(retrievedDirection),
      ),
    );

    setSortedFile(fileWithDirections);

    setIsLoading(false);
  };

  const handleDownload = () => {
    const transformedRows = sortedFile
      .map(([person, address, distance, duration]) => {
        return {
          Pessoa: person,
          Endereço: address,
          Distância: distance?.text ?? NOT_FOUND,
          Duração: duration?.text ?? NOT_FOUND,
        };
      })
      .filter(({ Pessoa, Endereço }) => Pessoa && Endereço);

    const worksheet = utils.json_to_sheet(transformedRows);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, DEFAULT_PAGE_NAME);
    writeFile(workbook, DEFAULT_FILE_NAME, { compression: true });
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
          className="upload-button"
          type="file"
          accept=".xls,.xlsx,application/msexcel,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={handleUpload}
        />

        <button
          className="calculate-button"
          disabled={!retrievedSearch || !uploadedFile || isLoading}
          onClick={handleGetDirections}
        >
          Calcular distâncias
        </button>
      </div>

      {isLoading ? <Spinner /> : null}

      {sortedFile?.length ? (
        <div className="table-container">
          <TableInfo
            notFoundCoordinatesCount={notFoundCoordinatesCount}
            notFoundDirectionsCount={notFoundDirectionsCount}
            onDownload={handleDownload}
          />

          <Table
            rows={sortedFile}
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
