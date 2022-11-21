import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import InputField from "../../FormFields/components/InputField";
import usePersist from "../../hooks/usePersist";
import Logo from "../../Navigation/components/Logo";
import { useLoginMutation } from "../features/authApiSlice";
import { setCredentials } from "../features/authSlice";
import { useAddNewUserMutation } from "../features/usersApiSlice";
import blueBox from "../../../public/assets/images/blue.svg";
import LoaderSpinner from "../../Icons/components/LoaderSpinner";
import { motion } from "framer-motion";
import { tickVariants } from "../animations";

const Register = () => {
  const [addNewUser, { isLoading, isSuccess }] = useAddNewUserMutation();
  const [login, { isSuccess: isLoginSuccess }] = useLoginMutation();

  const [tickState, setTickState] = useState("checked");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== password2) return;

    try {
      await addNewUser({ name, email, password });
    } catch (err) {
      console.log(err);
    }
  };

  const onLogin = async () => {
    const { accessToken } = await login({ email, password }).unwrap();

    dispatch(setCredentials({ accessToken }));
    setPersist(true);
  };

  useEffect(() => {
    if (tickState !== "done") return;

    onLogin();
  }, [tickState]);

  useEffect(() => {
    if (!isLoginSuccess) return;

    setName("");
    setEmail("");
    setPassword("");

    const timeout = setTimeout(() => {
      navigate("/dashboard");
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isLoginSuccess]);

  const disabledBtn =
    isLoading ||
    isSuccess ||
    name === "" ||
    email === "" ||
    password === "" ||
    password2 === "";

  return (
    <section className='min-h-[calc(100vh-17.9rem)] flex items-center justify-center flex-col space-y-6 text-header-main backgroundGradient'>
      <div className='hidden md:flex items-center space-x-2'>
        <Logo />
        <h2 className='font-semibold text-3xl text-header-main'>ProTrack</h2>
      </div>

      <div className='w-[400px] border shadow-md rounded-md rounded-bl-none  py-8 px-10 flex flex-col space-y-8 relative z-40 bg-white'>
        <h4 className='text-center text-gray-500'>Sign up to continue</h4>

        <form onSubmit={onSubmit} className='w-full flex flex-col'>
          <InputField
            type='text'
            id='name'
            name='name'
            placeholder='Enter your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            focus
          />

          <InputField
            type='email'
            id='email'
            name='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            type='password'
            id='password'
            name='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputField
            type='password'
            id='password2'
            name='password2'
            placeholder='Confirm password'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />

          <div className='w-full mt-2'>
            <button
              disabled={disabledBtn}
              type='submit'
              className='w-full bg-deep-blue text-white h-12 rounded-md font-semibold hover:bg-light-blue transition duration-75 disabled:bg-transparent disabled:hover:bg-transparent disabled:border'
            >
              {disabledBtn && !isLoading && !isSuccess ? (
                <div className='text-red-text-light flex items-center justify-center h-full font-normal text-sm'>
                  All fields are required
                </div>
              ) : null}

              {!isLoading && !isSuccess && <div>Sign Up</div>}

              {isLoading && <LoaderSpinner color='dark:fill-deep-blue' />}

              {isSuccess && (
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
              )}
            </button>
          </div>
        </form>

        <div className='border-b w-full' />

        <div className='text-center'>
          <p className='text-xs'>
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className='text-deep-blue underline hover:no-underline cursor-pointer ml-1'
            >
              Login here
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

export default Register;
