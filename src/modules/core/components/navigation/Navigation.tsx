import { useLocation } from "react-router-dom";
import { Plus, Rhombus, ViewGrid } from "iconoir-react";

import { NavigationProps } from "@core/types/component-types";

import { getItemActive } from "@core/helpers";

import { IconOnlyButton } from "@core/components";

import { Nav, ItemLink } from "./Navigation.style";

const Navigation = ({ addingFunction }: NavigationProps): JSX.Element => {
  const location = useLocation();

  return (
    <Nav>
      <ItemLink to="/admin" color={getItemActive("/admin", location)}>
        <ViewGrid />
        <span>Inicio</span>
      </ItemLink>
      <IconOnlyButton
        disabled={location.pathname.includes("/admin/quiz")}
        type="button"
        Icon={Plus}
        variant="primary"
        title="Agregar nueva pregunta"
        onClick={() => addingFunction()}
      />
      <ItemLink
        to="/admin/categories"
        color={getItemActive("/admin/categories", location)}
      >
        <Rhombus />
        <span>Categorías</span>
      </ItemLink>
    </Nav>
  );
};

export default Navigation;
