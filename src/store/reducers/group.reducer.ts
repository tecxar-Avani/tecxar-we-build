import { RootState } from "../index";
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  AsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
    IGroup,
} from "../../../@types/common";
import groupService from "../../service/group.service";
import { IGroupRowsCountResponse } from "../../../@types/responses";



type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;

export const createGroup = createAsyncThunk(
  `group/add`,
  async (createGroupData: IGroup, { dispatch }) => {
    const { status, data } = await groupService.addGroup(
      createGroupData
    );
    dispatch(getGroupBoxesByBuild())
    return { status, data };
  }
);
export const getGroupBoxesByBuild = createAsyncThunk(
  `group/`,
  async (buildId: any) => {
    const { status, data } = await groupService.getGroupBoxesByBuild(
      buildId
    );
    return { status: data.status, rows: data };
  }
);

interface State {
  id: number;
  group: IGroup;
  loading: boolean;
  error: string | undefined;
  groupList:IGroupRowsCountResponse;
}

const initialState: State = {
  groupList:{
    status: true,
    rows: [],
  },
    group: {},
  loading: false,
  error: undefined,
  id: 0,
};

const isPendingAction = (action: AnyAction): action is PendingAction =>
  action.type.startsWith(groupSlice.name) &&
  action.type.endsWith("/pending");
const isRejectedAction = (action: AnyAction): action is RejectedAction =>
  action.type.startsWith(groupSlice.name) &&
  action.type.endsWith("/rejected");

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    updateGroupData: (state: State, action: PayloadAction<IGroup>) => {
      return { ...state, groupData: action.payload };
    },
    groupData: (state: State, action: PayloadAction<IGroup>) => {
      return { ...state, groupData: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGroup.fulfilled, (state, action) => {
        if (action.payload.data.status) {
          toast.success(action.payload.data.message);
          return {
            ...state,
            loading: false,
            groupData: action.payload.data,
          };
        } else {
          toast.error(action.payload.data.error.message);
          return {
            ...state,
            loading: false,
            groupData: initialState.group,
          };
        }
      })
      .addCase(getGroupBoxesByBuild.fulfilled, (state, action) => {
        if (action.payload.status) {
          return {
            ...state,
            loading: false,
            groupList: action.payload,
          };
        } else {
          return {
            ...state,
            loading: false,
            groupList: action.payload,
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

export const groupReducer = groupSlice.reducer;
export const groupSelector = (state: RootState) => state.groups;
export const { updateGroupData, groupData } = groupSlice.actions;
