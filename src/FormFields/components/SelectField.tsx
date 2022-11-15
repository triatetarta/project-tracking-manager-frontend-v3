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
  selectClassNames,
  spanClassNames,
  optionClassNames,
}: ISelectAreaField) => {
  return (
    <>
      {label !== undefined ? (
        <label
          className='text-left block mb-1 ml-1 text-xs text-gray-text'
          htmlFor={htmlFor}
        >
          {label}
        </label>
      ) : null}

      <div className='relative'>
        <span className={spanClassNames}>
          <ChevronDownIcon />
        </span>
        <select
          className={selectClassNames}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          {items?.map((item, index) => {
            return (
              <Option
                key={index}
                item={item}
                name={name}
                optionClassNames={optionClassNames}
              />
            );
          })}
        </select>
      </div>
    </>
  );
};

export default SelectField;
