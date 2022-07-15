import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  UserSavedType,
  UserRegisterType,
  UserLoginType,
} from "../../types/userType";
import authService from "./authService";

const userStorage = localStorage.getItem("user");
let user;
if (typeof userStorage === "string") {
  user = JSON.parse(userStorage);
}

type InitialStateType = {
  user: UserSavedType | null;
  error: boolean;
  success: boolean;
  loading: boolean;
  message: string;
};

const initialState: InitialStateType = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
  message: "",
};

// async actions
export const register = createAsyncThunk(
  "auth/register",
  async (user: UserRegisterType, thunkAPI) => {
    try {
      return await authService.register(user);
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

export const login = createAsyncThunk(
  "auth/login",
  async (user: UserLoginType, thunkAPI) => {
    try {
      return await authService.login(user);
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

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = false;
      state.loading = false;
      state.message = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<UserSavedType>) => {
          state.loading = false;
          state.success = true;
          state.user = action.payload;
        }
      )
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<UserSavedType>) => {
          state.loading = false;
          state.success = true;
          state.user = action.payload;
        }
      )
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
export const { reset } = authSlice.actions;
