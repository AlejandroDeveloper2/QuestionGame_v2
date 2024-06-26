import { Play, Plus, Search } from "iconoir-react";
import { useNavigate } from "react-router-dom";

import { HomeHeaderProps } from "@admin/types/component-types";
import { preConfiguredQuizData } from "@admin/constants";

import { useLoading, useModal, useScreenSize } from "@core/hooks";
import { useQuizAdminStore } from "@admin/hooks";

import { ButtonWithIcon, InputText, Modal } from "@core/components";
import { QuizForm } from "@admin/components";

import LogoTap from "/Icon.webp";

import { TitleContainer } from "@core/styles/GlobalStyles.style";
import { HomeHeaderContainer } from "./HomeHeader.style";

const HomeHeader = ({
  searchValue,
  handleSearch,
}: HomeHeaderProps): JSX.Element => {
  const navigate = useNavigate();
  const size = useScreenSize();
  const { loading, toggleLoading } = useLoading();

  const { isModalVisible, closeModal } = useModal();

  const { quizzes, createQuiz } = useQuizAdminStore();

  return (
    <>
      <Modal
        modalTitle="Crear Nuevo Quiz"
        isModalVisible={isModalVisible}
        closeModal={closeModal}
        hasCloseButton
      >
        <QuizForm mode="add" closeModal={closeModal} />
      </Modal>
      <HomeHeaderContainer>
        {size === "tablet" || size === "desktop" ? (
          <TitleContainer>
            <h1>Panel de administración</h1>
          </TitleContainer>
        ) : (
          <img loading="lazy" alt="Logo" src={LogoTap} />
        )}
        <InputText
          type="text"
          placeholder="Ejemplo: Pregunta 1"
          label="Buscar pregunta"
          name="question"
          value={searchValue}
          Icon={Search}
          onChange={handleSearch}
        />
        <ButtonWithIcon
          type="submit"
          label={quizzes.length > 0 ? "Ir al quiz" : "Nuevo quiz"}
          title={quizzes.length > 0 ? "Ir al quiz!" : "Crear quiz!"}
          onClick={
            quizzes.length > 0
              ? () => navigate("/admin/quiz")
              : () => createQuiz(preConfiguredQuizData, toggleLoading)
          }
          variant={quizzes.length > 0 ? "warning" : "primary"}
          loading={loading}
          Icon={quizzes.length > 0 ? Play : Plus}
        />
      </HomeHeaderContainer>
    </>
  );
};

export default HomeHeader;
