import { useEffect, useRef } from "react";
import { IInputField } from "../interfaces/IInputField";

const InputField = ({
  id,
  htmlFor,
  label,
  type,
  value,
  disabled,
  placeholder,
  onChange,
  classNames,
  focus,
  name,
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
        {!value && <span className='text-red-text ml-0.5'>*</span>}
      </label>
      <input
        id={id}
        name={name}
        onChange={onChange}
        ref={inputRef}
        className={`w-full p-2 border rounded-md mb-3 focus:outline-1 outline-deep-blue placeholder:text-sm ${
          !disabled ? "hover:bg-gray-100 transition-all duration-200" : ""
        }`}
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
