import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

const SkeletonTicketDetails = () => {
  return (
    <>
      <div className='flex mb-10 w-full relative overflow-hidden'>
        <SkeletonElement classNames='h-8 w-full' />
        <Shimmer />
      </div>
      <div>
        <div>
          <div className='overflow-hidden mb-2 relative w-1/4'>
            <SkeletonElement classNames='h-4 w-full' />
            <Shimmer />
          </div>

          <div className='flex items-center justify-between selection:overflow-hidden'>
            <div className='w-2/4 overflow-hidden relative'>
              <SkeletonElement classNames='h-6 w-full' />
              <Shimmer />
            </div>

            <div className='w-1/4 overflow-hidden relative'>
              <SkeletonElement classNames='h-6 w-full' />
              <Shimmer />
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-center mt-4 pl-1 relative overflow-hidden'>
          <div className='w-2/5 mb-2 relative overflow-hidden'>
            <SkeletonElement classNames='h-6 w-full' />
            <Shimmer />
          </div>

          <div className='w-full relative overflow-hidden'>
            <SkeletonElement classNames='h-16 w-full' />
            <Shimmer />
          </div>
        </div>

        <div className='mt-12 flex items-center justify-between relative overflow-hidden w-full my-3'>
          <SkeletonElement classNames='h-8 w-full' />
          <Shimmer />
        </div>
      </div>

      <div className='mt-10'>
        <div className='w-1/3 mb-3 relative overflow-hidden'>
          <SkeletonElement classNames='h-6 w-full' />
          <Shimmer />
        </div>

        <div className='flex items-center w-full'>
          <div className='h-8 w-8 mb-1 rounded-full relative overflow-hidden flex-none'>
            <SkeletonElement classNames='h-8 w-8 rounded-full flex' />
            <Shimmer />
          </div>

          <div className='flex-grow ml-2 h-16 relative overflow-hidden'>
            <SkeletonElement classNames='w-full h-full' />
            <Shimmer />
          </div>
        </div>

        <div className='mt-10 w-1/3 relative overflow-hidden'>
          <SkeletonElement classNames='h-6 w-full' />
          <Shimmer />
        </div>
      </div>
    </>
  );
};

export default SkeletonTicketDetails;
