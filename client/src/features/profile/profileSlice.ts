import { Satellite } from "@mui/icons-material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Define a type for the slice state
interface ProfileState {
  name: any;
  email: any;
  user?: "student" | "administrator";
  openProfile?: boolean;
}

// Define the initial state using that type
const initialState: ProfileState = {
  name: "",
  email: "",
  openProfile: false,
};

export const ProfileSlice = createSlice({
  name: "profile",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.user = action.payload.user;
    },

    setUserType: (
      state,
      action: PayloadAction<{ user?: "student" | "administrator" }>
    ) => {
      state.user = action.payload.user;
    },

    openProfile: (state) => {
      state.openProfile = true;
    },

    closeProfile: (state) => {
      state.openProfile = false;
    },

    reset: (state) => {
      state.name = "";
      state.email = "";
      state.openProfile = false;
      state.user = undefined;
    },
  },
});

export const { setProfile, setUserType, reset, openProfile, closeProfile } =
  ProfileSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getProfile = (state: RootState) => state.profile;

export default ProfileSlice.reducer;
