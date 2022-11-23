import Description from "./Description";
import Details from "./Details";
import Plans from "./Plans";
import Showcase from "./Showcase";
import WorkflowInfo from "./WorkflowInfo";

const Home = () => {
  return (
    <main className='container mx-auto'>
      <Showcase />
      <Description />
      <Details />
      <WorkflowInfo classNames='flex flex-col md:flex-row items-center justify-center my-10 md:my-32 text-blue-text select-none' />
      <Plans />
    </main>
  );
};

export default Home;
