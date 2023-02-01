import { RootState } from "../index";
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  AsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IFlashCardRowsCountResponse } from "../../../@types/responses";
import {
  IFlashCard,
  IFlashCardsResponse,
  IUpdateFlashCards,
} from "../../../@types/common";
import flashCardService from "../../service/flashCard.service";
import { totalbuilds } from "./user.reducer";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;

export const createFlashCard = createAsyncThunk(
  `flashcard/add`,
  async (createFlashCardData: IFlashCard, { dispatch }) => {
    const { status, data } = await flashCardService.addFlashCard(
      createFlashCardData
    );
    if (createFlashCardData.build_id) {
      dispatch(getFlashCardByBuildId(createFlashCardData.build_id));
    }

    return { status, data };
  }
);

export const createFlashCardResponse = createAsyncThunk(
  `flashcard/flashcardresponse`,
  async (createFlashCardResponseData: IFlashCardsResponse, { dispatch }) => {
    const { status, data } = await flashCardService.addFlashcardresponse(
      createFlashCardResponseData
    );
    if (createFlashCardResponseData.build_id) {
      dispatch(getFlashCardByBuildId(createFlashCardResponseData.build_id));
    }
    dispatch(getFlashCardByUser());
    return { status, data };
  }
);

export const addUserFlashCardDeck = createAsyncThunk(
  `flashcard/deck`,
 async (addFlashCardDeckData:IFlashCard[], { dispatch })  => {
  const { status, data } = await flashCardService.addFlashCardDeck(
    addFlashCardDeckData
  );
  dispatch(getFlashCardDeck(addFlashCardDeckData[0]?.build_id))
  dispatch(getFlashCardByBuildId(addFlashCardDeckData[0]?.build_id))
  return { status, data };
 }
)

export const getFlashCardByBuildId = createAsyncThunk(
  `flashcard/flashCardByBuild`,
  async (buildId: any) => {
    const { data } = await flashCardService.getFlashCardByBuildId(buildId);
    return { status: data.status, rows: data };
  }
);

export const getFlashCardDeck = createAsyncThunk(
  `flashcard/flashcardDeck`,
  async (buildId:any) => {
    const {data} = await flashCardService.getFlashCardDeck(buildId);
    return { status: data.status, rows: data };
  }
)

export const getFlashCardByUser = createAsyncThunk(
  `get/flashcard`,
  async (): Promise<IFlashCardRowsCountResponse> => {
    const { data } = await flashCardService.getFlashCardByUser();
    return { status: data.status, rows: data.data };
  }
);
export const updateFlashCardId = createAsyncThunk(
  `flashcard/`,
  async (updateFlashCard: IUpdateFlashCards,{ dispatch }) => {
    const id = Number(updateFlashCard.id);
    const editData = {
      id: Number(updateFlashCard.id),
      question: updateFlashCard.question,
      answer: updateFlashCard.answer,
    };
    const { status, data } = await flashCardService.updateFlashCardById(
      id,
      editData
    );
    dispatch(getFlashCardByUser())
    return { status, data };
  }
);
export const deleteFlashCardById = createAsyncThunk(
  `flashcard/deleteFlashCard/`,
  async (Id: number, { dispatch }) => {
    const { status, data } = await flashCardService.deleteFlashCardById(Id);
    dispatch(getFlashCardByUser());
    dispatch(totalbuilds());
    return { status, data };
  }
);
// export const deleteFlashCardId = createAsyncThunk(`flashcard/deleteFlashCard/`, async (Id: number, { dispatch }) => {
//   const { status, data } = await flashCardService.deleteFlashCardById(Id);

//   return { status, data };
// });

interface State {
  id: number;
  flashCard: IFlashCard;
  loading: boolean;
  error: string | undefined;
  flashCardList: IFlashCardRowsCountResponse;
  flashCardUserList: IFlashCardRowsCountResponse;
  editFlashCard: IUpdateFlashCards;
  flashCardResponse: IFlashCardsResponse;
  flashCardDeck:IFlashCardRowsCountResponse;
}

const initialState: State = {
  flashCard: {
    question: "",
    answer: "",
  },
  flashCardResponse: {
    response_type: "good",
    flash_card_id: 0,
  },
  flashCardList: {
    status: true,
    rows: [],
  },
  flashCardUserList: { status: true, rows: [] },
  editFlashCard: {},
  loading: false,
  error: undefined,
  id: 0,
  flashCardDeck:{
    status: true,
    rows: [],
  }
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
      .addCase(createFlashCard.fulfilled, (state, action) => {
        if (action.payload.data.status) {
          toast.success("");
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
      .addCase(createFlashCardResponse.fulfilled, (state, action) => {
        if (action.payload.data.status) {
          toast.success("");
          return {
            ...state,
            loading: false,
            flashCardResponse: action.payload.data,
          };
        } else {
          toast.error(action.payload.data.error.message);
          return {
            ...state,
            loading: false,
            flashCardResponse: initialState.flashCardResponse,
          };
        }
      })
      .addCase(addUserFlashCardDeck.fulfilled, (state, action) => {
        if (action.payload.data.status) {
          toast.success("");
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
      .addCase(getFlashCardDeck.fulfilled, (state, action) => {
        if (action.payload.status) {
          return {
            ...state,
            loading: false,
            flashCardDeck: action.payload,
          };
        } else {
          return {
            ...state,
            loading: false,
            flashCardDeck: action.payload,
          };
        }
      })
      .addCase(updateFlashCardId.fulfilled, (state, action) => {
        if (action.payload.status) {
          toast.success("");
          return {
            ...state,
            loading: false,
            editFlashCard: action.payload,
          };
        } else {
          return {
            ...state,
            loading: false,
            editFlashCard: action.payload.data.editFlashCard,
          };
        }
      })
      .addCase(deleteFlashCardById.fulfilled, (state, action) => {
        toast.success("");
        if (action.payload.status) {
          return { ...state, loading: false };
        } else {
          return {
            ...state,
            loading: false,
            specificFlashcard: initialState.flashCard,
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
