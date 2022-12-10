import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

const SkeletonProjects = () => {
  const projectsArray = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className='flex flex-col space-y-1'>
      {projectsArray.map((item) => {
        return (
          <div
            key={item}
            className='ticket bg-ticket-bg rounded-md shadow-sm relative w-full h-8 overflow-hidden'
          >
            <SkeletonElement classNames='h-full w-full' />
            <Shimmer />
          </div>
        );
      })}
    </div>
  );
};

export default SkeletonProjects;
