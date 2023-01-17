import { inputType, RegisterStateType } from "../types/index";

export const inputs: inputType[] = [
  {
    name: "username",
    placeholder: "Nombre de usuario",
  },
  {
    name: "phone",
    placeholder: "Teléfono",
  },
  {
    name: "email",
    placeholder: "Email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Contraseña",
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirmar contraseña",
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
