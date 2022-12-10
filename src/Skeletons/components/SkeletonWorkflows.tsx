import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

const SkeletonWorkflows = () => {
  const workflowsArray = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <>
      {workflowsArray.map((item) => {
        return (
          <div key={item} className='w-[320px] h-28 relative overflow-hidden'>
            <SkeletonElement classNames='h-full w-full' />
            <Shimmer />
          </div>
        );
      })}
    </>
  );
};

export default SkeletonWorkflows;
