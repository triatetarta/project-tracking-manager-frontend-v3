import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

const SkeletonPeople = () => {
  const peopleArray = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <div className='ticket relative flex items-center flex-wrap w-full h-14 overflow-hidden'>
      {peopleArray.map((item) => {
        return (
          <div
            key={item}
            className='h-6 w-6 rounded-full mb-1 mr-1 relative overflow-hidden'
          >
            <SkeletonElement classNames='w-full h-full' />
            <Shimmer />
          </div>
        );
      })}
    </div>
  );
};

export default SkeletonPeople;
