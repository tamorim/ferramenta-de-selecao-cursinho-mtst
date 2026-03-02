import { NOT_FOUND, TRANSPORTATIONS } from "../constants";
import { getFriendlyDistance, getFriendlyDuration } from "../utils";

export default function Table({
  rows,
  destination: destinationProp,
  transportation,
}) {
  const destination = encodeURIComponent(destinationProp);

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Pessoa</th>
            <th>Endereço</th>
            <th>Distância</th>
            <th>Tempo</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([person, address, distance, duration], index) => {
            if (!person && !address) {
              return null;
            }

            const origin = encodeURIComponent(address);
            const addressLink = `https://www.google.com/maps/search/?api=1&query=${origin}`;
            const distanceLink = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=${transportation}`;

            return (
              <tr key={index}>
                <td>{person}</td>
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
          })}
        </tbody>
      </table>
    </div>
  );
}
