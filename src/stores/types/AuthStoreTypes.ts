import { AuthStatus, RegisterStatus, RefreshStatus } from '../enums/AuthStatuses'

export interface ILoginRequest {
  login: string;
  password: string;
}

export interface ILoginResponse {
  response: AuthStatus.SUCCESS | AuthStatus.BAD_LOGIN_OR_PASSWORD;
  access_token?: string;
  refresh_token?: string;
}

export interface IRegisterRequest {
  login: string;
  password: string;
  email: string;
}

export interface IRegisterResponse {
  response: RegisterStatus;
  access_token?: string;
  refresh_token?: string;
}

export interface IRefreshRequest {
  refresh_token: string;
}

export interface IRefreshResponse {
  status: RefreshStatus;
  access_token?: string;
  refresh_token?: string;
}

export interface IUser {
  id: string;
  name: string;
}

export interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  showAuthModal: boolean;
  showForgotPasswordModal: boolean;
}