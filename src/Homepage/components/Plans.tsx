import PlanCard from "./PlanCard";
import orangeBox from "../../../public/assets/images/orange.svg";

const Plans = () => {
  return (
    <section className='backgroundGradientFlip text-blue-text flex flex-col mb-20 px-2 py-16 relative'>
      <img
        src={orangeBox}
        alt='orange box'
        className='w-24 h-24 -rotate-90 absolute -top-10 -left-10'
      />

      <div>
        <div className='text-center text-sm font-bold text-neat-yellow mb-10'>
          GET YOURS NOW
        </div>
        <h1 className='text-xl md:text-4xl font-semibold text-center mb-6'>
          Simple Plans hosted in the cloud
        </h1>
      </div>

      <div className='flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 space-x-0 md:space-x-4 mt-10 w-full lg:w-3/4 lg:mx-auto'>
        <PlanCard
          plan='Free'
          price='0'
          users='up to 10'
          lasts='Free forever'
          buttonText='Get started'
          textColor='text-neat-purple'
          bgColor='bg-neat-purple'
          includes={["Granular access controls", "Billing & Licence support"]}
        />
        <PlanCard
          plan='Standard'
          price='9.50'
          users='1-100'
          lasts='Free for 7 days'
          buttonText='Start trial'
          textColor='text-neat-turquoise'
          bgColor='bg-neat-turquoise'
          includes={["Granular access controls", "Guidance & Assistance"]}
        />
        <PlanCard
          plan='Premium'
          price='16.50'
          users='1-100'
          lasts='Free trial'
          buttonText='Start trial'
          textColor='text-neat-yellow'
          bgColor='bg-neat-yellow'
          includes={["Granular access controls", "Technical support 24/7"]}
        />
      </div>

      <div className='border shadow-md rounded-md text-center mt-8 px-2 py-10 w-full lg:w-3/4 lg:mx-auto text-sm md:text-lg'>
        <p>
          <span className='font-bold mr-2'>101+ users?</span>
          Get a discount tailored for large teams!
          <a
            className='ml-2 text-deep-blue underline hover:no-underline'
            href='#'
          >
            Calculate your price
          </a>
        </p>
      </div>
    </section>
  );
};

export default Plans;
