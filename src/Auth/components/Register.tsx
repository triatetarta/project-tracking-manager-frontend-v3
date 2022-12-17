import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import InputField from "../../FormFields/components/InputField";
import Logo from "../../Navigation/components/Logo";
import { useLoginMutation } from "../features/authApiSlice";
import { logIn, setCredentials } from "../features/authSlice";
import { useAddNewUserMutation } from "../features/usersApiSlice";
import blueBox from "../../../public/assets/images/blue.svg";
import LoaderSpinner from "../../Icons/components/LoaderSpinner";
import toast from "react-hot-toast";
import { IRegisterProps } from "../interfaces/IRegister";
import SuccessIcon from "../../Icons/components/SuccessIcon";

const Register = ({ setModalType, setOpenModal }: IRegisterProps) => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();
  const [
    login,
    { isSuccess: isLoginSuccess, isError: isLoginError, error: loginError },
  ] = useLoginMutation();

  const [completed, setCompleted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password: password.toLowerCase(),
    };

    if (formData.password !== password2.toLowerCase()) return;

    try {
      await addNewUser(formData);
    } catch (err) {
      console.log(err);
    }
  };

  const onLogin = async () => {
    const { accessToken } = await login({ email, password }).unwrap();

    dispatch(setCredentials({ accessToken }));
    dispatch(logIn());
  };

  useEffect(() => {
    if (!completed) return;

    onLogin();
  }, [completed]);

  useEffect(() => {
    if (!isLoginSuccess) return;

    setName("");
    setEmail("");
    setPassword("");
  }, [isLoginSuccess]);

  useEffect(() => {
    if (!isError || error === undefined) return;

    if ("data" in error) {
      toast.error(`${error.status} ${JSON.stringify(error.data)}`);
    }
  }, [isError, error]);

  useEffect(() => {
    if (!isLoginError || loginError === undefined) return;

    if ("data" in loginError) {
      toast.error(`${loginError.status} ${JSON.stringify(loginError.data)}`);
    }
  }, [isLoginError, loginError]);

  const disabledBtn =
    isLoading ||
    isSuccess ||
    name === "" ||
    email === "" ||
    password === "" ||
    password2 === "";

  return (
    <section className='fixed top-0 left-0 bottom-0 right-0 text-header-main bg-white z-50'>
      <div className='w-full h-full flex items-center justify-center flex-col space-y-6 backgroundGradient'>
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

                {!isLoading && !isSuccess ? <div>Sign Up</div> : null}

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
              Already have an account?
              <span
                onClick={() => setModalType("login")}
                className='text-deep-blue underline hover:no-underline cursor-pointer ml-1'
              >
                Login here
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

export default Register;
