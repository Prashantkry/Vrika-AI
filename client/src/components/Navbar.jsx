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
        <nav className="xl:flex items-center justify-between w-full h-full sm:hidden lg:hidden md:hidden">
          <div className="flex items-center justify-center border-0 ">
            <img
              src={w5}
              alt=""
              className=" w-[70px] h-[70px] p-2 rounded-full"
            />
          </div>
          <div className="flex justify-around border-0 w-[30vw] items-center">
            <Link to="/" className="text-red-500">
              Home
            </Link>
            <Link to="/about" className="text-red-500">
              About Us
            </Link>

            <Link to="/generateImage" className="text-red-500">
              Generate Image
            </Link>

            <Link to="/contact" className="text-red-500">
              Contact
            </Link>

            <SignedOut>
              <Link to="/signIn" className="text-red-500">
                {/* <SignInButton /> */}
                Sign In
              </Link>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
