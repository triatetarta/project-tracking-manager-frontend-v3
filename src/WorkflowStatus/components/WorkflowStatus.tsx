import Button from "../../Button/components/Button";
import WorkflowInfo from "../../Homepage/components/WorkflowInfo";
import { PlusIcon } from "@heroicons/react/outline";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import NewStatus from "./NewStatus";
import { useGetWorkflowStatusQuery } from "../features/workflowsApiSlice";
import StatusCard from "./StatusCard";
import { useGetTicketsQuery } from "../../Tickets/features/ticketsApiSlice";

const WorkflowStatus = () => {
  const { isAdmin } = useAuth();
  const { data: workflowStatus } = useGetWorkflowStatusQuery(
    "workflowStatusList",
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: tickets } = useGetTicketsQuery("ticketList");

  const [openAddStatus, setOpenAddStatus] = useState(false);

  return (
    <main className='container mx-auto flex flex-col px-2 text-header-main'>
      <h2 className='mt-6 text-xl font-medium'>WORKFLOW</h2>

      <div className='mt-10'>
        <div className='flex items-center justify-between mb-2'>
          <h3 className='font-medium'>Current Workflow</h3>
          {isAdmin ? (
            <Button
              onClick={() => setOpenAddStatus(true)}
              classNames='flex items-center justify-center hover:bg-gray-200 px-3 py-3 rounded-lg transition-all duration-200'
              textClassNames='text-xs font-semibold'
              icon={<PlusIcon className='w-3 h-3 text-gray-text' />}
              text='Add a Status'
            />
          ) : null}
        </div>

        <div className='flex items-center flex-wrap gap-4'>
          {workflowStatus?.ids.map((statusId) => {
            return (
              <StatusCard
                key={statusId}
                statusId={statusId}
                tickets={tickets}
                workflow
                classNames='flex flex-col shadow-md border py-4 px-6 rounded-lg w-[320px] bg-pale-bg select-none '
              />
            );
          })}
        </div>
      </div>

      <div className='border-b-2 text-gray-text my-12' />
      <WorkflowInfo classNames='flex flex-col md:flex-row items-center justify-center text-blue-text select-none' />

      <AnimatePresence>
        {openAddStatus ? (
          <NewStatus setOpenAddStatus={setOpenAddStatus} />
        ) : null}
      </AnimatePresence>
    </main>
  );
};

export default WorkflowStatus;
