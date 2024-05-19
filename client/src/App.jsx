import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import About from "./pages/About";
import SignUpPage from "./pages/SignUp";
import Contact from "./pages/Contact";
import SignInPage from "./pages/SignInPage";
import { Plans } from "./components/Plans";
import ImageGeneration from "./pages/ImageGeneration";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/Plans" element={<Plans />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/Image3DImage" element={<ImageGeneration />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}
