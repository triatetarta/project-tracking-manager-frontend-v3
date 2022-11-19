import { ChangeEvent } from "react";

export interface ITextAreaField {
  label?: string;
  rows: number;
  name?: string;
  id?: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value: string | undefined;
  focus?: boolean;
  classNames?: string;
  disabled?: boolean;
}
