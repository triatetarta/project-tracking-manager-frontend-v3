import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./model";

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalOpen: (state) => {
      state.modalOpen = true;
    },
    setModalClose: (state) => {
      state.modalOpen = false;
    },
  },
});

export const { setModalOpen, setModalClose } = modalSlice.actions;
export default modalSlice.reducer;
