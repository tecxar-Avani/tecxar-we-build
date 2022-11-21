import { RootState } from "../index";
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  AsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";
import videoCardService from "../../service/videoCard.service";
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;

export const getVideoCard = createAsyncThunk(`videocard/get`, async () => {
  const { data } = await videoCardService.VideoCardList();
  return { status: data.status, data: data.items };
});

interface State {
  id: number;
  loading: boolean;
  error: string | undefined;
  videoCardList: any;
}

const initialState: State = {
  videoCardList: {},
  loading: false,
  error: undefined,
  id: 0,
};

const isPendingAction = (action: AnyAction): action is PendingAction =>
  action.type.startsWith(videoCardSlice.name) &&
  action.type.endsWith("/pending");
const isRejectedAction = (action: AnyAction): action is RejectedAction =>
  action.type.startsWith(videoCardSlice.name) &&
  action.type.endsWith("/rejected");

const videoCardSlice = createSlice({
  name: "videoCard",
  initialState,
  reducers: {
    videoCard: (state: State, action: PayloadAction<any>) => {
      return { ...state, videoCard: action.payload };
    },
    videoCardData: (state: State, action: PayloadAction<any>) => {
      return { ...state, videoCardData: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVideoCard.fulfilled, (state, action) => {
        if (action.payload.status) {
          return {
            ...state,
            loading: false,
            videoCard: action.payload,
          };
        } else {
          return {
            ...state,
            loading: false,
            videoCard: action.payload,
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

export const videoCardReducer = videoCardSlice.reducer;
export const videoCardSelector = (state: RootState) => state.VideoCards;
export const { videoCardData, videoCard } = videoCardSlice.actions;
