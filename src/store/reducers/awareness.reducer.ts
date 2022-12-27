import { RootState } from "../index";
import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  PayloadAction,
  AsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";
import Router from "next/router";
import { toast } from "react-toastify";
import { IBuildReviewRowsCountResponse, IReviewResponseRowsCountResponse } from "../../../@types/responses";
import {
  IBoxReviews,
  IBoxReviewsResponse,
  ICreateFlashCard,
  IFlashCard,
  IUpdateBoxReviewsResponse,
} from "../../../@types/common";
import AwarenessService from "../../service/awareness.service";
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;

export const addAwareness = createAsyncThunk(
  `reviews/add`,
  async (createAwarenessData: IBoxReviews, { dispatch }) => {
    const { status, data } = await AwarenessService.addAwareness(
      createAwarenessData
    );
     dispatch(getAwarenessByBoxId(createAwarenessData?.build_id));
    return { status, data };
  }
);

export const getAwarenessByBoxId = createAsyncThunk(
  `reviews/`,
  async (buildId: number | undefined) => {
    const { status, data } = await AwarenessService.getAwarenessByBoxId(
      buildId
    ); 

    return { status, rows: data };
  }
);

export const addReviewResponse = createAsyncThunk(
  `reviewResponse/add`,
  async (createBoxReviewResponseData:IBoxReviewsResponse, { dispatch }) => {
    const {status,data} = await AwarenessService.createReviewResponse(
      createBoxReviewResponseData
    );
    dispatch(getAwarenessByBoxId(createBoxReviewResponseData?.build_id));
    return { status, data };
  }
)

export const getReviewResponseByAwarenessId = createAsyncThunk(
  `reviewResponse/`,
  async (review_id: number) => {
    const { status, data } = await AwarenessService.getReviewsResponseByAwareness(
      review_id
    );
    return { status, rows: data };
  }
);

export const updateBoxReviewResponseByAwarenessId = createAsyncThunk(
  `reviewResponse/update/`,
  async (updateBoxReviewResponse: IUpdateBoxReviewsResponse, { dispatch }) => {
    const id = Number(updateBoxReviewResponse.id);
    const editData = {
      is_accepted : updateBoxReviewResponse.is_accepted
      
    };
    const { status, data } = await AwarenessService.updateBoxReviewResponseByAwarenessId(
      id,
      editData
    );
    dispatch(getAwarenessByBoxId(updateBoxReviewResponse?.build_id));
    return { status, data };
  }
);

interface State {
  id: number;
  awareness: IBoxReviews;
  loading: boolean;
  error: string | undefined;
  awarenessList: IBuildReviewRowsCountResponse | any;
  reviewResponseData : IBoxReviewsResponse;
  reviewResponseList : IReviewResponseRowsCountResponse;
  updateReviewResponse : IReviewResponseRowsCountResponse;
}

const initialState: State = {
  awareness: {
    review_type: "Inspiration",
    comment: "",
    box_id: 0,
  },
  awarenessList: {
    status: true,
    rows: [],
  },
  updateReviewResponse:{
    status:true,
    rows:[],
  },
  reviewResponseData:{},
  reviewResponseList:{
    status:true,
    rows:[]
  },
  loading: false,
  error: undefined,
  id: 0,
};

const isPendingAction = (action: AnyAction): action is PendingAction =>
  action.type.startsWith(awarenessSlice.name) &&
  action.type.endsWith("/pending");
const isRejectedAction = (action: AnyAction): action is RejectedAction =>
  action.type.startsWith(awarenessSlice.name) &&
  action.type.endsWith("/rejected");

const awarenessSlice = createSlice({
  name: "awareness",
  initialState,
  reducers: {
    updateAwarenessData: (state: State, action: PayloadAction<IBoxReviews>) => {
      return { ...state, awarenessData: action.payload };
    },
    awareness: (state: State, action: PayloadAction<IBoxReviews>) => {
      return { ...state, awareness: action.payload };
    },
    awarenessData: (state: State, action: PayloadAction<IBoxReviews>) => {
      return { ...state, awarenessData: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAwareness.fulfilled, (state, action) => {
        if (action.payload.data.status) {
          toast.success(action.payload.data.message);
          return {
            ...state,
            loading: false,
            awarenessData: action.payload.data,
          };
        } else {
          toast.error(action.payload.data.error.message);
          return {
            ...state,
            loading: false,
            awarenessData: initialState.awareness,
          };
        }
      })
      .addCase(getAwarenessByBoxId.fulfilled, (state, action) => {
        if (action.payload.status) {
          // toast.success(action.payload.data.message);
          // Router.back();
          return {
            ...state,
            loading: false,
            awarenessList: action.payload.rows,
          };
        } else {
          // toast.error(action.payload.data.error.message);
          return {
            ...state,
            loading: false,
            awarenessList: initialState.awarenessList,
          };
        }
      })

      .addCase(addReviewResponse.fulfilled, (state, action) => {
        if (action.payload.data.status) {
          toast.success(action.payload.data.message);
          return {
            ...state,
            loading: false,
            reviewResponseData: action.payload.data,
          };
        } else {
          toast.error(action.payload.data.error.message);
          return {
            ...state,
            loading: false,
            reviewResponseData: initialState.reviewResponseData,
          };
        }
      })

      .addCase(getReviewResponseByAwarenessId.fulfilled, (state, action) => {

        if (action.payload.status) {
          // toast.success(action.payload.data.message);
          // Router.back();
          return {
            ...state,
            loading: false,
            reviewResponseList: action.payload.rows,
          };
        } else {
          // toast.error(action.payload.data.error.message);
          return {
            ...state,
            loading: false,
            reviewResponseList: initialState.reviewResponseList,
          };
        }
      })
      .addCase(updateBoxReviewResponseByAwarenessId.fulfilled, (state, action) => {
        if (action.payload.status) {
          toast.success(action.payload.data.message);
          return {
            ...state,
            loading: false,
            updateReviewResponse: action.payload,
          };
        } else {
          return {
            ...state,
            loading: false,
            updateReviewResponse: action.payload.data.updateReviewResponse,
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

export const awarenessReducer = awarenessSlice.reducer;
export const awarenessSelector = (state: RootState) => state.boxReviews;
export const { awarenessData, awareness } = awarenessSlice.actions;
