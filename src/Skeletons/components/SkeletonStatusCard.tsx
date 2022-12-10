import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

const SkeletonStatusCard = () => {
  const statusCardArray = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <>
      {statusCardArray.map((item) => {
        return (
          <div
            key={item}
            className='flex flex-col justify-between shadow-md border py-4 px-6 rounded-lg w-[290px] h-[300px] bg-pale-bg select-none relative overflow-hidden'
          >
            <div className='h-10'>
              <SkeletonElement classNames='h-full w-full' />
              <Shimmer />
            </div>
            <div className='h-24'>
              <SkeletonElement classNames='h-full w-full' />
              <Shimmer />
            </div>
            <div className='h-10'>
              <SkeletonElement classNames='h-full w-full' />
              <Shimmer />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SkeletonStatusCard;
