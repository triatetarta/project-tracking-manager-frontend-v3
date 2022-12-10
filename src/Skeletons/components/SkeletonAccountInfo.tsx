import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const SkeletonAccountInfo = () => {
  return (
    <div className='w-full'>
      <div className='w-full h-6 mb-5 relative overflow-hidden'>
        <SkeletonElement classNames='w-full h-full' />
        <Shimmer />
      </div>

      <ul className='flex flex-col space-y-4 text-sm'>
        <li className='flex items-center space-x-2 relative'>
          <span className='h-6 w-6 relative overflow-hidden'>
            <SkeletonElement classNames='w-full h-full' />
            <Shimmer />
          </span>
          <div className='w-2/3 h-4 relative overflow-hidden'>
            <SkeletonElement classNames='w-full h-full' />
            <Shimmer />
          </div>
        </li>
        <li className='flex items-center space-x-2'>
          <span className='h-6 w-6 relative overflow-hidden'>
            <SkeletonElement classNames='w-full h-full' />
            <Shimmer />
          </span>
          <div className='w-2/3 h-4 relative overflow-hidden'>
            <SkeletonElement classNames='w-full h-full' />
            <Shimmer />
          </div>
        </li>
        <li className='flex items-center space-x-2'>
          <span className='h-6 w-6 relative overflow-hidden'>
            <SkeletonElement classNames='w-full h-full' />
            <Shimmer />
          </span>
          <div className='w-2/3 h-4 relative overflow-hidden'>
            <SkeletonElement classNames='w-full h-full' />
            <Shimmer />
          </div>
        </li>
        <li className='flex items-center space-x-2'>
          <span className='h-6 w-6 relative overflow-hidden'>
            <SkeletonElement classNames='w-full h-full' />
            <Shimmer />
          </span>
          <div className='w-2/3 h-4 relative overflow-hidden'>
            <SkeletonElement classNames='w-full h-full' />
            <Shimmer />
          </div>
        </li>
      </ul>

      <div className='w-full h-6 my-5 relative overflow-hidden'>
        <SkeletonElement classNames='w-full h-full' />
        <Shimmer />
      </div>
      <div className='flex items-center space-x-4'>
        <span className='h-6 w-6 relative overflow-hidden'>
          <SkeletonElement classNames='w-full h-full' />
          <Shimmer />
        </span>
        <div className='w-2/3 h-4 relative overflow-hidden'>
          <SkeletonElement classNames='w-full h-full' />
          <Shimmer />
        </div>
      </div>
    </div>
  );
};

export default SkeletonAccountInfo;
