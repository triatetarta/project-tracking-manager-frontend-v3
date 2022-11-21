import AccountHeader from "./AccountHeader";
import AccountInfo from "./AccountInfo";
import AccountMain from "./AccountMain";

const Account = () => {
  return (
    <section className='flex flex-col min-h-[calc(100vh-17.9rem)]'>
      <AccountHeader />

      <main className='container mx-auto px-2 flex flex-col-reverse md:flex-row space-x-0 md:space-x-10 mt-20'>
        <AccountInfo />
        <AccountMain />
      </main>
    </section>
  );
};

export default Account;
