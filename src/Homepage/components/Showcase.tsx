import { useNavigate } from "react-router-dom";
import tasksBackground from "../../../public/assets/images/tasks.svg";

const Showcase = () => {
  const navigate = useNavigate();

  return (
    <section className='flex flex-col md:flex-row justify-between mt-10 px-2 py-4 bg-gradient-to-tr from-deep-blue to-light-blue rounded-md'>
      <div className='self-center pl-6'>
        <p className='font-semibold text-2xl md:text-5xl text-white leading-8 md:leading-[3.5rem]'>
          The #1 project <br />
          management <br />
          tool used by agile teams
        </p>

        <button
          onClick={() => navigate("/register")}
          className='rounded relative inline-flex group items-center justify-center px-6 py-2 mt-4 cursor-pointer active:shadow-none text-white overflow-hidden bg-neat-purple'
        >
          <span className='absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10'></span>
          <span className='relative'>Get it free</span>
        </button>
      </div>
      <div className='mt-10 md:mt-0 p-10'>
        <img src={tasksBackground} alt='task background' className='w-full' />
      </div>
    </section>
  );
};

export default Showcase;
