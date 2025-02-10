import { ApiError } from "./ApiError.js";
import { ApiResponse } from "./apiRes.js";


export const globalErrorHandler = (error, req, res, next) => {
  if (!(error instanceof ApiError)) {
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          false,
          null,
          error._message ?? error.message ?? "Internal Server Error"
        )
      );
  }
  res
    .status(error.statusCode)
    .json(new ApiResponse(error.statusCode,error.success, error.data, error.message));
};
