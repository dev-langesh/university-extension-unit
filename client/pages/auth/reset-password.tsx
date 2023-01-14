import React, { useState } from "react";
import ResetPassword from "../../components/Auth/AccountVerification/ResetPassword";
import SendCode from "../../components/Auth/AccountVerification/SendCode";

type stateType = {
  verifyCodeStep: boolean;
};

export default function ResetPasswordPage() {
  const [state, setState] = useState<stateType>({
    verifyCodeStep: false,
  });

  function openVerifyStep() {
    setState({ verifyCodeStep: true });
  }

  return (
    <div>
      {state.verifyCodeStep ? (
        <ResetPassword />
      ) : (
        <SendCode openVerifyStep={openVerifyStep} />
      )}
    </div>
  );
}
