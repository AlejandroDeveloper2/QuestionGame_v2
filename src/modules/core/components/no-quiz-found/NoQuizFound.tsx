import { ArrowLeft } from "iconoir-react";
import { useNavigate } from "react-router-dom";

import { NoQuizFoundProps } from "@core/types/component-types";

import { ButtonWithIcon, Logo } from "..";

import { TitleContainer } from "@core/styles/GlobalStyles.style";

const NoQuizFound = ({ to, buttonLabel }: NoQuizFoundProps): JSX.Element => {
  const navigate = useNavigate();
  return (
    <TitleContainer style={{ marginTop: "var(--spacing-xl)", width: "80%" }}>
      <Logo
        width={{ sm: 200, md: 300, lg: 350 }}
        height={{ sm: 200, md: 300, lg: 350 }}
      />
      <h1 style={{ color: "var(--white)" }}>
        ¡El quiz ha finalizado o el código de quiz es erroneo!
      </h1>
      <ButtonWithIcon
        Icon={ArrowLeft}
        label={buttonLabel}
        title={buttonLabel}
        onClick={() => navigate(to)}
        type="button"
        variant="neutral"
      />
    </TitleContainer>
  );
};

export default NoQuizFound;
