import { LogOut } from "iconoir-react";
import { useLocation } from "react-router-dom";

import { HeaderProps } from "@core/types/component-types";

import { useAuthStore } from "@auth/hooks";

import { IconOnlyButton } from "..";

import { HeaderContainer } from "./Header.style";

const Header = ({ style, children }: HeaderProps): JSX.Element => {
  const location = useLocation();
  const { logout } = useAuthStore();

  return (
    <HeaderContainer {...style}>
      {location.pathname === "/admin" ||
      location.pathname === "/admin/categories" ? (
        <IconOnlyButton
          type="button"
          title="Cerrar sesión!"
          onClick={logout}
          variant="neutral"
          Icon={LogOut}
        />
      ) : null}

      {children}
    </HeaderContainer>
  );
};

export default Header;
