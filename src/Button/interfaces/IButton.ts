import { MouseEvent } from "react";

export interface IButton {
  icon?: JSX.Element;
  text?: string;
  classNames?: string;
  textClassNames?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}
