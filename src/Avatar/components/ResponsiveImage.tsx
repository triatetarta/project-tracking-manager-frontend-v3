import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

import { thumbnail } from "@cloudinary/url-gen/actions/resize";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dkjvgsngd",
  },
});

const ResponsiveImage = ({ image }: { image: string }) => {
  const myImage = cld.image(image);

  myImage.resize(thumbnail().width(112).height(112));

  return <AdvancedImage cldImg={myImage} />;
};

export default ResponsiveImage;
