import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { AuthUserSlice, UserSession } from "../../utils/types";
import { USER_ROLES } from "../../utils/constants";

const persistConfig = {
  key: "system-auth",
  storage,
};

const initialState: { value: AuthUserSlice } = {
  value: {
    user: {
      _id: "",
      email: "",
      role: USER_ROLES.ADMIN,
    },
    session: {
      userId: "",
      accessToken: "",
      refreshToken: "",
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
    logout: (state) => {
      const temp = { ...state.value };
      temp.session = { ...initialState.value.session };
      temp.user = { ...initialState.value.user };
      state.value = temp;
    },
    reGenerateAccessToken: (state, action: PayloadAction<UserSession>) => {
      const temp = { ...state.value };
      temp.session.accessToken = action.payload.accessToken;
      temp.session.refreshToken = action.payload.refreshToken;
      state.value = temp;
    },
  },
});

export const AuthSliceReducers = authSlice.actions;
export default persistReducer(persistConfig, authSlice.reducer);
