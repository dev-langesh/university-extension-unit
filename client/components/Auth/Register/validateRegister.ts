import { RegisterStateType } from "../types/index";

type validateType = { state: RegisterStateType };

export function validateRegister({ state }: validateType) {
  const promise = new Promise((resolve, reject) => {
    if (
      !state.confirmPassword ||
      !state.email ||
      !state.password ||
      !state.phone ||
      !state.username
    ) {
      reject("Rellena todos los campos");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state.email)
    ) {
      reject("Email inválido");
    } else if (state.password.length < 6) {
      reject("La longitud de la contraseña es demasiado baja");
    } else if (state.password !== state.confirmPassword) {
      reject("La contraseña no coincide");
    } else {
      resolve("éxito de la validación");
    }
  });

  return promise;
}
