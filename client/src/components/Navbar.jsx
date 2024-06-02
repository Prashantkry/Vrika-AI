import { Link, NavLink } from "react-router-dom";
import w5 from "./Image";
import { useDispatch, useSelector } from "react-redux";
import { setSignedIn } from "../Redux/SignIn";
import { useState } from "react";
import { useCookies } from "react-cookie";
import './navBar.css'


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

  const [showHamburger, setShowHamburger] = useState("slide-left")
  const handleHamBurger = () => {
    if (showHamburger === "slide-right") {
      setShowHamburger("slide-left")
    }
    else {
      setShowHamburger("slide-right")
    }
  }

  return (
    <>
      <div className="flex flex-wrap place-items-center xl:static md:static sticky top-0 z-20">
        <section className="relative mx-auto">
          <nav className="flex justify-between  bg-purple-950 text-[#ffffff] w-screen">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
              <Link to="/" className="text-3xl font-bold rounded-full font-heading"><img src={w5} alt="logo" className="h-9 rounded" /></Link>
              <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                <li><NavLink to={"/"} className={({ isActive, isPending }) => isPending ? "" : isActive ? "text-indigo-400 border-b-2 border-indigo-600" : ""}>Home</NavLink></li>
                <li><NavLink to={"/Image3DImage"} className={({ isActive, isPending }) => isPending ? "" : isActive ? "text-indigo-400 border-b-2 border-indigo-600" : ""}>Generate Image</NavLink></li>
                <li><NavLink to={"/Plans"} className={({ isActive, isPending }) => isPending ? "" : isActive ? "text-indigo-400 border-b-2 border-indigo-600" : ""}>Price</NavLink></li>
                <li><NavLink to={"/about"} className={({ isActive, isPending }) => isPending ? "" : isActive ? "text-indigo-400 border-b-2 border-indigo-600" : ""}>About Us</NavLink></li>
                <li><NavLink to={"/contact"} className={({ isActive, isPending }) => isPending ? "" : isActive ? "text-indigo-400 border-b-2 border-indigo-600" : ""}>Contact Us</NavLink></li>
                <li>
                  {loginStatus ? (
                    <button
                      className="text-white"
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                  ) : (
                    <NavLink to={"/signIn"} className={({ isActive, isPending }) => isPending ? "" : isActive ? "text-indigo-400 border-b-2 border-indigo-600" : ""}>Sign In</NavLink>
                  )}
                </li>
              </ul>
            </div>
            <div className="navbar-burger self-center mr-12 xl:hidden md:hidden" onClick={() => { handleHamBurger() }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
          </nav>
          {<div className={`xl:hiddn md:hidden block fixed top-0 left-0 z-20 w-64 h-full transition-all duration-500 transform  bg-purple-950 text-[#ffffff] shadow-lg ${showHamburger}`}>
            <div className=" py-4 flex flex-col h-full justify-between">
              <ul className="  flex flex-col px-6 mx-auto font-semibold font-heading space-x-12 gap-5 justify-start w-full">
                <li className='!m-0'><NavLink to={"/"} className={({ isActive, isPending }) => isPending ? "" : isActive ? "text-indigo-400 border-b-2 border-indigo-600" : ""}>Home</NavLink></li>
                <li className='!m-0'><NavLink to={"/Image3DImage"} className={({ isActive, isPending }) => isPending ? "" : isActive ? "text-indigo-400 border-b-2 border-indigo-600" : ""}>Generate Image</NavLink></li>
                <li className='!m-0'><NavLink to={"/Plans"} className={({ isActive, isPending }) => isPending ? "" : isActive ? "text-indigo-400 border-b-2 border-indigo-600" : ""}>Price</NavLink></li>
                <li className='!m-0'><NavLink to={"/about"} className={({ isActive, isPending }) => isPending ? "" : isActive ? "text-indigo-400 border-b-2 border-indigo-600" : ""}>About Us</NavLink></li>
                <li className='!m-0'><NavLink to={"/contact"} className={({ isActive, isPending }) => isPending ? "" : isActive ? "text-indigo-400 border-b-2 border-indigo-600" : ""}>Contact Us</NavLink></li>
              </ul>
            </div>
          </div>}
        </section>
      </div>

    </>
  );
};

export default Navbar;





