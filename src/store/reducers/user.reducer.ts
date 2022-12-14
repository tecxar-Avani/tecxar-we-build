import { RootState } from "../index";
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  AsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";
import userService from "../../service/user.service";
import {
  IBoxes,
  ICreateUser,
  ICurrentUser,
  IUpdateUser,
} from "../../../@types/common";
import { IUserResponseRowsCountResponse } from "../../../@types/responses";
import { toast } from "react-toastify";
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;

export const getUserAuth = createAsyncThunk(
  `userAuth/get`,
  async (): Promise<ICurrentUser> => {
    const { data } = await userService.userAuthentication();
    return data;
  }
);

export const getAllUsers: any = createAsyncThunk(
  `users/`,
  async (): Promise<ICreateUser> => {
    const { data } = await userService.getAllUsers();

    return data;
  }
);

export const getUserByEmail = createAsyncThunk(
  `users/userByEmail`,
  async (): Promise<ICurrentUser> => {
    const { data } = await userService.getUserByMail();
    return data;
  }
);

export const updateUserById = createAsyncThunk(
  `users/update/`,
  async (updateUser: IUpdateUser, { dispatch }) => {
    console.log(updateUser)
    const id = Number(updateUser.id);
    const user_data = {
       user_name : updateUser.user_name,
     is_blocked : updateUser?.is_blocked
  }
    const { status, data } = await userService.updateUserById(id,user_data);
    dispatch(getAllUsers());
    return { status, data };
  }
);

export const totalbuilds = createAsyncThunk(`build/totalbuilds`, async () => {
  const { status, data } = await userService.totalbuilds();
  return { status, data };
});

interface State {
  id: number;
  loading: boolean;
  error: string | undefined;
  loggedInUser: ICurrentUser;
  userData: ICreateUser;
  usersList: ICreateUser[];
  editUser:IUserResponseRowsCountResponse | any
  totalCount:IUserResponseRowsCountResponse | any;
}

const initialState: State = {
  loggedInUser: {},
  userData: {},
  loading: false,
  error: undefined,
  id: 0,
  usersList: [],
  editUser:{
    status: true,
    rows: [],
  },
  totalCount:{
    status: true,
    rows: [],
  },
};

const isPendingAction = (action: AnyAction): action is PendingAction =>
  action.type.startsWith(userSlice.name) && action.type.endsWith("/pending");
const isRejectedAction = (action: AnyAction): action is RejectedAction =>
  action.type.startsWith(userSlice.name) && action.type.endsWith("/rejected");

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userData: (state: State, action: PayloadAction<any>) => {
      return { ...state, userData: action.payload };
    },
    loggedInUser: (state: State, action: PayloadAction<any>) => {
      return { ...state, user: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAuth.fulfilled, (state, action) => {
        if (action.payload) {
          return {
            ...state,
            loading: false,
            loggedInUser: action.payload,
          };
        } else {
          return {
            ...state,
            loading: false,
            loggedInUser: initialState.loggedInUser,
          };
        }
      })
      .addCase(getUserByEmail.fulfilled, (state, action) => {
        if (action.payload) {
          return {
            ...state,
            loading: false,
            userData: action.payload,
          };
        } else {
          return {
            ...state,
            loading: false,
            userData: initialState.userData,
          };
        }
      })
      .addCase(totalbuilds.fulfilled, (state, action) => {
        if (action.payload) {
          return {
            ...state,
            loading: false,
            totalCount: action.payload.data,
          };
        } else {
          return {
            ...state,
            loading: false,
            totalCount: initialState.totalCount,
          };
        }
      })

      .addCase(getAllUsers.fulfilled, (state, action) => {
        if (action.payload) {
          return {
            ...state,
            loading: false,
            usersList: action.payload,
          };
        } else {
          return {
            ...state,
            loading: false,
            usersList: initialState.usersList,
          };
        }
      })

      .addCase(updateUserById.fulfilled, (state, action) => {
        if (action.payload.status) {
          toast.success(action.payload.data.message);
          return {
            ...state,
            loading: false,
            editUser: action.payload,
          };
        } else {
          return {
            ...state,
            loading: false,
            editUser: action.payload.data.editUser,
          };
        }
      })

      .addMatcher(isPendingAction, (state) => {
        state.loading = true;
      })
      .addMatcher(isRejectedAction, (state) => {
        state.loading = false;
      });
  },
});

export const userReducer = userSlice.reducer;
export const userSelector = (state: RootState) => state.users;
export const { userData, loggedInUser } = userSlice.actions;
