export interface JSONResponse {
  status: number;
  statusText: string;
  json(): object;
}
