import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGlobalSlice, MODAL_SIZES } from "../../utils/types";

interface IShowModal {
  component: JSX.Element;
  size?: MODAL_SIZES;
}

const initialState: { value: IGlobalSlice } = {
  value: {
    modal: {
      visible: false,
      component: null,
      size: MODAL_SIZES.MEDIUM,
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
      state.value.modal.size = action.payload.size || MODAL_SIZES.MEDIUM;
    },
    closeModal: (state) => {
      state.value.modal.visible = false;
      state.value.modal.component = null;
    },
  },
});

export const GlobalSliceReducers = globalSlice.actions;
export default globalSlice.reducer;
