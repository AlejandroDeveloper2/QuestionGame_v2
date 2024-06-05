import { BaseButtonProps } from "@core/types/component-types";

import { getButtonTextColor } from "@core/helpers";

import { Spinner } from "..";

import { Button } from "./Button.style";

const BaseButton = ({
  loading,
  children,
  disabled,
  spinnerOnly,
  ...props
}: BaseButtonProps): JSX.Element => {
  return (
    <Button {...props} disabled={disabled || loading?.isLoading}>
      {loading && loading.isLoading ? (
        <Spinner
          message={spinnerOnly ? undefined : loading.message}
          color={getButtonTextColor(props.variant)}
          direction="row"
        />
      ) : (
        children
      )}
    </Button>
  );
};

export default BaseButton;
