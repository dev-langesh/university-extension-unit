export type inputType = {
  name: string;
  placeholder: string;
  type?: "password" | "email" | "number" | "text";
};

export type errorType = {
  open: boolean;
  msg?: string;
};

export type RegisterStateType = {
  username: string;
  phone: number;
  email: string;
  password: string;
  confirmPassword: string;
  userType: "student" | "administerator";
};
