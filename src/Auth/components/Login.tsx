import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { setCredentials } from "../features/authSlice";
import { useLoginMutation } from "../features/authApiSlice";
import Logo from "../../Navigation/components/Logo";
import InputField from "../../FormFields/components/InputField";
import { useAppDispatch } from "../../app/hooks";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (err) {
      // if (!err.status) {
      //     setErrMsg('No Server Response');
      // } else if (err.status === 400) {
      //     setErrMsg('Missing Username or Password');
      // } else if (err.status === 401) {
      //     setErrMsg('Unauthorized');
      // } else {
      //     setErrMsg(err.data?.message);
      // }
      // errRef.current.focus();

      console.log(err);
    }
  };

  return (
    <section className='min-h-[calc(100vh-17.9rem)] flex items-center justify-center flex-col space-y-6 text-header-main'>
      <div className='hidden md:flex items-center space-x-2'>
        <Logo />
        <h2 className='font-semibold text-3xl text-header-main'>ProTrack</h2>
      </div>

      <div className='w-[400px] border shadow-md rounded-md py-8 px-10 flex flex-col space-y-8'>
        <h4 className='text-center text-gray-500'>Login to continue:</h4>

        <form onSubmit={onSubmit} className='w-full flex flex-col'>
          <InputField
            type='email'
            id='email'
            name='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            focus
          />

          <InputField
            type='password'
            id='password'
            name='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className='w-full'>
            <button
              type='submit'
              className='w-full bg-deep-blue text-white py-2 rounded-md font-semibold hover:bg-light-blue transition duration-75'
            >
              Login
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
    </section>
  );
};

export default Login;
