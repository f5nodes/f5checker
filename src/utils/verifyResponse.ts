import { ApiResponse, SuccessResponse } from '../api';
import { internalServerError } from '../errors';

export function verifyResponse<T>(response: ApiResponse<T>): asserts response is SuccessResponse<T> {
  if (!response.isOk) {
    throw internalServerError(response.errorMessage);
  }
}
