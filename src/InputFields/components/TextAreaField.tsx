import { useEffect, useRef } from "react";
import { ITextAreaField } from "../interfaces/ITextAreaField";

const TextAreaField = ({
  label,
  value,
  rows,
  id,
  name,
  placeholder,
  onChange,
  focus,
}: ITextAreaField) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current === null) return;
    focus && textareaRef?.current.focus();
  }, [textareaRef]);

  return (
    <>
      <label
        className='text-left block mb-1 ml-1 text-xs text-gray-text'
        htmlFor='description'
      >
        {label}
        {!value && <span className='text-red-text ml-0.5'>*</span>}
      </label>
      <textarea
        ref={textareaRef}
        rows={rows}
        style={{ resize: "none" }}
        className='w-full p-2 border rounded-md mb-3 text-sm focus:outline-1 outline-deep-blue'
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export default TextAreaField;
