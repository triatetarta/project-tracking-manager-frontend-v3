import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

const SkeletonsProjectPage = () => {
  const projectsArray = Array.from({ length: 3 }, (_, i) => i + 1);

  return (
    <>
      {projectsArray.map((item) => {
        return (
          <div
            key={item}
            className='flex flex-col justify-between shadow-md border py-4 px-6 rounded-lg w-[260px] h-[240px] bg-pale-bg select-none relative overflow-hidden'
          >
            <div className='h-10'>
              <SkeletonElement classNames='h-full w-full' />
              <Shimmer />
            </div>
            <div className='h-20'>
              <SkeletonElement classNames='h-full w-full' />
              <Shimmer />
            </div>
            <div className='h-14'>
              <SkeletonElement classNames='h-full w-full' />
              <Shimmer />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SkeletonsProjectPage;
