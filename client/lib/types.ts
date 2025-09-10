// Database type definitions

export interface Post {
  id: string;
  blocks: Block[];
  category: string;
  date: string;
  summary: string;
  title: string;
}

export interface User {
  id: string;
  account_locked: boolean;
  date_of_birth: string;
  enabled: boolean;
  created_date: string;
  last_modified_date: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export type Block =
  | { type: "paragraph"; content: string }
  | { type: "heading"; content: string }
  | { type: "image"; url: string; alt?: string }
  | { type: "code"; code: string; language?: string }
  | { type: "quote"; content: string };

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

// Request types
export interface CreatePostRequest {
  title: string;
  summary: string;
  blocks: Block[];
  category: string;
  date: string;
}

export interface UpdatePostRequest extends CreatePostRequest {
  id: string;
}

export interface CreateUserRequest {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  date_of_birth: string;
}

export interface UpdateUserRequest extends CreateUserRequest {
  id: string;
}

// Auth
export interface RegistrationRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
