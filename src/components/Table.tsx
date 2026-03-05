import { NOT_FOUND } from "../constants";

import type { Row } from "../types";

type TableProps = {
  rows: Row[];
  destination: string;
  transportation: string;
};

export default function Table({
  rows,
  destination: destinationProp,
  transportation,
}: TableProps) {
  const destination = encodeURIComponent(destinationProp);

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Nome social</th>
            <th>Possui deficiência</th>
            <th>Raça</th>
            <th>Renda</th>
            <th>Educação</th>
            <th>Ensino Médio</th>
            <th>Localização do curso</th>
            <th>Disponibilidade aos sábados</th>
            <th>É membro de alguma ocupação</th>
            <th>Nome da ocupação</th>
            <th>Endereço</th>
            <th>Distância</th>
            <th>Tempo</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(
            (
              [
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
                distance,
                duration,
              ],
              index,
            ) => {
              if (!name && !address) {
                return null;
              }

              const origin = encodeURIComponent(address);
              const addressLink = `https://www.google.com/maps/search/?api=1&query=${origin}`;
              const distanceLink = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=${transportation}`;

              return (
                <tr key={index}>
                  <td>{name}</td>

                  <td>{socialName}</td>

                  <td>{hasDisability}</td>

                  <td>{race}</td>

                  <td>{income}</td>

                  <td>{education}</td>

                  <td>{highschool}</td>

                  <td>{courseLocation}</td>

                  <td>{saturdayAvailability}</td>

                  <td>{isMemberOfOccupation}</td>

                  <td>{occupationName}</td>

                  <td>
                    <a
                      href={addressLink}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {address}
                    </a>
                  </td>

                  <td>
                    {distance ? (
                      <a
                        href={distanceLink}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {distance.text}
                      </a>
                    ) : (
                      NOT_FOUND
                    )}
                  </td>

                  <td>{duration ? duration.text : NOT_FOUND}</td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>
    </div>
  );
}
