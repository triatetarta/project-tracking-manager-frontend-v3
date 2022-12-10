import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const SkeletonComments = () => {
  return (
    <div className='flex items-center w-full'>
      <div className='h-9 w-9 mb-1 rounded-full relative overflow-hidden flex-none'>
        <SkeletonElement classNames='h-9 w-9 rounded-full flex' />
        <Shimmer />
      </div>

      <div className='flex-grow ml-4 h-16 relative overflow-hidden'>
        <SkeletonElement classNames='w-full h-full' />
        <Shimmer />
      </div>
    </div>
  );
};

export default SkeletonComments;
