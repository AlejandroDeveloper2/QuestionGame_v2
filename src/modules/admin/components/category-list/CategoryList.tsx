import { Hexagon } from "iconoir-react";

import { CategoryListProps } from "@admin/types/component-types";

import { useDialog, useLoading, useModal } from "@core/hooks";
import { useCategoryStore } from "@admin/hooks";

import { Dialog, Empty, Modal, Spinner } from "@core/components";
import { CardList, CategoryForm } from "@admin/components";

const CategoryList = ({ records, loading }: CategoryListProps): JSX.Element => {
  const { isModalVisible, openModal, closeModal } = useModal();
  const { toggleLoading } = useLoading();
  const { toggleDialog, isDialogVisible, elementId } = useDialog();

  const { getCategory, removeCategory } = useCategoryStore();

  return (
    <>
      <Modal
        modalTitle="Actualizar Categoria"
        isModalVisible={isModalVisible}
        closeModal={closeModal}
        hasCloseButton
      >
        <CategoryForm mode="edit" closeModal={closeModal} />
      </Modal>
      <Dialog
        isDialogVisible={isDialogVisible}
        message="¿Desea eliminar la categoria?"
        action={() =>
          removeCategory(elementId, toggleLoading).then(() => toggleDialog(""))
        }
        toggleDialog={() => toggleDialog("")}
      />
      <h2 style={{ marginTop: "var(--spacing-xl)" }}>
        Listado de categorias ({records.length})
      </h2>
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
            records.map((category) => (
              <CardList.Card
                key={category.id}
                title={category.name}
                actions={{
                  openEditModal: () => {
                    getCategory(category.id);
                    openModal();
                  },
                  deleteAction: () => {
                    toggleDialog(category.id);
                  },
                }}
              >
                <CardList.Card.Item<string>
                  Icon={Hexagon}
                  itemTitle="Categoria"
                  itemValue={category.name}
                />
              </CardList.Card>
            ))
          )}
        </CardList>
      )}
    </>
  );
};

export default CategoryList;
