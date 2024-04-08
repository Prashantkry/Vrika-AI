import React from "react";
import { Link } from "react-router-dom";
import w2, { w1, w3, w4, w5 } from "./Image";

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
            <Link to="/" className="text-red-500">
              About Us
            </Link>
            <Link to="/" className="text-red-500">
              Log In
            </Link>
            <Link to="/generateImage" className="text-red-500">
              Generate Image
            </Link>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
