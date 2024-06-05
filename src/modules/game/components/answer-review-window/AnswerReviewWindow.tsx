import { Coins } from "iconoir-react";

import { AnswerReviewWindowProps } from "@game/types/component-types";

import { useGameStore } from "@game/hooks";
import { useQuizAdminStore } from "@admin/hooks";
import {
  getAnswerResultMessage,
  getAnswerResultTitle,
  getAnswerResultTitleColor,
} from "@game/helpers";

import { BadgeWithLabel } from "@core/components";
import WindowControls from "./WindowControls";

import { CheckSvg } from "@assets/svg";

import {
  AnswerResultTitle,
  MessageContainer,
} from "./AnswerReviewWindow.style";

const AnswerReviewWindow = ({
  closeModal,
}: AnswerReviewWindowProps): JSX.Element => {
  const { quiz } = useQuizAdminStore();
  const { currentMatch, game } = useGameStore();

  const resultMessage: string = getAnswerResultMessage(game, currentMatch);

  return (
    <>
      <AnswerResultTitle
        style={{
          color: getAnswerResultTitleColor(currentMatch?.matchResult),
        }}
      >
        {getAnswerResultTitle(currentMatch?.matchResult)}
      </AnswerResultTitle>
      {resultMessage === "" ? null : (
        <MessageContainer>
          <CheckSvg />
          <span id="match-result-span">
            {resultMessage.includes("-")
              ? resultMessage.split("-")[0]
              : resultMessage}
          </span>
          {resultMessage.split("-")[1] === "retirado" ? (
            <BadgeWithLabel
              id="badge-consolation-award"
              label="Premio seguro"
              Icon={Coins}
              variant="neutral"
              size="medium"
              value={
                quiz?.consolationAward === ""
                  ? "$0"
                  : "$" + quiz?.consolationAward
              }
            />
          ) : null}
        </MessageContainer>
      )}
      <WindowControls closeModal={closeModal} />
    </>
  );
};

export default AnswerReviewWindow;
