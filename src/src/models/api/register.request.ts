export interface RegisterRequest {
  email: string;
  password: {
    first: string;
    second: string;
  };
}
