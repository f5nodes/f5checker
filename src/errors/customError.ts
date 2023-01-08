import { ErrorCaptions } from './enums';

export class CustomError extends Error {
  timestamp: string;

  caption: ErrorCaptions | undefined;
  status: number | undefined;

  constructor(message: string) {
    super(message);

    Error.captureStackTrace(this, CustomError);

    this.timestamp = new Date().toISOString();
  }
}
