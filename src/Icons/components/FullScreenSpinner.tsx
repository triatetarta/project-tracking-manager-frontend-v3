import LoaderSpinner from "./LoaderSpinner";

const FullScreenSpinner = () => {
  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
      <LoaderSpinner color='dark:fill-white' />
    </div>
  );
};

export default FullScreenSpinner;
