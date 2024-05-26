import React from "react";
import "../App.css";
import { video } from "./Image";

const Features = () => {
  return (
    <>
      <div className="mainBgF h-fit p-12">
        {/* heading and its sub heading */}
        <div>
          <p className=" text-indigo-900 text-5xl font-sans VrikaAI">
            Vrika AI Tools
          </p>
          <p className="text-indigo-300 VrikaAIText2 ml-2 mt-3 ">
            Vrika AI is a set of tools that help designers and architects to
            create better designs and make better decisions.
          </p>
        </div>

        {/* content and its dashboard */}
        <div className="contentFeatures flex items-center justify-around border-0 mt-10">
          {/* content */}
          <button className="VrikaAIText text-indigo-500 w-[20vw] flex flex-col items-start justify-start text-3xl font-normal font-sans my-[30vh] tracking-wide">
            Text to Image
            <p className="text-gray-300 text-xs ml-1">
              Generate images by writing prompts (+ve,-ve)
            </p>
          </button>
          {/* dashboard of tools representations */}
          <div className="h-fit p-2 text-gray-200 w-[60vw] border border-indigo-900 rounded-xl">    {/* put css videoC to control video size */}
            <video src={video} className="w-full h-full rounded" autoPlay
              controls
              loop
              muted
              playsInline
              preload="auto"></video>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
