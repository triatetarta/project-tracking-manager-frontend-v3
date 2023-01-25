import {
  BriefcaseIcon,
  OfficeBuildingIcon,
  MailIcon,
  CheckIcon,
  XIcon,
  DotsHorizontalIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { ChangeEvent, useEffect, useState } from "react";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../Auth/features/usersApiSlice";
import InputField from "../../FormFields/components/InputField";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import SkeletonAccountInfo from "../../Skeletons/components/SkeletonAccountInfo";

const AccountInfo = () => {
  const { id } = useAuth();

  const { user, isLoading: isUserLoading } = useGetUsersQuery("userList", {
    selectFromResult: ({ data, isLoading }) => ({
      user: data?.entities[id],
      isLoading,
    }),
  });

  const [
    updateUser,
    {
      isSuccess: isUpdateUserSuccess,
      isError: isUpdateUserError,
      error: updateUserError,
    },
  ] = useUpdateUserMutation();

  const [editDetails, setEditDetails] = useState(false);
  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const [detailsData, setDetailsData] = useState({
    email: "",
    jobTitle: "",
    team: "",
    department: "",
    location: "",
  });

  const { jobTitle, team, department, location } = detailsData;

  useEffect(() => {
    if (user === undefined) return;

    setDetailsData({
      email: user?.email,
      jobTitle: user?.jobTitle,
      team: user?.team,
      department: user?.department,
      location: user?.location,
    });
  }, [user, editDetails]);

  useEffect(() => {
    if (!isUpdateUserSuccess) return;

    toast.success("Your profile has been updated");
  }, [isUpdateUserSuccess]);

  useEffect(() => {
    if (!isUpdateUserError || updateUserError === undefined) return;

    if ("data" in updateUserError) {
      toast.error(
        `${updateUserError.status} ${JSON.stringify(updateUserError.data)}`
      );
    }
  }, [isUpdateUserError, updateUserError]);

  const onEditDetailsClick = () => {
    setEditDetails(true);
    setEditMenuOpen(false);
  };

  const onEditDetailsCancel = () => {
    setEditDetails(false);
  };

  const onEditDetailsSubmit = async () => {
    await updateUser({
      id: id,
      email: user?.email,
      jobTitle: jobTitle,
      team: team,
      department: department,
      location: location,
      roles: user?.roles,
      active: user?.active,
      tutorialed: user?.tutorialed,
    });
    setEditDetails(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDetailsData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className='flex flex-col pb-4 mt-4 md:mt-0'>
      <div className='hidden md:flex flex-col'>
        <p className='text-sm text-gray-text'>Welcome back,</p>
        <h3 className='text-xl font-semibold mb-10 text-header-main capitalize'>
          {user?.name}
        </h3>
      </div>

      <div className='border rounded-lg p-6 shadow-md w-[300px]'>
        {isUserLoading ? (
          <SkeletonAccountInfo />
        ) : (
          <>
            <div className='flex items-center justify-between mb-10 relative'>
              <h4 className='text-gray-text text-sm font-semibold'>ABOUT</h4>
              <div
                onClick={() => setEditMenuOpen(!editMenuOpen)}
                className={`h-8 w-8 flex items-center justify-center cursor-pointer ${
                  editMenuOpen ? "bg-header-main" : "hover:bg-gray-100"
                } ${
                  editDetails && "bg-header-main pointer-events-none"
                }  transition-all duration-200 rounded-lg`}
              >
                <DotsHorizontalIcon
                  className={`${
                    editMenuOpen || editDetails ? "text-white" : ""
                  } h-5 w-5`}
                />
              </div>

              {editMenuOpen && (
                <button
                  onClick={onEditDetailsClick}
                  className='absolute right-0 -bottom-9 z-50 border rounded-md px-2 py-1 text-sm bg-white hover:bg-gray-100 transition-all duration-200 select-none'
                >
                  Edit Details
                </button>
              )}
            </div>

            <ul className='flex flex-col space-y-2 text-sm'>
              <li className='flex items-center space-x-2 relative'>
                <span className='mb-1'>
                  <BriefcaseIcon className='h-6 w-6 text-gray-text' />
                </span>

                <InputField
                  type='text'
                  id='jobTitle'
                  name='jobTitle'
                  value={jobTitle}
                  onChange={onChange}
                  containerClasses='px-2 capitalize rounded-md'
                  placeholder='Your job title'
                  disabled={!editDetails}
                  focus
                />
              </li>
              <li className='flex items-center space-x-2'>
                <span className='mb-1'>
                  <UserGroupIcon className='h-6 w-6 text-gray-text' />
                </span>

                <InputField
                  type='text'
                  id='team'
                  name='team'
                  value={team}
                  onChange={onChange}
                  containerClasses='px-2 capitalize rounded-md'
                  disabled={!editDetails}
                  placeholder='Your team'
                />
              </li>
              <li className='flex items-center space-x-2'>
                <span className='mb-1'>
                  <OfficeBuildingIcon className='h-6 w-6 text-gray-text' />
                </span>

                <InputField
                  type='text'
                  id='department'
                  name='department'
                  value={department}
                  onChange={onChange}
                  containerClasses='px-2 capitalize rounded-md'
                  disabled={!editDetails}
                  placeholder='Your department'
                />
              </li>
              <li className='flex items-center space-x-2'>
                <span className='mb-1'>
                  <LocationMarkerIcon className='h-6 w-6 text-gray-text' />
                </span>

                <InputField
                  type='text'
                  id='location'
                  name='location'
                  value={location}
                  onChange={onChange}
                  containerClasses='px-2 capitalize rounded-md'
                  disabled={!editDetails}
                  placeholder='Your location'
                />
              </li>

              {editDetails && (
                <li className='flex items-center justify-end space-x-1.5'>
                  <button
                    onClick={onEditDetailsSubmit}
                    className='p-2 bg-gray-100 rounded-md shadow-md hover:bg-gray-200
       transition-all duration-200'
                  >
                    <CheckIcon className='h-4 w-4' />
                  </button>
                  <button
                    onClick={onEditDetailsCancel}
                    className='p-2 bg-gray-100 rounded-md shadow-md hover:bg-gray-200
       transition-all duration-200'
                  >
                    <XIcon className='h-4 w-4' />
                  </button>
                </li>
              )}
            </ul>

            <h4 className='text-gray-text text-sm mt-10 mb-5 font-semibold'>
              CONTACT
            </h4>
            <div className='flex items-center space-x-4'>
              <span>
                <MailIcon className='h-6 w-6 text-gray-text' />
              </span>
              <span className='text-sm'>{user?.email}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountInfo;
