import { Link } from "react-router-dom";
import errorImage from "../../../public/assets/images/error.svg";

const ErrorPage = () => {
  return (
    <div className='min-h-[calc(100vh-17.9rem)] flex items-center justify-center flex-col'>
      <div className='mt-10 md:mt-0 p-10 w-[320px] md:w-[470px]'>
        <img src={errorImage} alt='error image' className='w-full' />
      </div>
      <h4 className='text-2xl mb-6'>Page Not Found</h4>
      <Link to='/'>
        <a className='border px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200'>
          Back Home
        </a>
      </Link>
    </div>
  );
};

export default ErrorPage;
