import { ReactNode } from "react";
import { Loading, Size, FieldSetStyle, HeaderStyle, Tap } from "./data-types";

type ButtonVariantType =
  | "primary"
  | "secondary"
  | "danger"
  | "warning"
  | "neutral"
  | "success";

type ButtonType = "submit" | "button" | "reset";
type SpinnerDirectionType = "row" | "column";
type InputType =
  | "text"
  | "number"
  | "date"
  | "password"
  | "email"
  | "phone"
  | "time";
type BadgeVariantType = ButtonVariantType;
type BadgeSizeType = "normal" | "medium" | "large";
type IconType = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>>
>;

interface BaseButtonProps {
  variant: ButtonVariantType;
  title: string;
  type: ButtonType;
  loading?: Loading;
  disabled?: boolean;
  spinnerOnly?: boolean;
  children?: React.ReactNode | React.ReactNode[];
  onClick: () => void;
}

interface ButtonWithLabelProps extends BaseButtonProps {
  label: string;
}

interface ButtonWithIconProps extends Omit<ButtonWithLabelProps, "children"> {
  Icon: IconType;
}

interface ButtonIconOnlyProps extends Omit<BaseButtonProps, "children"> {
  Icon: IconType;
}

interface SpinnerProps {
  color: string;
  direction: SpinnerDirectionType;
  message?: string;
}

interface LogoProps {
  width: Size;
  height: Size;
}

interface BaseInputProps {
  label: string;
  name: string;
  Icon: IconType;
  errorMessage?: string;
  children?: React.ReactNode | React.ReactNode[];
}

interface InputTextProps extends Omit<BaseInputProps, "children"> {
  type: InputType;
  placeholder: string;
  value: string;
  disabled?: boolean;
  onPasteText?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface SelectProps<T> extends Omit<BaseInputProps, "children"> {
  options: T[];
  value: string;
  inputKey: keyof T;
  loading?: Loading;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onLoadData: () => void;
}

interface MultiSelectProps<T>
  extends Omit<SelectProps<T>, "onChange" | "value"> {
  values: T[];
  addOption: (option: T) => void;
  removeOption: (optionIndex: number) => void;
}

interface ListInputControlProps<T> {
  label: string;
  options: T[];
  name: string;
  highlightedKey: keyof T;
  displayedKey: keyof T;
  errorMessage?: string;
  toggleForm: () => void;
  removeOption: (id: number) => void;
}

type ElementListProps<T> = Omit<
  ListInputControlProps<T>,
  "label" | "name" | "errorMessage" | "toggleForm"
>;

interface MultiOptionInputProps<T>
  extends Pick<
    ListInputControlProps<T>,
    "label" | "name" | "options" | "errorMessage"
  > {
  icons: IconType[];
  selectedOption: T;
  markOption: (option: T) => void;
}

type OptionsProps<T> = Pick<
  MultiOptionInputProps<T>,
  "icons" | "options" | "selectedOption" | "markOption"
>;

interface ErrorMessageProps {
  message: string;
}

interface FormProps {
  children: React.ReactNode | React.ReactNode[];
  formRef: React.RefObject<HTMLFormElement>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

interface FieldSetProps {
  children: React.ReactNode | React.ReactNode[];
  fieldSetStyle: FieldSetStyle;
}

interface LoaderBarProps {
  load: number;
}

interface ModalProps {
  children: React.ReactNode | React.ReactNode[];
  isModalVisible: boolean;
  modalTitle?: string;
  hasCloseButton?: boolean;
  closeModal: () => void;
}

interface NavigationProps {
  addingFunction: () => void;
}

interface HeaderProps {
  style: HeaderStyle;
  children: React.ReactNode | React.ReactNode[];
}

interface LoadingWindowProps {
  children: React.ReactNode | React.ReactNode[];
  opacity: number;
  isLoading: boolean;
}

interface BadgeProps {
  id: string;
  Icon: IconType;
  value: string | number;
  size: BadgeSizeType;
  variant: BadgeVariantType;
}

interface BadgeWithLabelProps extends BadgeProps {
  label: string;
}

interface DialogProps {
  isDialogVisible: boolean;
  message: string;
  action: () => void;
  toggleDialog: () => void;
}

interface NoQuizFoundProps {
  to: string;
  buttonLabel: string;
}

interface TapProps<T> {
  tapData: Tap<T>;
  selectedTap: T;
  toggleTap: () => void;
}

interface TapNavProps {
  children: ReactNode | ReactNode[];
}
interface PaginationProps {
  firstShownRecord: number;
  lastShownRecord: number;
  totalItems: number;
  back: () => void;
  next: () => void;
}

export type {
  ButtonVariantType,
  ButtonType,
  SpinnerDirectionType,
  InputType,
  BadgeVariantType,
  BadgeSizeType,
  IconType,
  BaseButtonProps,
  ButtonWithLabelProps,
  ButtonWithIconProps,
  ButtonIconOnlyProps,
  SpinnerProps,
  LogoProps,
  BaseInputProps,
  InputTextProps,
  SelectProps,
  MultiSelectProps,
  ListInputControlProps,
  ElementListProps,
  MultiOptionInputProps,
  OptionsProps,
  ErrorMessageProps,
  FormProps,
  FieldSetProps,
  LoaderBarProps,
  ModalProps,
  NavigationProps,
  HeaderProps,
  LoadingWindowProps,
  BadgeProps,
  BadgeWithLabelProps,
  DialogProps,
  NoQuizFoundProps,
  TapProps,
  TapNavProps,
  PaginationProps,
};
