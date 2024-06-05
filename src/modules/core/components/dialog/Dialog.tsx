import { DoubleCheck, Xmark } from "iconoir-react";

import { DialogProps } from "@core/types/component-types";

import { ButtonWithIcon } from "@core/components";

import { Content, DialogBackdrop, DialogWindow, Options } from "./Dialog.style";

const Dialog = ({
  isDialogVisible,
  message,
  action,
  toggleDialog,
}: DialogProps): JSX.Element => {
  return (
    <DialogBackdrop isdialogvisible={String(isDialogVisible)}>
      <DialogWindow>
        <h2 id="dialog-title">Advertencia</h2>
        <Content>
          <p>{message}</p>
        </Content>
        <Options>
          <ButtonWithIcon
            Icon={DoubleCheck}
            label="Aceptar"
            title="Aceptar"
            type="button"
            onClick={action}
            variant="warning"
          />
          <ButtonWithIcon
            Icon={Xmark}
            label="Cancelar"
            title="Cerrar cuadro de dialogo"
            type="button"
            onClick={toggleDialog}
            variant="neutral"
          />
        </Options>
      </DialogWindow>
    </DialogBackdrop>
  );
};

export default Dialog;
