import { HttpMethod } from './enums';

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

export interface RequestData {
  timestamp: number;
  api_url: string;
  redirect_url: string;
  method: HttpMethod;
  headers?: Header[];
  body?: string;
}

export interface DateGroup {
  date: string;
  requests: RequestData[];
  isExpanded: boolean;
}
