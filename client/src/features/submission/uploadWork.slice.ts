import { Satellite } from "@mui/icons-material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Define a type for the slice state
interface StateType {
  activity_title: string;
  due_date: string;
  activity_id: string;
}

// Define the initial state using that type
const initialState: StateType = {
  activity_title: "",
  due_date: "",
  activity_id: "",
};

export const SubmitSlice = createSlice({
  name: "submit",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCurrentActivity: (state, action: PayloadAction<StateType>) => {
      state.activity_title = action.payload.activity_title;
      state.due_date = action.payload.due_date;
      state.activity_id = action.payload.activity_id;
    },
  },
});

export const { setCurrentActivity } = SubmitSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getSelectedActivity = (state: RootState) => state.submit;

export default SubmitSlice.reducer;
