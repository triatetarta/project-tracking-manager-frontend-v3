import { useAppSelector } from "../../app/hooks";
import { selectProjectById } from "../../Projects/features/projectsApiSlice";
import { IOption } from "../interfaces/IOption";

const Option = ({ itemId }: IOption) => {
  const item = useAppSelector((state) => selectProjectById(state, itemId));

  return <option value={item?.title}>{item?.title}</option>;
};

export default Option;
