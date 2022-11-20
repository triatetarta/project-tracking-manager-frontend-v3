import AccountHeader from "./AccountHeader";
import AccountInfo from "./AccountInfo";

const Account = () => {
  return (
    <section className='flex flex-col min-h-[calc(100vh-17.9rem)]'>
      <AccountHeader />

      <main className='container mx-auto px-2 flex flex-col-reverse md:flex-row space-x-0 md:space-x-10 mt-20'>
        <AccountInfo />
        {/* <AccountMain ticketClickHandle={ticketClickHandle} /> */}
      </main>
    </section>
  );
};

export default Account;
