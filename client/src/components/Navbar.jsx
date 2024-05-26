import { Link, NavLink } from "react-router-dom";
import w5 from "./Image";
import { useDispatch, useSelector } from "react-redux";
import { setSignedIn } from "../Redux/SignIn";
import { useState } from "react";
import { useCookies } from "react-cookie";

let loginStatus;
const Navbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['refreshJWTToken', 'accessToken']);

  const dispatch = useDispatch();
  loginStatus = useSelector((state) => state.Login.SignedIn);

  async function handleLogout() {
    dispatch(setSignedIn(false));
    removeCookie('refreshJWTToken')
    removeCookie('accessToken')
    window.location.href = "/signIn";
  }

  return (
    <>
      <section className="w-full h-[8vh] px-10">
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
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-indigo-500 border-b-2 border-indigo-500" : "text-white"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/Image3DImage"
              className={({ isActive }) =>
                isActive ? "text-indigo-500 border-b-2 border-indigo-500" : "text-white"
              }
            >
              Generate Image
            </NavLink>

            <NavLink
              to="/Plans"
              className={({ isActive }) =>
                isActive ? "text-indigo-500 border-b-2 border-indigo-500" : "text-white"
              }
            >
              Price
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-indigo-500 border-b-2 border-indigo-500" : "text-white"
              }
            >
              About Us
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-indigo-500 border-b-2 border-indigo-500" : "text-white"
              }
            >
              Contact
            </NavLink>

            {loginStatus ? (
              <button
                className="text-white"
                onClick={handleLogout}
              >
                Log Out
              </button>
            ) : (
              <NavLink
                to="/signIn"
                className={({ isActive }) =>
                  isActive ? "text-indigo-500 border-b-2 border-indigo-500" : "text-white"
                }
              >
                Sign In
              </NavLink>
            )}
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
