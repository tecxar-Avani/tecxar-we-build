import {
  IFlashCard,
  IVideoBuild,
  IBoxReviews,
  IBoxReviewsResponse,
  ICreateUser,
  IGroup,
} from "@types/common";

interface IResponseBase {
  redirect?: string;
  status: boolean;
}
interface ISuccessResponseData<T> extends IResponseBase {
  message?: string;
  data: T;
}

interface ISuccessPaginatedData<any> extends IResponseBase {
  rows: T;
  // box:T
}

interface ISuccessResponse extends IResponseBase {
  message?: string;
}

interface IFailedResponse extends IResponseBase {
  error: {
    title: string;
    message: string;
  };
}

interface IBuildRowsCountResponse extends ISuccessPaginatedData<IVideoBuild> {}

interface IBuildList {
  status: boolean;
  rows: IVideoBuild[];
  box: IVideoBuild[];
  data: IVideoBuild[];
}

interface IBuildListByURL extends IBuildList {
  allBuilds: IVideoBuild[];
  results: IVideoBuild[];
}

interface IFlashCardRowsCountResponse
  extends ISuccessPaginatedData<IFlashCard> {}
interface IBuildReviewRowsCountResponse
  extends ISuccessPaginatedData<IBoxReviews> {}

interface IReviewResponseRowsCountResponse
  extends ISuccessPaginatedData<IBoxReviewsResponse> {}

interface IUserResponseRowsCountResponse
  extends ISuccessPaginatedData<ICreateUser> {}

interface IGroupRowsCountResponse extends ISuccessPaginatedData<IGroupBoxes> {}
