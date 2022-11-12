import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header
      // onClick={(e) => closeOpenMenus(e)}
      className='py-5 px-2 md:px-0 border-b shadow-md w-screen sticky top-0 bg-white z-40 left-0 right-0'
    >
      <nav className='flex items-center justify-between container mx-auto'>
        <Link to='/'>
          <div className='flex items-center space-x-2'>
            <Logo />
            <h2 className='font-semibold text-2xl text-header-main'>
              ProTrack
            </h2>
          </div>
        </Link>

        <div className='relative accountButton'>
          <button className='flex items-center space-x-1 text-light-blue px-2 py-1 rounded-lg hover:bg-gray-100 transition-all duration-200 accountButton'>
            <UserCircleIcon className='h-8 w-8 pointer-events-none' />

            <span className='font-semibold text-md pointer-events-none'>
              Account
            </span>
            <ChevronDownIcon className='h-5 w-5 pointer-events-none' />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
