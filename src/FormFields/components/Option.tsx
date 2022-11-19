import { useGetUsersQuery } from "../../Auth/features/usersApiSlice";
import { useGetProjectsQuery } from "../../Projects/features/projectsApiSlice";
import { IOption } from "../interfaces/IOption";

const Option = ({ item, name, optionClassNames }: IOption) => {
  const { project } = useGetProjectsQuery("projectList", {
    selectFromResult: ({ data }) => ({
      project: data?.entities[item],
    }),
  });

  const { user } = useGetUsersQuery("userList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[item],
    }),
  });

  if (name === "status") {
    return (
      <option className={optionClassNames} value={item}>
        {item}
      </option>
    );
  }

  if (name === "project") {
    return (
      <option className={optionClassNames} value={project?.title}>
        {project?.title}
      </option>
    );
  }

  if (name === "assignee") {
    return (
      <option className={optionClassNames} value={user?._id}>
        {user?.name}
      </option>
    );
  }

  return null;
};

export default Option;
