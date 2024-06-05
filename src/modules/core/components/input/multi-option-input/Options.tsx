import { OptionsProps } from "@core/types/component-types";

import { parseBooleanOptions } from "@core/helpers";

import { IconOnlyButton } from "@core/components";

import { OptionList } from "./MultiOptionInput.style";

function Options<T>({
  icons,
  options,
  selectedOption,
  markOption,
}: OptionsProps<T>): JSX.Element {
  return (
    <OptionList>
      {options.map((option, i) => (
        <IconOnlyButton
          key={i}
          type="button"
          Icon={icons[i]}
          variant={selectedOption === option ? "primary" : "neutral"}
          title={
            typeof options[i] === "boolean"
              ? parseBooleanOptions(options)[i]
              : (options[i] as string)
          }
          onClick={() => markOption(option)}
        />
      ))}
    </OptionList>
  );
}

export default Options;
