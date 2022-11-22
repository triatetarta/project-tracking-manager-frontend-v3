import { useGetProjectsQuery } from "../features/projectsApiSlice";
import ProjectCard from "./ProjectCard";

const TopSection = () => {
  const { data: projects } = useGetProjectsQuery("projectList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className=''>
      <h2 className='mt-6 text-xl font-medium'>YOUR WORK</h2>
      <div className='mt-10'>
        <h3 className='font-medium mb-2'>Projects</h3>

        <div className='flex items-center flex-wrap gap-4'>
          {projects?.ids.map((projectId) => {
            return <ProjectCard key={projectId} projectId={projectId} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TopSection;
