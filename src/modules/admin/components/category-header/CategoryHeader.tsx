import { Search } from "iconoir-react";

import { CategoryHeaderProps } from "@admin/types/component-types";

import { useScreenSize } from "@core/hooks";

import { InputText } from "@core/components";

import LogoTap from "/Icon.webp";

import { CategoryHeaderContainer } from "./CategoryHeader.style";
import { TitleContainer } from "@core/styles/GlobalStyles.style";

const CategoryHeader = ({
  searchValue,
  handleSearch,
}: CategoryHeaderProps): JSX.Element => {
  const size = useScreenSize();

  return (
    <CategoryHeaderContainer>
      {size === "tablet" || size === "desktop" ? (
        <TitleContainer>
          <h1>Panel de administración</h1>
        </TitleContainer>
      ) : (
        <img loading="lazy" alt="Logo" src={LogoTap} />
      )}
      <InputText
        type="text"
        placeholder="Ejemplo:Matemáticas"
        label="Buscar categoria"
        name="category"
        value={searchValue}
        Icon={Search}
        onChange={handleSearch}
      />
    </CategoryHeaderContainer>
  );
};

export default CategoryHeader;
