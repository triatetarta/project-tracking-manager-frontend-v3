import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

type SkeletonProps = {
  elements: number;
  skeletonClassNames: string;
  outerClassNames: string;
  midClassNames: string;
};

const Skeleton = ({
  elements = 1,
  outerClassNames,
  midClassNames,
  skeletonClassNames,
}: SkeletonProps) => {
  const numOfElements = Array.from({ length: elements }, (_, i) => i + 1);

  return (
    <div className={outerClassNames}>
      {numOfElements?.map((element) => {
        return (
          <div key={element} className={midClassNames}>
            <SkeletonElement classNames={skeletonClassNames} />
            <Shimmer />
          </div>
        );
      })}
    </div>
  );
};

export default Skeleton;
