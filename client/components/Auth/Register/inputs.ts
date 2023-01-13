import { inputType, RegisterStateType } from "../types/index";

export const inputs: inputType[] = [
  {
    name: "username",
    placeholder: "User Name",
  },
  {
    name: "phone",
    placeholder: "Phone",
  },
  {
    name: "email",
    placeholder: "Email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
  },
];

export const initialRegisterState: RegisterStateType = {
  username: "",
  phone: 0,
  email: "",
  password: "",
  userType: "student",
  confirmPassword: "",
};
