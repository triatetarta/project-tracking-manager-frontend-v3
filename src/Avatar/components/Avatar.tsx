import { IAvatarProps } from "../interfaces/IAvatar";
import ResponsiveImage from "./ResponsiveImage";

const Avatar = ({ classNames, spanClasses, image, name }: IAvatarProps) => {
  return (
    <div
      className={`${classNames} border rounded-full flex items-center justify-center font-semibold text-header-main overflow-hidden z-30  bg-gray-50 select-none capitalize ${
        image === "" ? "bg-nice-orange" : ""
      }`}
    >
      {image === undefined || image === "" ? (
        <span className={`pointer-events-none ${spanClasses}`}>
          {name?.charAt(0)}
        </span>
      ) : (
        <ResponsiveImage image={image} />
      )}
    </div>
  );
};

export default Avatar;
