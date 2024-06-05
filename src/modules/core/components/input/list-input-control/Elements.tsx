import { Xmark } from "iconoir-react";

import { ElementListProps } from "@core/types/component-types";

import { highlightOption } from "@core/helpers";

import { ElementList, Element } from "./ListInputControl.style";

function Elements<T>({
  options,
  removeOption,
  displayedKey,
  highlightedKey,
}: ElementListProps<T>): JSX.Element {
  return (
    <ElementList>
      {options.length > 0 ? (
        options.map((option, i) => (
          <Element key={i} style={highlightOption(option[highlightedKey])}>
            <Xmark onClick={() => removeOption(i)} />
            <p>{option[displayedKey] as string}</p>
          </Element>
        ))
      ) : (
        <small>No hay ópciones aun!</small>
      )}
    </ElementList>
  );
}

export default Elements;
