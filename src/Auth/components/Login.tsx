import { useEffect, useState } from "react";
import { logIn, setCredentials } from "../features/authSlice";
import { useLoginMutation } from "../features/authApiSlice";
import Logo from "../../Navigation/components/Logo";
import InputField from "../../FormFields/components/InputField";
import { useAppDispatch } from "../../app/hooks";
import blueBox from "../../../public/assets/images/blue.svg";
import LoaderSpinner from "../../Icons/components/LoaderSpinner";
import toast from "react-hot-toast";
import { ILoginProps } from "../interfaces/ILogin";
import SuccessIcon from "../../Icons/components/SuccessIcon";

const Login = ({ setModalType, setOpenModal }: ILoginProps) => {
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

  const [completed, setCompleted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      email: email.toLowerCase(),
      password: password.toLowerCase(),
    };

    const { accessToken } = await login(formData).unwrap();
    dispatch(setCredentials({ accessToken }));
  };

  useEffect(() => {
    if (!completed) return;

    const timeout = setTimeout(() => {
      setEmail("");
      setPassword("");

      dispatch(logIn());
    }, 1000);

    return () => clearTimeout(timeout);
  }, [completed]);

  useEffect(() => {
    if (!isError || error === undefined) return;

    if ("data" in error) {
      toast.error(`${error.status} ${JSON.stringify(error.data)}`);
    }
  }, [isError, error]);

  const disabledBtn = isLoading || isSuccess || email === "" || password === "";

  return (
    <section className='fixed top-0 left-0 right-0 bottom-0 text-header-main bg-white z-50'>
      <div className='w-full h-full flex items-center justify-center flex-col space-y-6 backgroundGradient'>
        <div className='hidden md:flex items-center space-x-2'>
          <Logo />
          <h2 className='font-semibold text-3xl text-header-main'>ProTrack</h2>
        </div>

        <div className='w-[400px] border shadow-md rounded-md rounded-bl-none py-8 px-10 flex flex-col space-y-8 relative z-40 bg-white'>
          <h4 className='text-center text-gray-500'>Login to continue</h4>

          <form onSubmit={onSubmit} className='w-full flex flex-col'>
            <InputField
              type='email'
              id='email'
              name='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading || isSuccess}
              focus
            />

            <InputField
              type='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              value={password}
              disabled={isLoading || isSuccess}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className='w-full mt-2'>
              <button
                disabled={disabledBtn}
                type='submit'
                className='w-full bg-deep-blue text-white rounded-md font-semibold hover:bg-light-blue transition duration-75 disabled:bg-transparent disabled:hover:bg-transparent disabled:border h-12'
              >
                {disabledBtn && !isLoading && !isSuccess ? (
                  <div className='text-red-text-light flex items-center justify-center h-full font-normal text-sm'>
                    All fields are required
                  </div>
                ) : null}

                {!isLoading && !isSuccess ? <div>Login</div> : null}

                {isLoading ? (
                  <LoaderSpinner color='dark:fill-deep-blue' />
                ) : null}

                {isSuccess ? <SuccessIcon setCompleted={setCompleted} /> : null}
              </button>
            </div>
          </form>

          <div className='border-b w-full' />

          <div className='text-center'>
            <p className='text-xs'>
              Don't have an account?
              <span
                onClick={() => setModalType("register")}
                className='text-deep-blue underline hover:no-underline cursor-pointer ml-1'
              >
                Sign up here
              </span>
            </p>

            <p className='text-xs mt-2'>OR</p>

            <div className='text-xs flex items-center justify-center mt-2'>
              <p>Navigate</p>
              <span
                onClick={() => setOpenModal(false)}
                className='text-deep-blue underline hover:no-underline cursor-pointer ml-1'
              >
                Back home
              </span>
            </div>
          </div>
        </div>
        <div className='relative w-[400px]'>
          <div className='absolute z-30 bottom-0 -left-5 w-14 h-14'>
            <img src={blueBox} alt='' className='h-full w-full' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
