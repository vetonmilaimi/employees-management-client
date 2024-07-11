import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUserSlice } from "../utils/types";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "system-auth",
  storage,
};

const initialState: { value: AuthUserSlice } = {
  value: {
    user: {
      _id: "",
      email: "",
    },
    session: {
      user_id: "",
      access_token: "",
      refresh_token: "",
    },
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthUserSlice>) => {
      state.value = { ...action.payload };
    },
  },
});

export const AuthSliceReducers = authSlice.actions;
export default persistReducer(persistConfig, authSlice.reducer);
