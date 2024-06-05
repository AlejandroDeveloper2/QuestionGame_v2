import { CardListProps } from "@admin/types/component-types";

import { Card } from "..";

import { CardListContainer } from "./CardList.style";

const CardList = ({ children }: CardListProps) => {
  return <CardListContainer>{children}</CardListContainer>;
};

CardList.Card = Card;

export default CardList;
