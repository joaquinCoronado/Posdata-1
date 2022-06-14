export interface LoginResponse {
  accessToken: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  name: string;
  id: string;
  email: string;
  jti: string;
}
