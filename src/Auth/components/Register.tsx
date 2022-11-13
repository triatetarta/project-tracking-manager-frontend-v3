import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import InputField from "../../FormFields/components/InputField";
import usePersist from "../../hooks/usePersist";
import Logo from "../../Navigation/components/Logo";
import { useLoginMutation } from "../features/authApiSlice";
import { setCredentials } from "../features/authSlice";
import { useAddNewUserMutation } from "../features/usersApiSlice";

const Register = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();
  const [login] = useLoginMutation();

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

      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err);
    }
  };

  const onLogin = async () => {
    const { accessToken } = await login({ email, password }).unwrap();
    dispatch(setCredentials({ accessToken }));
    navigate("/dashboard");
  };

  useEffect(() => {
    if (isSuccess) {
      setPersist(true);
      setName("");
      setEmail("");
      setPassword("");
      onLogin();
    }
  }, [isSuccess, navigate]);

  return (
    <section className='min-h-[calc(100vh-17.9rem)] flex items-center justify-center flex-col space-y-6 text-header-main'>
      <div className='hidden md:flex items-center space-x-2'>
        <Logo />
        <h2 className='font-semibold text-3xl text-header-main'>ProTrack</h2>
      </div>

      <div className='w-[400px] border shadow-md rounded-md py-8 px-10 flex flex-col space-y-8'>
        <h4 className='text-center text-gray-500'>Sign up to continue:</h4>

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

          <div className='w-full'>
            <button
              type='submit'
              className='w-full bg-deep-blue text-white py-2 rounded-md font-semibold hover:bg-light-blue transition duration-75'
            >
              Sign Up
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
    </section>
  );
};

export default Register;
