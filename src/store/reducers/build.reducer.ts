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
import { IBoxes, IVideoBuild } from "../../../@types/common";
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;

export const getBuilds: any = createAsyncThunk(
  `build/get/`,
  async (): Promise<IBuildRowsCountResponse> => {
    const { data } = await BuildService.listBuilds();
    const dataBox = { box: data.box, rows: data.data };
    return { status: data.status, rows: dataBox };
  }
);

export const getOthersBuilds: any = createAsyncThunk(
  `build/getOtherBuild/`,
  async (): Promise<IBuildRowsCountResponse> => {
    const { data } = await BuildService.othersBuilds();
    const dataBox = { box: data.box, rows: data.data };
    return { status: data.status, rows: dataBox };
  }
);

export const getUserInteractedBuild: any = createAsyncThunk(
  `build/get/userInteractedBuild`,
  async (): Promise<IBuildRowsCountResponse> => {
    const { data } = await BuildService.getUserInteractedBuild();
    const dataBox = { box: data.box, rows: data.data };
    return { status: data.status, rows: dataBox };
  }
);

export const getBuildByUrl: any = createAsyncThunk(
  `build/get/url`,
  async (searchData:{url?:string,search?:string}): Promise<IBuildRowsCountResponse> => {
    const { data } = await BuildService.getBuildByUrl(searchData.url,searchData.search);
    return { status: data.status, rows: data };
  }
);
export const getBuildById: any = createAsyncThunk(
  `build/get/id`,
  async (id: number): Promise<IBuildRowsCountResponse> => {
    const { data } = await BuildService.getBuildById(id);
    return { status: data.status, rows: data };
  }
);

export const addBuild = createAsyncThunk(
  `build/add`,
  async (createBuildData: IVideoBuild) => {
    const { status, data } = await BuildService.addBuild(createBuildData);
    return { status, data };
  }
);

export const getUsersBuild : any = createAsyncThunk(
  `build/`,
  async (getBuildOfUser: IVideoBuild) => {
  const {status,data} = await BuildService.getUsersBuild();
  return { status, data };
  }
)

export const UpdateUsersBuild = createAsyncThunk (
  `build/update/`,
  async (updateBuildData : IVideoBuild) => {
    const id = Number(updateBuildData.id);
    const editData = {
      id: Number(updateBuildData.id),
      video_url: updateBuildData.video_url,
      type_of_video: updateBuildData.type_of_video,
      potential_polarization: updateBuildData.potential_polarization,
      difficulty_level: updateBuildData.difficulty_level,
    };
    const {status,data} = await BuildService.UpdateBuildById(id,editData);
    return {status, data};
  }
);
interface State {
  id: number;
  build: IVideoBuild;
  loading: boolean;
  error: string | undefined;
  buildList: IBuildRowsCountResponse | any;
  userBuildList: IBuildRowsCountResponse | any;
  buildListByUrl: IBuildRowsCountResponse | any;
  buildById: IBuildRowsCountResponse | any;
  userBuilds:IBuildRowsCountResponse | any;
  boxes: IBoxes;
}

const initialState: State = {
  build: {
    video_url: "",
    provider: "youtube",
  },
  buildList: {
    status: true,
    rows: [],
  },
  userBuildList: {
    status: true,
    rows: [],
  },
  buildListByUrl: {
    status: true,
    rows: [],
  },
  buildById: {
    status: true,
    rows: [],
  },
  userBuilds: {
    status: true,
    rows: [],
  },
  loading: false,
  error: undefined,
  id: 0,
  boxes: {
    id: 0,
    description: "",
  },
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
      .addCase(getBuilds.fulfilled, (state, action) => {
        if (action.payload.status) {
          return {
            ...state,
            loading: false,
            buildList: action.payload.rows,
            boxes: action.payload.boxes,
          };
        } else {
          return {
            ...state,
            loading: false,
            buildList: initialState.buildList,
          };
        }
      })
      .addCase(getOthersBuilds.fulfilled, (state, action) => {
        if (action.payload.status) {
          return {
            ...state,
            loading: false,
            buildList: action.payload.rows,
            boxes: action.payload.boxes,
          };
        } else {
          return {
            ...state,
            loading: false,
            buildList: initialState.buildList,
          };
        }
      })
      .addCase(getUserInteractedBuild.fulfilled, (state, action) => {
        if (action.payload) {
          return {
            ...state,
            loading: false,
            userBuildList: action.payload.rows,
            boxes: action.payload.boxes,
          };
        } else {
          return {
            ...state,
            loading: false,
            userBuildList: initialState.userBuildList,
          };
        }
      })
      .addCase(getBuildByUrl.fulfilled, (state, action) => {
        if (action.payload.status) {
          return {
            ...state,
            loading: false,
            buildListByUrl: action.payload.rows,
            boxes: action.payload.boxes,
          };
        } else {
          return {
            ...state,
            loading: false,
            buildListByUrl: initialState.buildListByUrl,
          };
        }
      })
      .addCase(getBuildById.fulfilled, (state, action) => {
        if (action.payload.status) {
          return {
            ...state,
            loading: false,
            buildById: action.payload.rows,
            boxes: action.payload.boxes,
          };
        } else {
          return {
            ...state,
            loading: false,
            buildById: initialState.buildById,
          };
        }
      })
      .addCase(getUsersBuild.fulfilled, (state, action) => {
        if (action.payload.status) {
          return {
            ...state,
            loading: false,
            userBuilds: action.payload.data,
          };
        } else {
          return {
            ...state,
            loading: false,
            userBuilds: initialState.userBuilds,
          };
        }
      })
      .addCase(addBuild.fulfilled, (state, action) => {
        if (action.payload.data.status) {
          toast.success(action.payload.data.message);
          return {
            ...state,
            loading: false,
            addBuildData: action.payload.data,
          };
        } else {
          toast.error(action.payload.data.error.message);
          return { ...state, loading: false, addBuildData: initialState.build };
        }
      })
      .addCase(UpdateUsersBuild.fulfilled, (state, action) => {
        if (action.payload.status) {
          toast.success(action.payload.data.message);
          return {
            ...state,
            loading: false,
            editData: action.payload,
          };
        } else {
          toast.error(action.payload.data.error.message);
          return {
            ...state,
            loading: false,
            editData: action.payload.data.editData,
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
