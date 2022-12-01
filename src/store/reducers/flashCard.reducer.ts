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
import { IFlashCardRowsCountResponse } from "../../../@types/responses";
import { ICreateFlashCard, IFlashCard } from "../../../@types/common";
import flashCardService from "../../service/flashCard.service";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;

export const addFlashCard = createAsyncThunk(
  `flashcard/add`,
  async (createFlashCardData: IFlashCard, { dispatch }) => {
    const { status, data } = await flashCardService.addFlashCard(
      createFlashCardData
    );

    // dispatch(getFlashCard({ page: 1, pageSize: 30, searchStr: '' }));
    return { status, data };
  }
);

export const getFlashCardByBuildId = createAsyncThunk(
  `flashcard/flashCardByBuild`,
  async (buildId: number) => {
    const { status, data } = await flashCardService.getFlashCardByBuildId(
      buildId
    );
    return { status: data.status, rows: data };
  }
);

export const getFlashCardByUser = createAsyncThunk(
  `get/flashcard`,
  async (): Promise<IFlashCardRowsCountResponse> => {
    const { status, data } = await flashCardService.getFlashCardByUser();
    return { status: data.status, rows: data.data };
  }
);

interface State {
  id: number;
  flashCard: IFlashCard;
  loading: boolean;
  error: string | undefined;
  flashCardList: IFlashCardRowsCountResponse;
  flashCardUserList: IFlashCardRowsCountResponse;
  flashBuild:IFlashCard
}

const initialState: State = {
  flashCard: {
    question: "",
    answer: "",
  },
  flashCardList: {
    status: true,
    rows: [],
  },
  flashCardUserList: { status: true, rows: [] },
  flashBuild :{
    question: "",
    answer: "",
  },
  loading: false,
  error: undefined,
  id: 0,
};

const isPendingAction = (action: AnyAction): action is PendingAction =>
  action.type.startsWith(flashCardSlice.name) &&
  action.type.endsWith("/pending");
const isRejectedAction = (action: AnyAction): action is RejectedAction =>
  action.type.startsWith(flashCardSlice.name) &&
  action.type.endsWith("/rejected");

const flashCardSlice = createSlice({
  name: "flashCard",
  initialState,
  reducers: {
    updateFlashCardData: (state: State, action: PayloadAction<IFlashCard>) => {
      return { ...state, flashCardData: action.payload };
    },
    flashCardData: (state: State, action: PayloadAction<IFlashCard>) => {
      return { ...state, flashCardData: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFlashCard.fulfilled, (state, action) => {
        if (action.payload.data.status) {
          toast.success(action.payload.data.message);
          return {
            ...state,
            loading: false,
            flashCardData: action.payload.data,
          };
        } else {
          toast.error(action.payload.data.error.message);
          return {
            ...state,
            loading: false,
            flashCardData: initialState.flashCard,
          };
        }
      })
      .addCase(getFlashCardByUser.fulfilled, (state, action) => {
        if (action.payload.status) {
          return {
            ...state,
            loading: false,
            flashCardUserList: action.payload.rows,
          };
        } else {
          return {
            ...state,
            loading: false,
            flashCardUserList: initialState.flashCardUserList,
          };
        }
      })
      .addCase(getFlashCardByBuildId.fulfilled, (state, action) => {
        if (action.payload.status) {
          return {
            ...state,
            loading: false,
            flashCardList: action.payload,
          };
        } else {
          return {
            ...state,
            loading: false,
            flashCardList: action.payload,
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

export const flashCardReducer = flashCardSlice.reducer;
export const flashCardSelector = (state: RootState) => state.flashCards;
export const { updateFlashCardData, flashCardData } = flashCardSlice.actions;
