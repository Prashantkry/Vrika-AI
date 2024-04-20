import React, { useEffect, useState } from "react";
import w2, { down, right, w1, w3, w4, w5 } from "../components/Image";
import { Link } from "react-router-dom";

const GenerateImage = () => {
  function handleImage(imageType) {
    console.log(imageType);
    if (imageType === "TextImg") {
      window.location.href = "/textImage";
    } else if (imageType === "Image3D") {
      window.location.href = "/Image3DImage";
    }
  }
  return (
    <>
      <main>
        <div className="relative border-0 flex items-center justify-around h-[92vh] p-16 w-full bg-slate-950">
          <button
            onClick={() => handleImage("TextImg")}
            className=" text-gray-300 border m-5 rounded-md flex items-center justify-center align-middle border-gray-800 w-[40vw] h-[50vh]"
          >
            Text to Image
          </button>
          <button
            onClick={() => handleImage("TextImg")}
            className=" text-gray-300 border m-5 rounded-md flex items-center justify-center align-middle border-gray-800 w-[40vw] h-[50vh]"
          >
            Image or 3-D to Image
          </button>
        </div>
      </main>
    </>
  );
};

export default GenerateImage;
