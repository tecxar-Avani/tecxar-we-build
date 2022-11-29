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
import { IBuildReviewRowsCountResponse } from "../../../@types/responses";
import { IBoxReviews, ICreateFlashCard, IFlashCard } from "../../../@types/common";
import AwarenessService from "../../service/awareness.service";
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;

export const addAwareness = createAsyncThunk(
  `reviews/add`,
  async (createAwarenessData: IBoxReviews, { dispatch }) => {
    console.log("CCCCCCCCCCCCCCCCCCCCCC",createAwarenessData)
    const { status, data } = await AwarenessService.addAwareness(
        createAwarenessData
    );
    
    // dispatch(getFlashCard({ page: 1, pageSize: 30, searchStr: '' }));
    return { status, data };
   
  }
);

// export const getFlashCardByBuildId = createAsyncThunk(`flashcard/flashcardbybuild`, async (buildId:number) => {
//   const { status, data } = await flashCardService.getFlashCardByBuildId(buildId);
//   // dispatch(getFlashCard({ page: 1, pageSize: 30, searchStr: '' }));
 
//   return { status: data.status, rows: data };
// });

interface State {
  id: number;
  awareness: IBoxReviews;
  loading: boolean;
  error: string | undefined;
  awarenessList: IBuildReviewRowsCountResponse;
}

const initialState: State = {
    awareness: {
      review_type: "inspiration" ,
    comment: "",
    box_id:0
  },
  awarenessList: {
    status: true,
    rows: [],
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
          return { ...state, loading: false,awarenessData: action.payload.data  };
        } else {
          toast.error(action.payload.data.error.message);
          return { ...state, loading: false,awarenessData: initialState.awareness };
        }
      })
      // .addCase(addAnnouncement.fulfilled, (state, action) => {
      //   if (action.payload.data.status) {
      //     toast.success(action.payload.data.message);
      //     Router.back();
      //     return { ...state, loading: false, announcementData: action.payload.data };
      //   } else {
      //     toast.error(action.payload.data.error.message);
      //     return { ...state, loading: false, announcementData: initialState.announcementData };
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

export const awarenessReducer = awarenessSlice.reducer;
export const awarenessSelector = (state: RootState) => state.boxReviews;
export const { awarenessData, awareness } =
awarenessSlice.actions;
