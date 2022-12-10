import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

const SkeletonTickets = () => {
  const ticketsArray = Array.from({ length: 2 }, (_, i) => i + 1);

  return (
    <>
      {ticketsArray.map((item) => {
        return (
          <div key={item} className=' relative overflow-hidden h-20 w-full'>
            <SkeletonElement classNames='h-full w-full' />
            <Shimmer />
          </div>
        );
      })}
    </>
  );
};

export default SkeletonTickets;
