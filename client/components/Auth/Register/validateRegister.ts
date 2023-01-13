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
      reject("Fill all the fields");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state.email)
    ) {
      reject("Invalid Email");
    } else if (state.password.length < 6) {
      reject("Password length is too low");
    } else if (state.password !== state.confirmPassword) {
      reject("Password doesn't match");
    } else {
      resolve("validation success");
    }
  });

  return promise;
}
