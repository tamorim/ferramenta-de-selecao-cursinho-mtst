import { NOT_FOUND } from "../constants";

type Row = [
  person: string,
  address: string,
  distance: {
    text: string;
  },
  duration: {
    text: string;
  },
];

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
