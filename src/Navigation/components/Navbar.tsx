import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../../Auth/features/authApiSlice";
import Logo from "./Logo";

const Navbar = () => {
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const navigate = useNavigate();

  const user = true;

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

          <ul className='accountMenu absolute right-0 w-fit rounded-lg shadow-md border border-gray-200 text-sm bg-white overflow-hidden z-50'>
            {user ? (
              <>
                <li className='bg-header-main w-full text-white py-2 px-4'>
                  <div className='flex flex-col'>
                    <p className='text-md'>James</p>
                    <p className='text-xs font-light'> james@gmail.com</p>
                  </div>
                </li>
                <li
                  onClick={() => {
                    // dispatch(closeAccount());
                    navigate("/account");
                  }}
                  className='accountMenu cursor-pointer py-2 px-4 hover:bg-gray-100'
                >
                  Profile
                </li>
                <li
                  onClick={sendLogout}
                  className='accountMenu cursor-pointer py-2 px-4 hover:bg-gray-100'
                >
                  Log Out
                </li>
              </>
            ) : (
              <Link to='/login'>
                <li
                  onClick={() => {
                    navigate("/login");
                    // dispatch(closeAccount());
                  }}
                  className='accountMenu cursor-pointer py-2 pl-4 pr-20 hover:bg-gray-100'
                >
                  Log in
                </li>
              </Link>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
