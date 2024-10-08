import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import globalReducer from "./slices/global.slice";
import organizationReducer from "./slices/organization.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    global: globalReducer,
    organization: organizationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
