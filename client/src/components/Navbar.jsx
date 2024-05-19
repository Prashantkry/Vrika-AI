import { Link } from "react-router-dom";
import w5 from "./Image";
import { useDispatch, useSelector } from "react-redux";
import { setSignedIn } from "../Redux/SignIn";
import { useState } from "react";

let loginStatus;
const Navbar = () => {
  const [activeLink, setActiveLink] = useState("/");

  const dispatch = useDispatch();
  loginStatus = useSelector((state) => state.Login.SignedIn);
  console.log("loginStatus -> ", loginStatus);
  function handleLogout() {
    console.log(loginStatus);
    dispatch(setSignedIn(false));
    console.log(loginStatus);
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
            <Link
              to="/"
              className={`tracking-wide ${
                activeLink === "/"
                  ? "text-indigo-500 border-b-2 border-indigo-500"
                  : "text-white"
              }`}
              onClick={() => setActiveLink("/")}
            >
              Home
            </Link>

            <Link
              to="/Image3DImage"
              className={`tracking-wide ${
                activeLink === "/Image3DImage"
                  ? "text-indigo-500 border-b-2 border-indigo-500"
                  : "text-white"
              }`}
              onClick={() => setActiveLink("/Image3DImage")}
            >
              Generate Image
            </Link>

            <Link
              to="/Plans"
              className={`tracking-wide ${
                activeLink === "/Plans"
                  ? "text-indigo-500 border-b-2 border-indigo-500"
                  : "text-white"
              }`}
              onClick={() => setActiveLink("/Plans")}
            >
              Price
            </Link>

            <Link
              to="/about"
              className={`tracking-wide ${
                activeLink === "/about"
                  ? "text-indigo-500 border-b-2 border-indigo-500"
                  : "text-white"
              }`}
              onClick={() => setActiveLink("/about")}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className={`tracking-wide ${
                activeLink === "/contact"
                  ? "text-indigo-500 border-b-2 border-indigo-500"
                  : "text-white"
              }`}
              onClick={() => setActiveLink("/contact")}
            >
              Contact
            </Link>

            {loginStatus ? (
              <button
                className={`tracking-wide ${
                  activeLink === "/signIn"
                    ? "text-indigo-500 border-b-2 border-indigo-500"
                    : "text-white"
                }`}
                onClick={handleLogout}
              >
                Log Out
              </button>
            ) : (
              <Link
                to="/signIn"
                className={`tracking-wide ${
                  activeLink === "/signIn"
                    ? "text-indigo-500 border-b-2 border-indigo-500"
                    : "text-white"
                }`}
                onClick={() => setActiveLink("/signIn")}
              >
                Sign In
              </Link>
            )}
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
