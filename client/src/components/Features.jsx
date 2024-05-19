import React from "react";

const Features = () => {
  return (
    <>
      <div className="mainBgF h-fit p-12">
        {/* heading and its sub heading */}
        <div>
          <p className=" text-indigo-900 text-5xl font-sans">Vrika AI Tools</p>
          <p className="text-indigo-300 ml-2 mt-3">
            Vrika AI is a set of tools that help designers and architects to
            create better designs and make better decisions.
          </p>
        </div>

        {/* content and its dashboard */}
        <div className="flex items-center justify-around border-0 mt-10">
          {/* content */}
          <button className="text-indigo-500 w-[20vw] flex flex-col items-start justify-start text-3xl font-normal font-sans my-[30vh] tracking-wide">
            Text to Image
            <p className="text-gray-300 text-xs ml-1">
              Generate images by writing prompts (+ve,-ve)
            </p>
          </button>
          {/* dashboard of tools representations */}
          <div className="h-[70vh] text-gray-200 w-[60vw] border border-gray-500 rounded-xl p-5">
            <div className="">ti</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
