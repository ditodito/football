export interface SignIn {
  email: string;
  password: string;
}

export type SignUp = SignIn & { repeatePassword?: string };
