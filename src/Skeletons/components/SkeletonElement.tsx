type SkeletonElementProps = {
  classNames?: string;
};

const SkeletonElement = ({ classNames }: SkeletonElementProps) => {
  return (
    <div className={`bg-[#ddd] overflow-hidden rounded-md ${classNames}`}></div>
  );
};

export default SkeletonElement;
