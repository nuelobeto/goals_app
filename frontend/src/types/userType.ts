export type UserSavedType = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
};

export type UserRegisterType = {
  name: string;
  email: string;
  password: string;
};

export type UserLoginType = {
  email: string;
  password: string;
};
