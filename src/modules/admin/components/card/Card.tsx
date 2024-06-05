import { EditPencil, Trash } from "iconoir-react";

import { CardProps } from "@admin/types/component-types";

import { IconOnlyButton } from "@core/components";
import { CardItem } from "..";

import { Actions, CardContainer } from "./Card.style";

const Card = ({ children, title, actions }: CardProps): JSX.Element => {
  return (
    <CardContainer>
      <h3>{title}</h3>
      <ul>{children}</ul>
      <Actions>
        <IconOnlyButton
          Icon={Trash}
          type="button"
          variant="danger"
          title="Eliminar registro"
          onClick={actions.deleteAction}
        />
        <IconOnlyButton
          type="button"
          Icon={EditPencil}
          variant="primary"
          title="Editar registro"
          onClick={actions.openEditModal}
        />
      </Actions>
    </CardContainer>
  );
};

Card.Item = CardItem;

export default Card;
