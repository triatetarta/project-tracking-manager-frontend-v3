import { useNavigate } from "react-router-dom";
import tasksBackground from "../../../public/assets/images/tasks.svg";

const Showcase = () => {
  const navigate = useNavigate();

  return (
    <section className='flex flex-col md:flex-row justify-between mt-10 px-2'>
      <div className='self-center'>
        <p className='font-semibold text-2xl md:text-5xl text-header-main leading-8 md:leading-[3.5rem]'>
          The #1 project <br />
          management <br />
          tool used by agile teams
        </p>
        <button
          onClick={() => navigate("/register")}
          className='mt-4 md:mt-6 font-semibold bg-deep-blue text-white px-4 py-2 rounded-md hover:bg-light-blue transition-colors duration-75 flex items-center text-sm md:text-base'
        >
          Get it free
        </button>
      </div>
      <div className='mt-10 md:mt-0'>
        <img src={tasksBackground} alt='task background' className='w-full' />
      </div>
    </section>
  );
};

export default Showcase;
