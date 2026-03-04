import { TRANSPORTATIONS } from "../constants";

import type { ChangeEvent } from "react";

type TransportationProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function Transportation({
  value,
  onChange,
}: TransportationProps) {
  return (
    <fieldset className="radio-group">
      <legend>
        <strong>Escolha o modo de transporte:</strong>
      </legend>

      <div>
        <input
          type="radio"
          id="walking"
          name="walking"
          value={TRANSPORTATIONS.WALKING}
          checked={value === TRANSPORTATIONS.WALKING}
          onChange={onChange}
        />
        <label htmlFor="walking">A pé</label>
      </div>

      <div>
        <input
          type="radio"
          id="transit"
          name="transit"
          value={TRANSPORTATIONS.TRANSIT}
          checked={value === TRANSPORTATIONS.TRANSIT}
          onChange={onChange}
        />
        <label htmlFor="transit">Transporte público</label>
      </div>

      <div>
        <input
          type="radio"
          id="driving"
          name="driving"
          value={TRANSPORTATIONS.DRIVING}
          checked={value === TRANSPORTATIONS.DRIVING}
          onChange={onChange}
        />
        <label htmlFor="driving">Carro</label>
      </div>
    </fieldset>
  );
}
