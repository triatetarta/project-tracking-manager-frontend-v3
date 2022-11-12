import { useEffect, useRef } from "react";
import { IInputField } from "../interfaces/IInputField";

const InputField = ({
  htmlFor,
  label,
  type,
  value,
  disabled,
  onChange,
  classNames,
  focus,
}: IInputField) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current === null) return;
    focus && inputRef?.current.focus();
  }, [inputRef]);

  return (
    <div className='mb-3'>
      <label
        className='text-left block mb-1 ml-1 text-xs text-gray-text'
        htmlFor={htmlFor}
      >
        {label}
      </label>
      <input
        ref={inputRef}
        className='w-full p-2 border rounded-md mb-3'
        type={type}
        value={value}
        disabled={disabled}
      />
    </div>
  );
};

export default InputField;
