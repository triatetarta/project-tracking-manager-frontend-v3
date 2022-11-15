import { useAppSelector } from "../../app/hooks";
import { selectProjectById } from "../../Projects/features/projectsApiSlice";
import { IOption } from "../interfaces/IOption";

const Option = ({ item, name, optionClassNames }: IOption) => {
  const selectedItem = useAppSelector((state) =>
    selectProjectById(state, item)
  );

  if (name === "status") {
    return (
      <option className={optionClassNames} value={item}>
        {item}
      </option>
    );
  }

  if (selectedItem !== undefined) {
    return (
      <option className={optionClassNames} value={selectedItem?.title}>
        {selectedItem?.title}
      </option>
    );
  }

  return null;
};

export default Option;
