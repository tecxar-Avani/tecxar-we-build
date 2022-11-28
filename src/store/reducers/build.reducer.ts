import { RootState } from "../index";
import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  PayloadAction,
  AsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";
import BuildService from "../../service/build.service";
import Router from "next/router";
import { toast } from "react-toastify";
import { IBuildRowsCountResponse } from "../../../@types/responses";
import { IBoxReviews, IVideoBuild } from "../../../@types/common";
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;

export const getBuildByUrl: any = createAsyncThunk(
  `build/get/url`,
  async (url?: string): Promise<IBuildRowsCountResponse> => {
    const { data } = await BuildService.listBuilds(url);
    const dataBox = {box:data.box,
    rows:data.data}
    return { status: data.status, rows: dataBox };
  }
);

// export const addBoxReviews = createAsyncThunk(
//   `boxReviews/add`,
//   async (createboxReviewsData: IBoxReviews, { dispatch }) => {
//     const { status, data } = await BuildService.addBoxReviews(
//       createboxReviewsData
//     );
//     return { status, data };
//   }
// );



    
interface State {
  id: number;
  build: IVideoBuild;
  loading: boolean;
  error: string | undefined;
  buildList: IBuildRowsCountResponse;
  // box:IVideoBuild[];
}

const initialState: State = {
  build: {
    video_url: "",
    provider: "youtube",
    type_of_video: "practical",
    potential_polarization: "high",
    difficulty_level: "high",
  },
  buildList: {
    status: true,
    rows: []
    },
  loading: false,
  error: undefined,
  id: 0,
};

const isPendingAction = (action: AnyAction): action is PendingAction =>
  action.type.startsWith(buildSlice.name) && action.type.endsWith("/pending");
const isRejectedAction = (action: AnyAction): action is RejectedAction =>
  action.type.startsWith(buildSlice.name) && action.type.endsWith("/rejected");

const buildSlice = createSlice({
  name: "build",
  initialState,
  reducers: {
    updateBuildData: (state: State, action: PayloadAction<IVideoBuild>) => {
      return { ...state, buildData: action.payload };
    },
    build: (state: State, action: PayloadAction<IVideoBuild>) => {
      return { ...state, build: action.payload };
    },
    buildData: (state: State, action: PayloadAction<IVideoBuild>) => {
      return { ...state, buildData: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBuildByUrl.fulfilled, (state, action) => {
        if (action.payload.status) {
          return {
            ...state,
            loading: false,
            buildList: action.payload.rows,
            box: action.payload.box,
          };
        } else {
          return {
            ...state,
            loading: false,
            buildList: initialState.buildList,
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

export const buildReducer = buildSlice.reducer;
export const buildSelector = (state: RootState) => state.builds;
export const { updateBuildData, buildData, build } = buildSlice.actions;
