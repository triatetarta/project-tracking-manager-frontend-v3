import { IPlanCard } from "../interfaces/IPlanCard";
import { CheckIcon } from "@heroicons/react/outline";

const PlanCard = ({
  plan,
  price,
  users,
  lasts,
  buttonText,
  textColor,
  bgColor,
  includes,
}: IPlanCard) => {
  return (
    <div className='border rounded-md w-full md:w-1/3 flex flex-col items-center justify-center text-center shadow-md overflow-hidden bg-pale-bg'>
      <div
        className={`py-2 md:py-5 w-full h-full font-semibold text-lg md:text-xl ${textColor}`}
      >
        {plan}
      </div>
      <div className='py-8 bg-white rounded-md border w-11/12'>
        <h3 className='text-2xl md:text-4xl font-bold pb-6 pt-4 text-blue-text'>
          £ {price}
        </h3>
        <h4 className='text-sm md:text-base font-normal'>per user/month</h4>
        <h5 className='text-xs'>{users} users</h5>

        <button
          className={`rounded relative inline-flex group items-center justify-center px-3.5 py-2 mt-6 cursor-pointer text-white overflow-hidden ${bgColor}`}
        >
          <span className='absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10'></span>
          <span className='relative'>{buttonText}</span>
        </button>

        <p className={`text-xs font-medium mt-3 ${textColor}`}>{lasts}</p>
      </div>

      <h5 className={`uppercase font-medium mt-10 mb-2 ${textColor}`}>
        {plan} plan
      </h5>
      <div className='flex flex-col space-y-2 mb-14'>
        {includes?.map((item, index) => {
          return (
            <div key={index} className='flex items-center'>
              <div className='bg-white rounded-full border p-1'>
                <CheckIcon className={`h-4 w-4 ${textColor}`} />
              </div>
              <span className='text-sm font-medium ml-2'>{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlanCard;
