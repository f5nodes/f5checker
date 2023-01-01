import { CustomError } from './customError';
import httpStatus from 'http-status';
import { ErrorCaptions } from './enums';

export const validationError = (message: string): CustomError => {
  const error = new CustomError(message);
  error.status = httpStatus.BAD_REQUEST;
  error.caption = ErrorCaptions.BAD_REQUEST
  return error
}

export const internalServerError = (message: string): CustomError => {
  const error = new CustomError(message);
  error.status = httpStatus.INTERNAL_SERVER_ERROR;
  error.caption = ErrorCaptions.INTERNAL_SERVER_ERROR;
  return error;
}
