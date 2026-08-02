export interface ChangePasswordTokenRequest {
  token: string;
  newPassword: {
    first: string;
    second: string;
  };
}
