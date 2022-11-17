import { IVideoBuild } from "@types/common";

interface IResponseBase {
  redirect?: string;
  status: boolean;
}
interface ISuccessResponseData<T> extends IResponseBase {
  message?: string;
  data: T;
}

interface ISuccessPaginatedData<T> extends IResponseBase {
  count: number;
  rows: T;
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


interface IBuildRowsCountResponse
  extends ISuccessPaginatedData<IVideoBuild[]> {}
