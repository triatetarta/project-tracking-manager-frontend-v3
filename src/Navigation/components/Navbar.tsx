import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../../Auth/features/authApiSlice";
import Avatar from "../../Avatar/components/Avatar";
import useAuth from "../../hooks/useAuth";
import { INavbarProps } from "../interfaces/INavbar";
import Logo from "./Logo";
import toast from "react-hot-toast";
import { useGetUsersQuery } from "../../Auth/features/usersApiSlice";

const Navbar = ({
  openAccountMenu,
  setOpenAccountMenu,
  closeOpenMenus,
}: INavbarProps) => {
  const { loggedIn, id } = useAuth();
  const { user } = useGetUsersQuery("userList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });
  const [sendLogout, { isSuccess: isLogoutSuccess }] = useSendLogoutMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogoutSuccess) return;

    toast.success("You have logged out");
    navigate("/");
  }, [isLogoutSuccess]);

  return (
    <header
      onClick={(e) => closeOpenMenus(e)}
      className='py-5 px-2 md:px-0 border-b shadow-md w-screen sticky top-0 bg-white z-40 left-0 right-0 select-none'
    >
      <nav className='flex items-center justify-between container mx-auto'>
        <div className='flex items-center'>
          <Link to={loggedIn ? "/dashboard" : "/"}>
            <div className='flex items-center space-x-2'>
              <Logo />
              <h2 className='font-semibold text-2xl text-header-main'>
                ProTrack
              </h2>
            </div>
          </Link>

          {loggedIn ? (
            <>
              <div className='ml-10'>
                <Link to='/dashboard'>
                  <div className='text-header-main font-semibold text-sm hover:bg-gray-100 transition-all duration-200 p-2 rounded-md  hover:text-deep-blue'>
                    Tickets
                  </div>
                </Link>
              </div>
              <div className='ml-2'>
                <Link to='/projects'>
                  <div className='text-header-main font-semibold text-sm hover:bg-gray-100 transition-all duration-200 p-2 rounded-md  hover:text-deep-blue'>
                    Projects
                  </div>
                </Link>
              </div>
            </>
          ) : null}
        </div>

        <div className='relative accountButton'>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenAccountMenu(!openAccountMenu);
            }}
            className='flex items-center space-x-1 text-light-blue px-2 py-1 rounded-lg hover:bg-gray-100 transition-all duration-200 accountButton'
          >
            {loggedIn ? (
              <Avatar
                image={user?.image}
                name={user?.name}
                classNames='h-7 w-7 text-base'
              />
            ) : (
              <UserCircleIcon className='h-8 w-8 pointer-events-none' />
            )}

            <span className='font-semibold text-md pointer-events-none'>
              Account
            </span>
            <ChevronDownIcon className='h-5 w-5 pointer-events-none' />
          </button>

          {openAccountMenu ? (
            <ul className='accountMenu absolute right-0 w-fit rounded-lg shadow-md border border-gray-200 text-sm bg-white overflow-hidden z-50'>
              {loggedIn ? (
                <>
                  <li className='bg-header-main w-full text-white py-2 px-4'>
                    <div className='flex flex-col'>
                      <p className='text-md'>{user?.name}</p>
                      <p className='text-xs font-light'>{user?.email}</p>
                    </div>
                  </li>
                  <li
                    onClick={(e) => {
                      setOpenAccountMenu(false);
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
                    onClick={(e) => {
                      navigate("/login");
                      setOpenAccountMenu(false);
                    }}
                    className='accountMenu cursor-pointer py-2 pl-4 pr-20 hover:bg-gray-100'
                  >
                    Log in
                  </li>
                </Link>
              )}
            </ul>
          ) : null}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
