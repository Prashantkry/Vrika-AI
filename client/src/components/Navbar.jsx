import React from "react";
import { Link } from "react-router-dom";
import w2, { w1, w3, w4, w5 } from "./Image";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignIn,
} from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

const Navbar = () => {
  return (
    <>
      <section className="w-full h-[8vh]">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(85%_65%_at_30%_10%,#60e_20%,#211c49_50%)]"></div>
        <nav className="flex items-center justify-between w-full h-full px-10">
          <div className="flex items-center justify-center border-0 space-x-2">
            <img
              src={w5}
              alt=""
              className=" w-[70px] h-[70px] p-2 rounded-full"
            />
            {/* <h1 className="text-2xl font-bold text-gray-900 tracking-wide">VrikaAI</h1> */}
          </div>
          <div className="flex items-center space-x-10">
            <Link to="/" className="text-red-500">
              Home
            </Link>
            <Link to="/about" className="text-red-500">
              About Us
            </Link>

            {/* {SignedIn ? (
              <SignedIn>
                <UserButton />
              </SignedIn>
            ) : (
              <p>k</p>
            )}
              <Link to="/sign-in" className="text-red-500">
                <SignInButton/>
              </Link> */}

            <Link to="/generateImage" className="text-red-500">
              Generate Image
            </Link>

            <SignedOut>
              <Link to="/sign-in" className="text-red-500">
                {/* <SignInButton /> */}
                Sign In
              </Link>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>

            {/* <div className=" text-red-500"> */}
            {/* <SignedOut
                appearance={{
                  baseTheme: dark,
                }}
              >
                <SignInButton />
              </SignedOut>

              <SignedIn
                appearance={{
                  baseTheme: dark,
                }}
                path="/sign-in"
                routing="path"
                signUpUrl="/sign-up"
              >
                <UserButton />
              </SignedIn> */}

            {/* <SignIn
                appearance={{
                  baseTheme: dark,
                }}
              >
                <SignInButton />
              </SignIn> */}

            {/* <SignInButton>
              </SignInButton> */}
            {/* </div> */}
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
