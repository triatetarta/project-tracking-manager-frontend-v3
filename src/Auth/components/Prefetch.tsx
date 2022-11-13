import { store } from "../../app/store";
import { ticketsApiSlice } from "../../Tickets/features/ticketsApiSlice";
import { usersApiSlice } from "../features/usersApiSlice";
import { projectsApiSlice } from "../../Projects/features/projectsApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    const tickets = store.dispatch(
      ticketsApiSlice.endpoints.getTickets.initiate("ticketList")
    );

    const users = store.dispatch(
      usersApiSlice.endpoints.getUsers.initiate("userList")
    );

    const projects = store.dispatch(
      projectsApiSlice.endpoints.getProjects.initiate("projectList")
    );

    return () => {
      tickets.unsubscribe();
      projects.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default Prefetch;
