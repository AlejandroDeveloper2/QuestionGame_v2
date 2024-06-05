import { EmptyIllustration } from "@assets/svg";

import { EmptyContainer } from "./Empty.style";

const Empty = (): JSX.Element => {
  return (
    <EmptyContainer>
      <EmptyIllustration />
    </EmptyContainer>
  );
};

export default Empty;
