import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGlobalSlice } from "../../utils/types";

interface IShowModal {
  component: JSX.Element;
}

const initialState: { value: IGlobalSlice } = {
  value: {
    modal: {
      visible: false,
      component: null,
    },
  },
};

export const globalSlice = createSlice({
  name: "global-slice",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<IShowModal>) => {
      state.value.modal.visible = true;
      state.value.modal.component = action.payload.component;
    },
    closeModal: (state) => {
      state.value.modal.visible = false;
      state.value.modal.component = null;
    },
  },
});

export const GlobalSliceReducers = globalSlice.actions;
export default globalSlice.reducer;
