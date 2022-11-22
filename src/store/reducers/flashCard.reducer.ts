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

export const getFlashCard = createAsyncThunk(
  `flashcard/get`,
  async (getFlashCardData: IFlashCard, { dispatch }) => {
    const { data } = await flashCardService.FlashCardList(getFlashCardData);
    //dispatch(getFlashCard({ page: 1, pageSize: 30, searchStr: '' }));
    return { status: data.status, rows: data };
  }
);

interface State {
  id: number;
  flashCard: IFlashCard;
  loading: boolean;
  error: string | undefined;
  flashCardList: IFlashCardRowsCountResponse;
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
    flashCard: (state: State, action: PayloadAction<IFlashCard>) => {
      return { ...state, flashCard: action.payload };
    },
    flashCardData: (state: State, action: PayloadAction<IFlashCard>) => {
      return { ...state, flashCardData: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFlashCard.fulfilled, (state, action) => {
        if (action.payload.data.status === true) {
          Router.push("/build");
          toast.success(action.payload.data.message);
          return { ...state, loading: false };
        } else {
          return { ...state, loading: false };
        }
      })
      .addCase(getFlashCard.fulfilled, (state, action) => {
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
export const { updateFlashCardData, flashCardData, flashCard } =
  flashCardSlice.actions;
