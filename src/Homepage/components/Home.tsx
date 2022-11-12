import Description from "./Description";
import Details from "./Details";
import Plans from "./Plans";
import Showcase from "./Showcase";
import Workflow from "./Workflow";

const Home = () => {
  return (
    <main className='container mx-auto'>
      <Showcase />
      <Description />
      <Details />
      <Workflow />
      <Plans />
    </main>
  );
};

export default Home;
