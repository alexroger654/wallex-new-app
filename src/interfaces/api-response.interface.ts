import { IPaginationOptions } from "@/interfaces/pagination.interface";
import type { CustomError } from "@/types/customError.type";

export type IApiResponse<T = null> = {
  status: number;
  error: null | CustomError;
  message: string;
  data: T;
  meta?: IPaginationOptions & { totalResults: number };
};
