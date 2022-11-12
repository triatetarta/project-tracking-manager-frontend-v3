import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { ITicket } from "../interfaces/ITicket";
import type { EntityState } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const ticketsAdapter = createEntityAdapter<ITicket>({});

const initialState = ticketsAdapter.getInitialState();

export const ticketsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query<EntityState<ITicket>, void>({
      query: () => ({
        url: "/tickets",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: ITicket[]) => {
        const loadedTickets = responseData.map((ticket) => {
          ticket.id = ticket._id;
          return ticket;
        });

        return ticketsAdapter.setAll(initialState, loadedTickets);
      },
      providesTags: (result, error, tag) => {
        if (result?.ids) {
          return [
            { type: "Ticket" as const, id: "LIST" },
            ...result.ids.map((id) => ({ type: "Ticket" as const, id })),
          ];
        } else return [{ type: "Ticket" as const, id: "LIST" }];
      },
    }),
  }),
});

export const { useGetTicketsQuery } = ticketsApiSlice;

export const selectTicketsResult =
  ticketsApiSlice.endpoints.getTickets.select();

const selectTicketsData = createSelector(
  selectTicketsResult,
  (ticketsResult) => ticketsResult.data
);

export const {
  selectAll: selectAllTickets,
  selectById: selectTicketById,
  selectIds: selectTicketIds,
} = ticketsAdapter.getSelectors(
  (state: RootState) => selectTicketsData(state) ?? initialState
);
