import { ChevronDownIcon } from "@heroicons/react/solid";
import { ISelectAreaField } from "../interfaces/ISelectAreaField";
import Option from "./Option";

const SelectField = ({
  id,
  items,
  disabled = false,
  label,
  name,
  value,
  onChange,
  htmlFor,
}: ISelectAreaField) => {
  return (
    <div className='flex flex-col'>
      <label
        className='text-left block mb-1 ml-1 text-xs text-gray-text'
        htmlFor={htmlFor}
      >
        {label}
      </label>
      <div className='relative'>
        <span className='w-4 h-4 absolute right-2 top-3 z-50 pointer-events-none text-gray-text'>
          <ChevronDownIcon />
        </span>
        <select
          className='py-2 pl-2 pr-6 border rounded-md mb-3 text-sm hover:bg-gray-100
        transition-all duration-200 cursor-pointer focus:outline-1 outline-deep-blue capitalize appearance-none'
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          {items?.map((itemId, index) => {
            return <Option key={index} itemId={itemId} />;
          })}
        </select>
      </div>
    </div>
  );
};

export default SelectField;
