import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GenerateImage from "./pages/GenerateImage";
import Layout from "./Layout";
import About from "./pages/About";
import SignUpPage from "./pages/SignUp";
import UserProject from "./components/UserProject";
import Contact from "./pages/Contact";
import TextImage from "./pages/TextImage";
import ThreeDModelImage from "./pages/ThreeDModelImage";
import SignInPage from "./pages/SignInPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/generateImage" element={<GenerateImage />} />
          <Route path="/textImage" element={<TextImage />} />
          <Route path="/Image3DImage" element={<ThreeDModelImage />} />
          <Route path="/project1User" element={<UserProject />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}
