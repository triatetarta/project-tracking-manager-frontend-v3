import { AnimatePresence, motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../Auth/features/usersApiSlice";
import Button from "../../Button/components/Button";
import useAuth from "../../hooks/useAuth";
import TutorialStep from "./TutorialStep";
import toast from "react-hot-toast";
import tutorialHello from "../../../public/assets/images/tutorial-hello.svg";
import tutorialProject from "../../../public/assets/images/tutorial-project.svg";
import tutorialStatus from "../../../public/assets/images/tutorial-status.svg";
import tutorialProfile from "../../../public/assets/images/tutorial-profile.svg";
import tutorialCongrats from "../../../public/assets/images/tutorial-congrats.svg";

const Tutorial = () => {
  const { id: userId } = useAuth();
  const { user } = useGetUsersQuery("userList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
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

  const [step, setStep] = useState(1);

  const onUpdate = async () => {
    await updateUser({
      id: userId,
      email: user?.email,
      jobTitle: user?.jobTitle,
      team: user?.team,
      department: user?.department,
      location: user?.location,
      roles: user?.roles,
      active: user?.active,
      tutorialed: true,
    });
  };

  useEffect(() => {
    if (!isUpdateUserSuccess) return;

    toast.success("Tutorial completed");
  }, [isUpdateUserSuccess]);

  useEffect(() => {
    if (!isUpdateUserError || updateUserError === undefined) return;

    if ("data" in updateUserError) {
      toast.error(
        `${updateUserError.status} ${JSON.stringify(updateUserError.data)}`
      );
    }
  }, [isUpdateUserError, updateUserError]);

  const pageContent = useCallback(() => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='flex flex-col'
          >
            <div className='w-[250px] h-[200px] self-center'>
              <img
                src={tutorialHello}
                alt='tutorial intro'
                className='w-full h-full'
              />
            </div>
            <p className='font-medium text-xl text-center'>
              Hello {user?.name}!
            </p>
            <p className='text-center'>
              Welcome to <span className='font-medium'>ProTrack's </span>
              Tutorial. <br />
              This tutorial will guide you through the basics of our platform.
              <br />
              Click Next to continue...
            </p>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='flex flex-col'
          >
            <div className='w-[250px] h-[200px] self-center'>
              <img
                src={tutorialProject}
                alt='tutorial project'
                className='w-full h-full'
              />
            </div>
            <p className='mt-4'>
              The Sidebar on the left side of the screen displays the available
              projects that you can <span className='font-medium'>tickets</span>{" "}
              for and the active <span className='font-medium'>people</span> of
              your team as well. Each project has its own color scheme and you
              can view project details by navigating to the projects page from
              the navigation bar on top.
            </p>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='flex flex-col'
          >
            <div className='w-[250px] h-[200px] self-center'>
              <img
                src={tutorialStatus}
                alt='tutorial status'
                className='w-full h-full'
              />
            </div>
            <p>
              The main area of the screen displays the{" "}
              <span className='font-medium'>status cards</span> which contain
              the tickets. Navigate to the{" "}
              <span className='font-medium'>Workflows</span> page for more
              information about Status cards. Click on each ticket to view more
              details or create a new ticket by clicking on the{" "}
              <span className='font-medium'>"create ticket" </span>
              button.
            </p>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='flex flex-col'
          >
            <div className='w-[250px] h-[200px] self-center'>
              <img
                src={tutorialProfile}
                alt='tutorial profile'
                className='w-full h-full'
              />
            </div>
            <p>
              Finally, to <span className='font-medium'>view and update</span>{" "}
              your information navigate to your profile page by clicking on the
              avatar area on the top-right corner. Keep in mind that you might
              have limited acces to some actions depending on the role you have
              been assigned. <br />
              Now click on the <span className='font-medium'>
                "Finish"
              </span>{" "}
              button to complete and close this tutorial.
            </p>
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onAnimationComplete={onUpdate}
            className='flex flex-col'
          >
            <div className='w-[250px] h-[200px] self-center'>
              <img
                src={tutorialCongrats}
                alt='tutorial congrats'
                className='w-full h-full'
              />
            </div>
            <p className='text-center mt-4'>
              Congratulations, <span className='font-medium'>{user?.name}</span>
              ! You have completed the tutorial. <br />
            </p>
          </motion.div>
        );
    }
  }, [step]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className='fixed top-0 right-0 left-0 bottom-0 w-full h-full bg-black/20  backdrop-blur-sm z-40 text-header-main flex items-center justify-center select-none'
    >
      <div className='bg-white rounded-lg p-6 w-[290px] sm:w-[600px] flex flex-col'>
        <div className='flex items-center justify-center space-x-6 w-full'>
          <TutorialStep step={1} currentStep={step} />
          <TutorialStep step={2} currentStep={step} />
          <TutorialStep step={3} currentStep={step} />
          <TutorialStep step={4} currentStep={step} />
        </div>

        <div className='mt-10 text-gray-text'>
          <AnimatePresence mode='wait'>{pageContent()}</AnimatePresence>
        </div>

        <div className='mt-10 flex justify-between'>
          <Button
            disabled={step > 4 || step === 1}
            classNames='text-slate-400 hover:text-slate-700 disabled:hover:text-slate-400 text-sm'
            textClassNames='text-sm'
            text='Previous'
            onClick={() => setStep(step < 2 ? step : step - 1)}
          />

          <Button
            disabled={step > 4}
            classNames='bg-medium-blue text-white py-2 px-6 rounded-full  hover:bg-light-blue transition-all duration-100 text-sm disabled:bg-gray-text/80 hover:disabled:bg-gray-text/80'
            textClassNames='text-sm'
            text={step >= 4 ? "Finish" : "Next"}
            onClick={() => setStep(step > 4 ? step : step + 1)}
          />
          <div>
            <button
              className='ml-2 z-50 bg-red-600 px-2 py-1 rounded-md text-white text-sm'
              onClick={() => {
                localStorage.setItem("persist", JSON.stringify(false));
                window.location.reload();
              }}
            >
              DEBUG
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Tutorial;
