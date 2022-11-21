import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./model";

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setTicketDetailsOpen: (state, action) => {
      state.isTicketDetailsOpen = true;
      state.ticketId = action.payload;
    },
    setTicketDetailsClose: (state) => {
      state.isTicketDetailsOpen = false;
    },
  },
});

export const { setTicketDetailsOpen, setTicketDetailsClose } =
  ticketsSlice.actions;
export default ticketsSlice.reducer;
