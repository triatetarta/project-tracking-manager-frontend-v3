import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

const SkeletonAvatar = () => {
  return (
    <div className='h-28 w-28 mb-1 rounded-full relative overflow-hidden flex-none'>
      <SkeletonElement classNames='h-28 w-28 rounded-full flex' />
      <Shimmer />
    </div>
  );
};

export default SkeletonAvatar;
