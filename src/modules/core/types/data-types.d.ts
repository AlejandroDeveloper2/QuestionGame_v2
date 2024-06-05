type Size = { sm: number; md: number; lg: number };
type FieldErrorType = {
  message: string;
  error: boolean;
};
type ScreenType = "desktop" | "tablet" | "mobile";
type FlexDirection = "row" | "column";

interface Loading {
  isLoading: boolean;
  message: string;
}

interface Breakpoint {
  mobile: number;
  mobileMedium: number;
  tablet: number;
  desktop: number;
}

interface FieldSetStyle {
  width: Size;
}

type WrongInput<T> = Record<T, FieldErrorType>;

interface ModalStyle {
  ismodalvisible: string;
}

interface LinkStyle {
  color: string;
}

interface HeaderStyle {
  height: Size;
  direction: { sm: FlexDirection; md: FlexDirection; lg: FlexDirection };
}

interface LoadingWindowStyle {
  opacity: number;
  isloading: string;
}

interface ServerResponse {
  message: string;
  code: number;
}

export type {
  ScreenType,
  FieldErrorType,
  Size,
  FlexDirection,
  Loading,
  Breakpoint,
  FieldSetStyle,
  WrongInput,
  ModalStyle,
  LinkStyle,
  HeaderStyle,
  LoadingWindowStyle,
  ServerResponse,
};
