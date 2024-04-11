import React from "react";

import { SignUp } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

const SignUpPage = () => {
  return (
    <>
      <>
        <div className=" flex items-center justify-center bg-gray-950 w-full h-[92vh]">
          <SignUp
            appearance={{
              baseTheme: dark,
            }}
          />
        </div>
      </>
    </>
  );
};

export default SignUpPage;
