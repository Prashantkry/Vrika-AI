import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GenerateImage from "./pages/GenerateImage";
import Layout from "./Layout";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/generateImage" element={<GenerateImage />} />
        </Route>
      </Routes>
    </>
  );
}
