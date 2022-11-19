import CommentIcon from "../../Icons/components/CommentIcon";
import PlanIcon from "../../Icons/components/PlanIcon";
import ReleaseIcon from "../../Icons/components/ReleaseIcon";
import ReviewIcon from "../../Icons/components/ReviewIcon";

const Details = () => {
  return (
    <section className='flex w-full space-y-14 md:space-y-28 px-2 backgroundGradient py-16'>
      <div className='flex flex-col md:flex-row w-full justify-evenly'>
        <div className='flex flex-col mt-10 md:mt-0 self-center'>
          <div className='flex items-center mb-4'>
            <div className='blueCircleIconGradient p-4 rounded-full mr-3'>
              <PlanIcon classNames='w-6 h-6 text-white' />
            </div>
            <h3 className='font-semibold text-base md:text-xl text-blue-text'>
              Plan
            </h3>
          </div>

          <p className='text-sm md:text-lg mb-12 text-blue-fade-text'>
            Create user projects and issues, <br /> plan and distribute tasks
            across <br /> your team.
          </p>

          <div className='flex items-center mb-4'>
            <div className='blueCircleIconGradient p-4 rounded-full mr-3'>
              <CommentIcon classNames='w-6 h-6 text-white' />
            </div>
            <h3 className='font-semibold text-base md:text-xl text-blue-text'>
              Comment
            </h3>
          </div>
          <p className='text-sm md:text-lg text-blue-fade-text'>
            Prioritize and discuss <br /> your team`s work in full context
            <br />
            with complete visibility.
          </p>
        </div>

        <div className='flex flex-col mt-10 md:mt-0 self-center'>
          <div className='self-center md:self-end'>
            <div className='flex items-center mb-4'>
              <div className='blueCircleIconGradient p-4 rounded-full mr-3'>
                <ReviewIcon classNames='w-6 h-6 text-white' />
              </div>

              <h3 className='font-semibold text-base md:text-xl text-blue-text'>
                Review
              </h3>
            </div>
            <p className='text-sm md:text-lg mb-12 text-blue-fade-text'>
              Create user projects and issues, <br /> plan and distribute tasks
              across <br /> your team.
            </p>

            <div className='flex items-center mb-4'>
              <div className='blueCircleIconGradient p-4 rounded-full mr-3'>
                <ReleaseIcon classNames='w-6 h-6 text-white' />
              </div>
              <h3 className='font-semibold text-base md:text-xl text-blue-text'>
                Release
              </h3>
            </div>

            <p className='text-sm md:text-lg text-blue-fade-text'>
              Prioritize and discuss <br /> your team`s work in full context
              <br />
              with complete visibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
