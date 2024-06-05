import { ErrorMessageProps } from "@core/types/component-types";

import { ErrorMessageContainer } from "./ErrorMessage.style";

const ErrorMessage = ({ message }: ErrorMessageProps): JSX.Element => {
  return (
    <ErrorMessageContainer>
      <p>{message}</p>
    </ErrorMessageContainer>
  );
};

export default ErrorMessage;
