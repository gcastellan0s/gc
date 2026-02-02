export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  nextToken?: string;
  totalCount?: number;
}

export interface FileUploadResult {
  key: string;
  url: string;
  size: number;
  contentType: string;
}
