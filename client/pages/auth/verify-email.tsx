import React, { useState } from "react";
import SendCode from "../../components/Auth/AccountVerification/SendCode";
import VerifyCode from "../../components/Auth/AccountVerification/VerifyCode";

type stateType = {
  verifyCodeStep: boolean;
};

export default function VerifyEmail() {
  const [state, setState] = useState<stateType>({
    verifyCodeStep: false,
  });

  function openVerifyStep() {
    setState({ verifyCodeStep: true });
  }

  return (
    <div>
      {state.verifyCodeStep ? (
        <VerifyCode />
      ) : (
        <SendCode openVerifyStep={openVerifyStep} />
      )}
    </div>
  );
}
