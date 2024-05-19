import React, { useState } from "react";
import {
  a1,
  a2,
  a3,
  a4,
  a5,
  a6,
  a7,
  a8,
  a9,
  a10,
  m1,
  m2,
  m3,
  m4,
  m5,
  p1,
  p2,
  p3,
  p4,
  p5,
  v1,
  v2,
  v3,
  v4,
  v5,
  s1,
  s2,
  s3,
  s4,
  s5,
} from "../components/Image";

const UseCases = () => {
  const [mall, setMall] = useState(true);
  const [villa, setVilla] = useState(false);
  const [park, setPark] = useState(false);
  const [school, setSchool] = useState(false);

  function handleUseCase(e) {
    document.querySelectorAll(".use-case-button").forEach((button) => {
      button.style.backgroundColor = "";
    });

    const color = document.getElementById(e);
    color.style.backgroundColor = "indigo";

    setMall(e === "mall");
    setVilla(e === "villa");
    setPark(e === "park");
    setSchool(e === "sch");
  }

  return (
    <>
      {/* use case start */}
      <div className="w-full h-[90vh] relative">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        <div className="mainBg h-[90vh] pt-10">
          <p className="text-5xl text-indigo-300 font-sans ml-8 tracking-widest text-center border-b-0 w-fit">
            Use Cases
          </p>
          <div className="w-full text-xl font-semibold text-gray-200 my-7 px-20">
            {/* all tab buttons  */}
            <div className="flex items-center justify-between">
              <button
                id="mall"
                className="use-case-button px-2 py-1 rounded-md tracking-wide font-sans"
                style={{ backgroundColor: "indigo" }}
                onClick={() => handleUseCase("mall")}
              >
                Malls
              </button>
              <button
                id="villa"
                className="use-case-button px-2 py-1 rounded-md tracking-wide font-sans"
                onClick={() => handleUseCase("villa")}
              >
                Villa
              </button>
              <button
                id="park"
                className="use-case-button px-2 py-1 rounded-md tracking-wide font-sans"
                onClick={() => handleUseCase("park")}
              >
                Park
              </button>
              <button
                id="sch"
                className="use-case-button px-2 py-1 rounded-md tracking-wide font-sans"
                onClick={() => handleUseCase("sch")}
              >
                School
              </button>
            </div>
            <div className="border-b border-gray-700 w-full mt-4" />
          </div>

          {/* mall */}
          {mall && (
            <div
              className="border-0 h-[60vh] m-auto mt-10 w-[90vw] relative flex justify-between items-center"
              id="mall"
            >
              <div className="border-0 border-green-400 h-[60vh] ml-4">
                <div className="">
                  <p className="text-6xl tracking-widest text-gray-400 Library">
                    Mall
                  </p>
                </div>
                <div className=" h-[48vh] w-[40vw] border-0 border-teal-950 p-4">
                  {/* <!-- <img src="aero.png" alt="" className="border-0 h-[10vh] w-[20vw] inline ml-[50%]" /> --> */}
                  <div className="flex w-[60vw] h-[25vh]">
                    {/* <!-- prompt start  --> */}
                    <div className="relative border-4 w-[18.7vw] h-full ml-0 mt-4 p-0 bg-gray-900 text-white border-gray-800 rounded-md">
                      <p className="abolute w-full bg-gray-950 pt-0 text-center text-lg tracking-widest">
                        Prompts
                      </p>
                      <p className="p-3 text-gray-400">
                        mall front ,mall outside ,front view, realistic,
                        cinematic lighting, photorealistic, hyper-realistic, 3d
                        rendering, render, 8k, 16k, extremely detailed, unreal
                        engine, octane, maya futuristic
                      </p>
                    </div>
                    {/* <!-- prompt end  --> */}

                    {/* <!-- Negative prompt start  --> */}
                    <div className="ml-1 relative border-4 w-[18.7vw] h-full mt-4 p-0 bg-gray-900 text-white border-gray-800 rounded-md">
                      <p className="abolute w-full bg-gray-950 pt-0 text-center text-lg tracking-widest">
                        Negative Prompts
                      </p>
                      <p className="p-3 text-gray-400">
                        blurry, distorted, unrealistic unrealistic, blurry,
                        distorted, low details, (cartoon), (game),
                        (painting), (sketch)
                      </p>
                    </div>
                    {/* <!-- Negative prompt end  --> */}
                  </div>
                  <div className="border-4 border-gray-800 rounded-md h-[25vh] w-fit mt-10">
                    <p className="text-center p-1 bg-gray-900 text-white tracking-widest">
                      Generated Image
                    </p>
                    <div className="grid w-full grid-cols-3">
                      <img
                        src={m2}
                        alt=""
                        className="border-0 object-contain w-full"
                      />
                      <img
                        src={m4}
                        alt=""
                        className="border-0 object-contain w-full"
                      />
                      <img
                        src={m5}
                        alt=""
                        className="border-0 object-contain w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- image of show case  --> */}
              <div className="relative border-0 h-[60vh] w-[44vw] p-10 pt-16 pl-16">
                <div className="absolute rounded-md border w-[35vw] h-[45vh] -rotate-6 z-10 boxShadow div1"></div>
                <div className="absolute rounded-md border-0 w-[34vw] h-[47vh] z-30 -mt-1 ml-7 p-0">
                  <img src={m3} className="w-full h-full rounded-3xl" alt="" />
                </div>
              </div>
            </div>
          )}
          {/* villa */}
          {villa && (
            <div
              className="border-0 h-[60vh] m-auto mt-10 w-[90vw] relative flex justify-between items-center"
              id="villa"
            >
              <div className="border-0 border-green-400 h-[60vh] ml-4">
                <div className="">
                  <p className="text-6xl tracking-widest text-gray-400 Library">
                    Villa
                  </p>
                </div>
                <div className=" h-[48vh] w-[40vw] border-0 border-teal-950 p-4">
                  {/* <!-- <img src="aero.png" alt="" className="border-0 h-[10vh] w-[20vw] inline ml-[50%]" /> --> */}
                  <div className="flex w-[60vw] h-[25vh]">
                    {/* <!-- prompt start  --> */}
                    <div className="relative border-4 w-[18.7vw] h-full ml-0 mt-4 p-0 bg-gray-900 text-white border-gray-800 rounded-md">
                      <p className="abolute w-full bg-gray-950 pt-0 text-center text-lg tracking-widest">
                        Prompts
                      </p>
                      <p className="p-3 text-gray-400">
                        create image ,villa front view, realistic, cinematic
                        lighting, photorealistic, hyper-realistic, 3d rendering,
                        render, 8k, 16k, extremely detailed, unreal engine,
                        octane, maya futuristic
                      </p>
                    </div>
                    {/* <!-- prompt end  --> */}

                    {/* <!-- Negative prompt start  --> */}
                    <div className="ml-1 relative border-4 w-[18.7vw] h-full mt-4 p-0 bg-gray-900 text-white border-gray-800 rounded-md">
                      <p className="abolute w-full bg-gray-950 pt-0 text-center text-lg tracking-widest">
                        Negative Prompts
                      </p>
                      <p className="p-3 text-gray-400">
                        blurry, distorted, unrealistic unrealistic, blurry,
                        distorted, low details, (cartoon), (game),
                        (painting), (sketch)
                      </p>
                    </div>
                    {/* <!-- Negative prompt end  --> */}
                  </div>
                  <div className="border-4 border-gray-800 rounded-md h-[25vh] w-fit mt-10">
                    <p className="text-center p-1 bg-gray-900 text-white tracking-widest">
                      Generated Image
                    </p>
                    <div className="grid w-full grid-cols-3">
                      <img
                        src={v1}
                        alt=""
                        className="border-0 object-contain w-full"
                      />
                      <img
                        src={v2}
                        alt=""
                        className="border-0 object-contain w-full"
                      />
                      <img
                        src={v3}
                        alt=""
                        className="border-0 object-contain w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- image of show case  --> */}
              <div className="relative border-0 h-[60vh] w-[44vw] p-10 pt-16 pl-16">
                <div className="absolute rounded-md border w-[35vw] h-[45vh] -rotate-6 z-10 boxShadow div1"></div>
                <div className="absolute rounded-md border-0 w-[34vw] h-[47vh] z-30 -mt-1 ml-7 p-0">
                  <img src={v4} className="w-full h-full rounded-3xl" alt="" />
                </div>
              </div>
            </div>
          )}
          {/* park */}
          {park && (
            <div
              className="border-0 h-[60vh] m-auto mt-10 w-[90vw] relative flex justify-between items-center"
              id="park"
            >
              <div className="border-0 border-green-400 h-[60vh] ml-4">
                <div className="">
                  <p className="text-6xl tracking-widest text-gray-400 Library">
                    Park
                  </p>
                </div>
                <div className=" h-[48vh] w-[40vw] border-0 border-teal-950 p-4">
                  {/* <!-- <img src="aero.png" alt="" className="border-0 h-[10vh] w-[20vw] inline ml-[50%]" /> --> */}
                  <div className="flex w-[60vw] h-[25vh]">
                    {/* <!-- prompt start  --> */}
                    <div className="relative border-4 w-[18.7vw] h-full ml-0 mt-4 p-0 bg-gray-900 text-white border-gray-800 rounded-md">
                      <p className="abolute w-full bg-gray-950 pt-0 text-center text-lg tracking-widest">
                        Prompts
                      </p>
                      <p className="p-3 text-gray-400">
                        create image ,park front view,children, parents, people,
                        view, realistic, cinematic lighting, photorealistic,
                        hyper-realistic, 3d rendering, render, 8k, 16k,
                        extremely detailed, unreal engine, octane, maya
                        futuristic
                      </p>
                    </div>
                    {/* <!-- prompt end  --> */}

                    {/* <!-- Negative prompt start  --> */}
                    <div className="ml-1 relative border-4 w-[18.7vw] h-full mt-4 p-0 bg-gray-900 text-white border-gray-800 rounded-md">
                      <p className="abolute w-full bg-gray-950 pt-0 text-center text-lg tracking-widest">
                        Negative Prompts
                      </p>
                      <p className="p-3 text-gray-400">
                        blurry, distorted, unrealistic unrealistic, blurry,
                        distorted, low details, (cartoon), (game),
                        (painting), (sketch)
                      </p>
                    </div>
                    {/* <!-- Negative prompt end  --> */}
                  </div>
                  <div className="border-4 border-gray-800 rounded-md h-[25vh] w-fit mt-10">
                    <p className="text-center p-1 bg-gray-900 text-white tracking-widest">
                      Generated Image
                    </p>
                    <div className="grid w-full grid-cols-3">
                      <img
                        src={p1}
                        alt=""
                        className="border-0 object-contain w-full"
                      />
                      <img
                        src={p4}
                        alt=""
                        className="border-0 object-contain w-full"
                      />
                      <img
                        src={p3}
                        alt=""
                        className="border-0 object-contain w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- image of show case  --> */}
              <div className="relative border-0 h-[60vh] w-[44vw] p-10 pt-16 pl-16">
                <div className="absolute rounded-md border w-[35vw] h-[45vh] -rotate-6 z-10 boxShadow div1"></div>
                <div className="absolute rounded-md border-0 w-[34vw] h-[47vh] z-30 -mt-1 ml-7 p-0">
                  <img src={p4} className="w-full h-full rounded-3xl" alt="" />
                </div>
              </div>
            </div>
          )}
          {/* school */}
          {school && (
            <div
              className="border-0 h-[60vh] m-auto mt-10 w-[90vw] relative flex justify-between items-center"
              id="school"
            >
              <div className="border-0 border-green-400 h-[60vh] ml-4">
                <div className="">
                  <p className="text-6xl tracking-widest text-gray-400 Library">
                    School
                  </p>
                </div>
                <div className=" h-[48vh] w-[40vw] border-0 border-teal-950 p-4">
                  {/* <!-- <img src="aero.png" alt="" className="border-0 h-[10vh] w-[20vw] inline ml-[50%]" /> --> */}
                  <div className="flex w-[60vw] h-[25vh]">
                    {/* <!-- prompt start  --> */}
                    <div className="relative border-4 w-[18.7vw] h-full ml-0 mt-4 p-0 bg-gray-900 text-white border-gray-800 rounded-md">
                      <p className="abolute w-full bg-gray-950 pt-0 text-center text-lg tracking-widest">
                        Prompts
                      </p>
                      <p className="p-3 text-gray-400">
                        create image ,school front view,children, teacher, view,
                        realistic, cinematic lighting, photorealistic,
                        hyper-realistic, 3d rendering, render, 8k, 16k,
                        extremely detailed, unreal engine, octane, maya
                        futuristic
                      </p>
                    </div>
                    {/* <!-- prompt end  --> */}

                    {/* <!-- Negative prompt start  --> */}
                    <div className="ml-1 relative border-4 w-[18.7vw] h-full mt-4 p-0 bg-gray-900 text-white border-gray-800 rounded-md">
                      <p className="abolute w-full bg-gray-950 pt-0 text-center text-lg tracking-widest">
                        Negative Prompts
                      </p>
                      <p className="p-3 text-gray-400">
                        blurry, distorted, unrealistic unrealistic, blurry,
                        distorted, low details, (cartoon), (game),
                        (painting), (sketch)
                      </p>
                    </div>
                    {/* <!-- Negative prompt end  --> */}
                  </div>
                  <div className="border-4 border-gray-800 rounded-md h-[25vh] w-fit mt-10">
                    <p className="text-center p-1 bg-gray-900 text-white tracking-widest">
                      Generated Image
                    </p>
                    <div className="grid w-full grid-cols-3">
                      <img
                        src={s1}
                        alt=""
                        className="border-0 object-contain w-full"
                      />
                      <img
                        src={s3}
                        alt=""
                        className="border-0 object-contain w-full"
                      />
                      <img
                        src={s4}
                        alt=""
                        className="border-0 object-contain w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- image of show case  --> */}
              <div className="relative border-0 h-[60vh] w-[44vw] p-10 pt-16 pl-16">
                <div className="absolute rounded-md border w-[35vw] h-[45vh] -rotate-6 z-10 boxShadow div1"></div>
                <div className="absolute rounded-md border-0 w-[34vw] h-[47vh] z-30 -mt-1 ml-7 p-0">
                  <img src={s2} className="w-full h-full rounded-3xl" alt="" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UseCases;
