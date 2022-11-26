import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../features/authSlice";
import { useLoginMutation } from "../features/authApiSlice";
import Logo from "../../Navigation/components/Logo";
import InputField from "../../FormFields/components/InputField";
import { useAppDispatch } from "../../app/hooks";
import usePersist from "../../hooks/usePersist";
import blueBox from "../../../public/assets/images/blue.svg";
import LoaderSpinner from "../../Icons/components/LoaderSpinner";
import { motion } from "framer-motion";
import { tickVariants } from "../animations";
import toast from "react-hot-toast";

const Login = () => {
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

  const [tickState, setTickState] = useState("checked");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [persist, setPersist] = usePersist();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPersist(true);

    const { accessToken } = await login({ email, password }).unwrap();
    dispatch(setCredentials({ accessToken }));
  };

  useEffect(() => {
    if (tickState !== "done") return;

    const timeout = setTimeout(() => {
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    }, 1000);

    return () => clearTimeout(timeout);
  }, [tickState]);

  useEffect(() => {
    if (!isError || error === undefined) return;

    if ("data" in error) {
      toast.error(`${error.status} ${JSON.stringify(error.data)}`);
    }
  }, [isError, error]);

  const disabledBtn = isLoading || isSuccess || email === "" || password === "";

  return (
    <section className='min-h-[calc(100vh-17.9rem)] flex items-center justify-center flex-col space-y-6 text-header-main backgroundGradient'>
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

              {isLoading ? <LoaderSpinner color='dark:fill-deep-blue' /> : null}

              {isSuccess ? (
                <svg
                  className='mx-auto h-8 w-8'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='-16 -16 100 100'
                >
                  <motion.path
                    variants={tickVariants}
                    initial='unchecked'
                    animate={tickState}
                    onAnimationComplete={() => {
                      setTickState("done");
                    }}
                    fillRule='evenodd'
                    clipRule='evenodd'
                    fill='transparent'
                    d='M0 34C0 15.2223 15.2223 0 34 0C52.7777 0 68 15.2223 68 34C68 52.7777 52.7777 68 34 68C15.2223 68 0 52.7777 0 34ZM32.0567 40.0933L47.4185 24.7315C48.3319 23.8804 49.7553 23.9055 50.6381 24.7883C51.5209 25.6711 51.546 27.0945 50.6949 28.0079L33.6949 45.0079C32.7898 45.9118 31.3236 45.9118 30.4185 45.0079L19.6003 34.1897C18.7492 33.2763 18.7743 31.8529 19.6571 30.9701C20.5399 30.0873 21.9633 30.0622 22.8767 30.9133L32.0567 40.0933Z'
                    stroke='#13BB70'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
              ) : null}
            </button>
          </div>
        </form>

        <div className='border-b w-full' />

        <div className='text-center'>
          <p className='text-xs'>
            Don't have an account?
            <span
              onClick={() => navigate("/register")}
              className='text-deep-blue underline hover:no-underline cursor-pointer ml-1'
            >
              Sign up here
            </span>
          </p>
        </div>
      </div>
      <div className='relative w-[400px]'>
        <div className='absolute z-30 bottom-0 -left-5 w-14 h-14'>
          <img src={blueBox} alt='' className='h-full w-full' />
        </div>
      </div>
    </section>
  );
};

export default Login;
