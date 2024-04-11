import { SignIn } from "@clerk/clerk-react";
import { dark, neobrutalism, shadesOfPurple } from "@clerk/themes";
import React from "react";

const SignInPage = () => {

  return (
    <>
      <div className=" bg-slate-950 flex items-center justify-center w-full h-[92vh]">
        <SignIn
          appearance={{
            baseTheme: dark
          }}
          path="/sign-in" 
          routing="path"
          signUpUrl="/sign-up"
        />
      </div>

    </>
  );
}

export default SignInPage;