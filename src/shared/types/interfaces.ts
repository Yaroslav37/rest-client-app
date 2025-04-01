export interface Header {
  key: string;
  value: string;
}

export interface ResponseData {
  status?: number;
  data?: unknown;
  error?: string;
  headers?: Record<string, string>;
  time?: number;
}

export interface ApiResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: unknown;
}

export type EditingLanguage = 'json' | 'text';
