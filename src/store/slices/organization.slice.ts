import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrganization } from "../../utils/types";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
  key: "organization",
  storage,
};

const initialState: { value: IOrganization } = {
  value: {
    _id: "",
    name: "",
    description: "",
    users: [],
  },
};

export const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<IOrganization>) => {
      state.value = { ...action.payload };
    },
    remove: (state) => {
      state.value = { ...initialState.value };
    },
  },
});

export const OrganizationSliceReducers = organizationSlice.actions;
export default persistReducer(persistConfig, organizationSlice.reducer);
