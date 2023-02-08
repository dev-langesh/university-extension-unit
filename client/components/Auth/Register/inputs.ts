import {
  AdminRegisterStateType,
  inputType,
  RegisterStateType,
} from "../types/index";

export const inputs: inputType[] = [
  {
    name: "username",
    placeholder: "Nombre",
  },
  {
    name: "surname",
    placeholder: "Apellido",
  },
  {
    name: "student_id",
    placeholder: "cedula",
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
    name: "career",
    placeholder: "Carrera",
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

export const adminInputs: inputType[] = [
  {
    name: "username",
    placeholder: "Nombre",
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
  semister: "1° semestre",
  career: "",
  student_id: "",
  surname: "",
};

export const adminRegisterationData: AdminRegisterStateType = {
  username: "",
  phone: 0,
  email: "",
  password: "",
  userType: "admin",
  confirmPassword: "",
};
