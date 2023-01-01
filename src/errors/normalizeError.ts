import { CustomError } from './customError';

export const normalizeError = (e: any): {message: string, status?: number} => {
  if (e instanceof CustomError) {
    return {
      message: e.message,
      status: e.status,
    }
  }
  return e
}
