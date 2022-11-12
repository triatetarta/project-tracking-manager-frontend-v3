const Workflow = () => {
  return (
    <section className='flex flex-col md:flex-row items-center justify-center my-10 md:my-32 text-header-main'>
      <div className='p-4'>
        <h3 className='font-semibold text-xl md:text-2xl'>
          Choose a workflow,
        </h3>
        <h3 className='font-semibold text-xl md:text-2xl'>
          track your progress.
        </h3>
      </div>

      <div className='flex items-center space-x-3 text-xs md:text-xl font-semibold uppercase p-4'>
        <div className='rounded-full bg-gray-200 h-2 w-2 md:h-4 md:w-4' />
        <div className='bg-deep-blue text-white px-2 py-1 rounded-md'>
          To Do
        </div>
        <div className='bg-gray-200 h-1 w-6 md:w-8' />
        <div className='bg-flow-yellow px-2 py-1 rounded-md'>In progress</div>
        <div className='bg-gray-200 h-1 w-6 md:w-8' />
        <div className='bg-flow-green px-2 py-1 rounded-md'>Closed</div>
      </div>
    </section>
  );
};

export default Workflow;
