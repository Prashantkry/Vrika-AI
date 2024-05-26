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
import "../App.css";
import { UseCasesComponent } from "./UseCasesComponent";

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
      <div className="w-full h-full relative">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        <div className="mainBg h-full pt-10">
          <p className="text-5xl text-indigo-300 font-sans ml-8 tracking-widest text-center border-b-0 w-fit">
            Use Cases
          </p>
          <div className="w-full h-full text-xl font-semibold text-gray-200 my-7 px-20">
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
            <UseCasesComponent
              prompt={
                " mall front ,mall outside ,front view, realistic, cinematic lighting, photorealistic, hyper-realistic, 3d rendering,render, 8k, 16k, extremely detailed, unreal engine, octane, maya futuristic"
              }
              negPrompt={
                "blurry, distorted, unrealistic unrealistic, blurry, distorted,low details, (cartoon), (game), (painting),(sketch)"
              }
              genImage={[m4, m2, m5]}
              mainImage={m3}
            />
          )}
          {/* villa */}
          {villa && (
            <UseCasesComponent
              prompt={
                " create image ,villa front view, realistic, cinematic lighting, photorealistic, hyper-realistic, 3d rendering, render, 8k, 16k, extremely detailed, unreal engine, octane, maya futuristic"
              }
              negPrompt={
                "blurry, distorted, unrealistic unrealistic, blurry, distorted, low details, (cartoon), (game), (painting), (sketch)"
              }
              genImage={[v1, v2, v3]}
              mainImage={v4}
            />
          )}
          {/* park */}
          {park && (
            <UseCasesComponent
              prompt={
                "create image ,park front view,children, parents, people,view, realistic, cinematic lighting, photorealistic, hyper-realistic, 3d rendering, render,  8k, 16k, extremely detailed, unreal engine, octane, maya futuristic"
              }
              negPrompt={
                "blurry, distorted, unrealistic unrealistic, blurry, distorted, low details, (cartoon), (game), (painting), (sketch)"
              }
              genImage={[p1, p4, p3]}
              mainImage={p4}
            />
          )}
          {/* school */}
          {school && (
            <UseCasesComponent
              prompt={
                "create image ,school front view,children, teacher, view, realistic, cinematic lighting, photorealistic, hyper-realistic, 3d rendering, render, 16k, extremely detailed, unreal engine, octane, maya futuristic"
              }
              negPrompt={
                " blurry, distorted, unrealistic unrealistic, blurry, distorted, low details, (cartoon), (game), (painting), (sketch)"
              }
              genImage={[s1, s3, s4]}
              mainImage={s2}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UseCases;
