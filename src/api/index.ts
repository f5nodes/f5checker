import axios from 'axios';

export interface SuccessResponse<T> {
  data: T
  isOk: true
}

interface ErrorResponse {
  errorMessage: string,
  isOk: false
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse 

export const post = async <T>(url: string, body: Record<string, unknown>): Promise<ApiResponse<T>> => {
  try {
    const {data} = await axios.post(url, body);
    return {
      data, isOk: true
    }
  } catch (e: any) {
    return {
      errorMessage: e.message,
      isOk: false,
    }
  }
}
