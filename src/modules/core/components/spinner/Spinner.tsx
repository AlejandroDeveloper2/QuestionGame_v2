import { SpinnerProps } from "@core/types/component-types";

import { SpinnerBody, SpinnerContainer } from "./Spinner.style";

const SPINNERPARTS = new Array(4).fill(".");
const Spinner = ({ message, color, direction }: SpinnerProps): JSX.Element => {
  return (
    <SpinnerContainer direction={direction} color={color}>
      <SpinnerBody color={color} id="spinner">
        {SPINNERPARTS.map((_, i) => (
          <div key={i}></div>
        ))}
      </SpinnerBody>
      {message ? <p>{message}</p> : null}
    </SpinnerContainer>
  );
};

export default Spinner;
