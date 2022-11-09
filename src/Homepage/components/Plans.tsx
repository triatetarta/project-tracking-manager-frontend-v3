import PlanCard from "./PlanCard";

const Plans = () => {
  return (
    <section className='text-header-main flex flex-col mb-20 px-2'>
      <div>
        <h1 className='text-xl md:text-4xl font-semibold text-center'>
          Simple Plans hosted in the cloud
        </h1>
      </div>

      <div className='flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 space-x-0 md:space-x-4 mt-10 w-full lg:w-3/4 lg:mx-auto'>
        <PlanCard
          plan='Free'
          price='0'
          users='up to 10'
          selected
          lasts='Free forever'
          payment='No obligation'
          buttonText='Get started'
        />
        <PlanCard
          plan='Standard'
          price='9.50'
          users='1-100'
          lasts='Free for 7 days'
          payment='No credit card needed'
          buttonText='Start trial'
        />
        <PlanCard
          plan='Premium'
          price='16.50'
          users='1-100'
          lasts='Free forever'
          payment='No credit card needed'
          buttonText='Start trial'
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
