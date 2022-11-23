import { useGetUsersQuery } from "../../Auth/features/usersApiSlice";
import { useGetProjectsQuery } from "../../Projects/features/projectsApiSlice";
import { useGetWorkflowStatusQuery } from "../../WorkflowStatus/features/workflowsApiSlice";
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

  const { workflowStatus } = useGetWorkflowStatusQuery("workflowStatusList", {
    selectFromResult: ({ data }) => ({
      workflowStatus: data?.entities[item],
    }),
  });

  if (name === "status") {
    return (
      <option className={optionClassNames} value={workflowStatus?._id}>
        {workflowStatus?.title}
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
