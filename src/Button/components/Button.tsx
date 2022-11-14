import { IButton } from "../interfaces/IButton";

const Button = ({
  onClick,
  classNames,
  icon,
  text,
  disabled,
  textClassNames,
  type,
}: IButton) => {
  return (
    <button
      onClick={onClick}
      className={classNames}
      disabled={disabled}
      type={type}
    >
      {icon}
      {text ? <span className={textClassNames}> {text}</span> : null}
    </button>
  );
};

export default Button;
