import { RootState } from "../index";
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  AsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";
import userService from "../../service/user.service";
import { ICreateUser, ICurrentUser, IUpdateUser } from "../../../@types/common";
import { IUserResponseRowsCountResponse } from "../../../@types/responses";
import { toast } from "react-toastify";
import Router from "next/router";
const cookieCutter = require("cookie-cutter");

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

export const getAuthCookie = createAsyncThunk(
  `/cookie`,
  async (): Promise<ICurrentUser | any> => {
    const data = await cookieCutter.get("authorization");
    const msg = "You logged in successfully";
    return { data, msg };
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
    const id = data.id;
    return data;
  }
);

export const updateUserById = createAsyncThunk(
  `users/update/`,
  async (updateUser: IUpdateUser, { dispatch }) => {
    const id = Number(updateUser.id);
    const user_data = {
      user_name: updateUser.user_name,
      is_blocked: updateUser?.is_blocked,
    };
    const { status, data } = await userService.updateUserById(id, user_data);
    dispatch(getAllUsers());
    dispatch(getUserByEmail());
    dispatch(totalbuilds());
    return { status, data };
  }
);

export const totalbuilds = createAsyncThunk(`build/totalbuilds`, async () => {
  const { status, data } = await userService.totalbuilds();
  return { status, data };
});

export const windowStatus = createAsyncThunk(
  `windowStatus/update`,
  async (): Promise<any> => {
    const  data  = 'true'
    return data;
  }
);
export const logout = createAsyncThunk(
  `user/logout`,
  async (): Promise<ICurrentUser> => {
    const { data } = await userService.logOut();
    return data;
  }
);
// export const googleCallBack = createAsyncThunk(
//   `user/callback`,
//   async (): Promise<ICurrentUser> => {
//     const { data } = await userService.googleCallBack();
//     return data;
//   }
// );
interface State {
  id: number;
  loading: boolean;
  error: string | undefined;
  loggedInUser: any;
  userData: ICreateUser;
  usersList: ICreateUser[];
  editUser: IUserResponseRowsCountResponse | any;
  totalCount: IUserResponseRowsCountResponse | any;
  toastLog: any;
  windowStatus:any;
  callBack:any
}

const initialState: State = {
  loggedInUser: [],
  userData: {},
  loading: false,
  error: undefined,
  id: 0,
  usersList: [],
  editUser: {
    status: true,
    rows: [],
  },
  totalCount: {
    status: true,
    rows: [],
  },
  toastLog: "",
  windowStatus:'false',
  callBack:{}

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
    callBack:(state:State,action: PayloadAction<any>) => {
      return { ...state, callBack: action.payload };
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
      .addCase(getAuthCookie.fulfilled, (state, action) => {
        if (action.payload?.data) {
          if (
            Router.asPath == "/" ||
            Router.asPath == "/search?selfLearning=true" ||
            Router.asPath == "/search?selfLeaning=false" ||
            Router.asPath == "/profile" ||
            Router.asPath == "/UserGuide"
          ) {
            toast.success("");
          } else {
            toast.success("You logged in successfully Please save your data");
          }
          // setTimeout(() => {
          //   Router.reload();
          // }, 3000)
          // if (
          //   Router.asPath == "/" ||
          //   Router.asPath == "/search?selfLearning=true" ||
          //   Router.asPath == "/search?selfLeaning=false" ||
          //   Router.asPath == "/profile" ||
          //   Router.asPath == "/UserGuide"
          // ) {
          //    Router.reload();
          //   //  Router.asPath == "/profile" ? toast.success("You are logged in successfully") :
          // }

          return {
            ...state,
            loading: false,
            toastLog: action.payload.msg,
            loggedInUser: action.payload.data,
          };
        } else {
          return {
            ...state,
            loading: false,
            loggedInUser: initialState.loggedInUser,
            toastLog: initialState.toastLog,
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
          toast.success("");
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
      .addCase(windowStatus.fulfilled, (state, action) => {
        if (action.payload) {
          return {
            ...state,
            windowStatus: action.payload,
          };
        } else {
          return {
            ...state,
            loading: false,
          };
        }
      })
      .addCase(logout.fulfilled, (state, action) => {
        if (action.payload) {
          window.location.replace("/");
          toast.success(action.payload.message);
          return {
            ...state,
            loading: false,
          };
        } else {
          return {
            ...state,
            loading: false,
          };
        }
      })
      // .addCase(googleCallBack.fulfilled, (state, action) => {
      //   if (action.payload) {
      //     console.log("FFFFFFFFFFFFFFF",action.payload)
      //     return {
      //       ...state,
      //       loading: false,
      //       callBack:action.payload
      //     };
      //   } else {
      //     return {
      //       ...state,
      //       loading: false,
      //       callBack:initialState.callBack

      //     };
      //   }
      // })

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
