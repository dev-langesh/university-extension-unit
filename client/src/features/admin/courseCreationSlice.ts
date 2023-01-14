import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Define a type for the slice state
interface ccState {
  open: boolean;
}

// Define the initial state using that type
const initialState: ccState = {
  open: false,
};

export const CourseCreationSlice = createSlice({
  name: "CCF",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openCCF: (state) => {
      state.open = true;
    },

    closeCCF: (state) => {
      state.open = false;
    },
  },
});

export const { openCCF, closeCCF } = CourseCreationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getCCF = (state: RootState) => state.CCF.open;

export default CourseCreationSlice.reducer;
