import { CSSProperties } from "react";
import { Location } from "react-router-dom";
import { toast } from "react-toastify";

import {
  BadgeSizeType,
  BadgeVariantType,
  ButtonVariantType,
} from "@core/types/component-types";

export const getButtonVariantColor = (variant: ButtonVariantType): string => {
  const bg: string =
    variant === "primary"
      ? "var(--primary-color-base)"
      : variant === "secondary"
      ? "var(--primary-color-200)"
      : variant === "neutral"
      ? "var(--light-gray)"
      : variant === "danger"
      ? "var(--red)"
      : variant === "success"
      ? "var(--green)"
      : "var(--orange)";
  return bg;
};

export const getButtonTextColor = (variant: ButtonVariantType): string => {
  const textColor: string =
    variant === "primary" || variant === "danger"
      ? "var(--white)"
      : "var(--gray)";
  return textColor;
};

export const getBadgeVariantColor = (variant: BadgeVariantType): string => {
  const bg: string =
    variant === "primary"
      ? "var(--primary-color-base)"
      : variant === "secondary"
      ? "var(--primary-color-200)"
      : variant === "neutral"
      ? "var(--light-gray)"
      : variant === "danger"
      ? "var(--red)"
      : variant === "success"
      ? "var(--green)"
      : "var(--orange)";
  return bg;
};

export const getBadgeTextColor = (variant: BadgeVariantType): string => {
  const textColor: string =
    variant === "primary" || variant === "danger"
      ? "var(--white)"
      : "var(--gray)";
  return textColor;
};

export const getBadgePadding = (size: BadgeSizeType): string => {
  const badgePadding =
    size === "normal"
      ? "var(--spacing-sm) var(--spacing-sm)"
      : size === "medium"
      ? "var(--spacing-md) var(--spacing-md)"
      : "var(--spacing-xl) var(--spacing-xl)";
  return badgePadding;
};

export const getBadgeTextSize = (size: BadgeSizeType): string => {
  const textSize =
    size === "normal"
      ? "var(--font-size-md)"
      : size === "medium"
      ? "var(--font-size-2xl)"
      : "var(--font-size-3xl)";
  return textSize;
};

export const highlightOption = (option: unknown): CSSProperties => {
  const highlightedOption = !option
    ? "solid 4px var(--red)"
    : "solid 4px var(--primary-color-base)";

  return { border: highlightedOption };
};

export const parseBooleanOptions = <T>(options: T[]): string[] => {
  const parsedOptions = options.map((option) => {
    if (option === false) return "No";
    else return "Si";
  });
  return parsedOptions;
};

export const getItemActive = (to: string, location: Location): string => {
  if (location.pathname === to) return "var(--primary-color-base)";
  return "var(--gray)";
};

export const copyToClipboard = async (
  textToCopy: string,
  successMessage: string
): Promise<void> => {
  try {
    await window.navigator.clipboard.writeText(textToCopy);
    toast.success(successMessage);
  } catch (e: unknown) {
    const error = e as Error;
    toast.error(error.message);
  }
};

export const pasteTextFromClipboard = async (
  successMessage: string
): Promise<string> => {
  let textToPaste: string = "";
  try {
    textToPaste = await window.navigator.clipboard.readText();
    toast.success(successMessage);
  } catch (e: unknown) {
    const error = e as Error;
    toast.error(error.message);
  }
  return textToPaste;
};

export const formatSeconds = (secondsParam: number): string => {
  const hours = Math.floor(secondsParam / 0xe10);
  const minutes = Math.floor(secondsParam / 0x3c) % 0x3c;
  const seconds = Math.round(secondsParam % 0x3c);

  return `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;
};
