import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GenerateImage from "./pages/GenerateImage";
import Layout from "./Layout";
import About from "./pages/About";
import SignInPage from "./pages/sign-in/[[...index]]";
import SignUpPage from "./pages/SignUp";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/generateImage" element={<GenerateImage />} />
        </Route>
      </Routes>
    </>
  );
}
