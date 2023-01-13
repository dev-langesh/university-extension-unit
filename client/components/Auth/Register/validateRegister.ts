import { RegisterStateType } from "../types/index";

type validateType = { state: RegisterStateType; setError: any };

export function validateRegister({ state, setError }: validateType) {
  if (
    !state.confirmPassword ||
    !state.email ||
    !state.password ||
    !state.phone ||
    !state.username
  ) {
    console.log("exe");
    setError({
      open: true,
      msg: "Fill All The Fields",
    });
  } else if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state.email)
  ) {
    setError({ open: true, msg: "Invalid Email" });
  } else if (state.password.length < 8) {
    setError({ open: true, msg: "Password length is too low" });
  } else if (state.password !== state.confirmPassword) {
    console.log("e");
    setError({ open: true, msg: "Password doesn't match" });
  }
}
