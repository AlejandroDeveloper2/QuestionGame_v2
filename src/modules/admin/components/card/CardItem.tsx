import { CardItemProps } from "@admin/types/component-types";

import { CardItemElement } from "./Card.style";

function CardItem<T>({
  Icon,
  itemTitle,
  itemValue,
}: CardItemProps<T>): JSX.Element {
  return (
    <CardItemElement>
      <Icon />
      <span>
        <small>{itemTitle}</small> : {itemValue as string | number}
      </span>
    </CardItemElement>
  );
}

export default CardItem;
