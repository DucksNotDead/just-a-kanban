export interface ISliceCreateRequest {
  name: string;
  color: string;
}

export interface ISlice extends ISliceCreateRequest {
  id: number;
}

export interface ISliceContext {
  slices: ISlice[];
  slicesPending: boolean;
  createSlice: (dto: ISliceCreateRequest) => Promise<void | null> | undefined;
  deleteSlice: (id: number) => Promise<void | null>;
}
