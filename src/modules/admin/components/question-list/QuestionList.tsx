import { Clock, Coins, Hexagon, Star } from "iconoir-react";

import { QuestionListProps } from "@admin/types/component-types";
import { Difficulty } from "@admin/types/data-types";
import { categoryTapsData } from "@admin/constants";

import { useQuestionStore } from "@admin/hooks";
import { useDialog, useLoading, useModal } from "@core/hooks";

import { Dialog, Empty, Modal, Spinner, TapNav } from "@core/components";
import { CardList, QuestionForm } from "@admin/components";

const QuestionList = ({
  records,
  loading,
  selectedTap,
  toggleTap,
}: QuestionListProps): JSX.Element => {
  const { isModalVisible, openModal, closeModal } = useModal();
  const { toggleDialog, isDialogVisible, elementId } = useDialog();
  const { toggleLoading } = useLoading();

  const { getQuestion, removeQuestion, pagination } = useQuestionStore();

  return (
    <>
      <Modal
        modalTitle="Actualizar Pregunta"
        isModalVisible={isModalVisible}
        closeModal={closeModal}
        hasCloseButton
      >
        <QuestionForm mode="edit" closeModal={closeModal} />
      </Modal>
      <Dialog
        isDialogVisible={isDialogVisible}
        message="¿Desea eliminar la pregunta?"
        action={() =>
          removeQuestion(elementId, toggleLoading).then(() => toggleDialog(""))
        }
        toggleDialog={() => toggleDialog("")}
      />
      <h2 style={{ marginTop: "var(--spacing-xl)" }}>
        Banco de preguntas ({pagination.totalItems})
      </h2>
      <TapNav>
        {categoryTapsData.map((tap, index) => (
          <TapNav.Tap<Difficulty>
            key={index}
            tapData={tap}
            selectedTap={selectedTap}
            toggleTap={() => {
              toggleTap(tap.tapId);
            }}
          />
        ))}
      </TapNav>
      {loading.isLoading ? (
        <Spinner
          color="var(--white)"
          direction="column"
          message={loading.message}
        />
      ) : (
        <CardList>
          {records.length === 0 ? (
            <Empty />
          ) : (
            records.map((question) => (
              <CardList.Card
                key={question.id}
                title={question.name}
                actions={{
                  openEditModal: () => {
                    getQuestion(question.id);
                    openModal();
                  },
                  deleteAction: () => {
                    toggleDialog(question.id);
                  },
                }}
              >
                <CardList.Card.Item<Difficulty>
                  Icon={Star}
                  itemTitle="Dificultad"
                  itemValue={question.difficulty}
                />
                <CardList.Card.Item<number>
                  Icon={Clock}
                  itemTitle="Tiempo"
                  itemValue={question.time}
                />
                <CardList.Card.Item<number>
                  Icon={Coins}
                  itemTitle="Recompensa"
                  itemValue={question.reward}
                />
                <CardList.Card.Item<string>
                  Icon={Hexagon}
                  itemTitle="Categoría"
                  itemValue={question.category}
                />
              </CardList.Card>
            ))
          )}
        </CardList>
      )}
    </>
  );
};

export default QuestionList;
