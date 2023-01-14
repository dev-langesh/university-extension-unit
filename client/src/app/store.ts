import { configureStore } from "@reduxjs/toolkit";
import CourseCreationReducer from "../features/admin/courseCreationSlice";
import ProfileReducer from "../features/profile/profileSlice";

export const store = configureStore({
  reducer: {
    profile: ProfileReducer,
    CCF: CourseCreationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
