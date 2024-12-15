export interface IUserEntity {}

export interface IUserDataLoginResponse {
  token: string;
  user_id: string;
}

export interface IUserDataLogin {
  email: string;
  senha: string;
}
