import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { goalRXType, goalTXType } from "../../types/goalTypes";
import goalService from "./goalService";

type InitialStateType = {
  goals: goalRXType[];
  error: boolean;
  success: boolean;
  loading: boolean;
  message: string;
};

const initialState: InitialStateType = {
  goals: [],
  error: false,
  success: false,
  loading: false,
  message: "",
};

//actions
export const createGoal = createAsyncThunk(
  "goal/createGoal",
  async (goal: goalTXType, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user?.token;
      return await goalService.createGoal(goal, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getGoals = createAsyncThunk(
  "goal/getGoals",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user?.token;
      return await goalService.getGoals(token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteGoal = createAsyncThunk(
  "goal/deleteGoal",
  async (_id: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user?.token;
      return await goalService.deleteGoal(_id, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createGoal.fulfilled,
        (state, action: PayloadAction<goalRXType>) => {
          state.loading = false;
          state.success = true;
          state.goals = [...state.goals, action.payload];
        }
      )
      .addCase(createGoal.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(getGoals.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getGoals.fulfilled,
        (state, action: PayloadAction<goalRXType[]>) => {
          state.loading = false;
          state.success = true;
          state.goals = action.payload;
        }
      )
      .addCase(getGoals.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteGoal.fulfilled,
        (state, action: PayloadAction<goalRXType>) => {
          state.loading = false;
          state.success = true;
          state.goals = state.goals.filter(
            (goal) => goal._id !== action.payload._id
          );
        }
      )
      .addCase(deleteGoal.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export default goalSlice.reducer;
export const { reset } = goalSlice.actions;
