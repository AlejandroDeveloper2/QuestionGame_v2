import { Outlet, useLocation } from "react-router-dom";

import { useModal } from "@core/hooks";

import { Modal, Navigation } from "@core/components";
import { CategoryForm, QuestionForm } from "@admin/components";

import { MainContainer } from "./AdminLayout.style";

const AdminLayout = (): JSX.Element => {
  const location = useLocation();
  const { isModalVisible, closeModal, openModal } = useModal();

  return (
    <MainContainer>
      <Modal
        modalTitle={
          location.pathname === "/admin"
            ? "Agregar nueva pregunta"
            : "Agregar nueva categoria"
        }
        isModalVisible={isModalVisible}
        closeModal={closeModal}
        hasCloseButton
      >
        {location.pathname === "/admin" ? (
          <QuestionForm mode="add" closeModal={closeModal} />
        ) : (
          <CategoryForm mode="add" closeModal={closeModal} />
        )}
      </Modal>

      <Outlet />
      <Navigation addingFunction={openModal} />
    </MainContainer>
  );
};

export default AdminLayout;
