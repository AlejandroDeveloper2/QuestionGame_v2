import { TapProps } from "@core/types/component-types";

import { TapButton } from "./TapNav.style";

function Tap<T>({ tapData, selectedTap, toggleTap }: TapProps<T>): JSX.Element {
  return (
    <li>
      <TapButton
        selected={String(selectedTap === tapData.tapId)}
        onClick={toggleTap}
      >
        <tapData.Icon />
        <span>{tapData.label}</span>
      </TapButton>
    </li>
  );
}

export default Tap;
