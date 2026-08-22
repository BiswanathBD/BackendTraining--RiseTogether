export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  age?: number | undefined;
  countryId?: string | undefined;
}

export interface ILogin {
  email: string;
  password: string;
}
