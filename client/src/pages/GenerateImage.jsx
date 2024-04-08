import React, { useState } from "react";

const GenerateImage = () => {
  const [positivePrompts, setPositivePrompts] = useState("");
  const [negativePrompts, setNegativePrompts] = useState("");
  const [image, setImage] = useState();

  const generate = async () => {
    console.log("forntend triggered");
    console.log("Positive Prompts", positivePrompts);

    // const url = "http://localhost:5000/api/generateImage";
    const url = "https://vrika-ai.onrender.com/api/generateImage";
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        positivePrompts,
        negativePrompts,
      }),
    });
    const data = await result.json();
    console.log("Generated Image Data", data);
    setImage("data:image/png;base64," + data.result.result);
  };
  return (
    <>
      <main>
        <div className="relative h-full w-full bg-slate-950">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
          </div>

            <div className=" h-screen">
              <div>
                <p>Prompts</p>
                <textarea
                  id="positiveP"
                  type="text"
                  className="border mx-2 w-[20vw] h-[10vh] "
                  onChange={(e) => {
                    setPositivePrompts(e.target.value);
                  }}
                />
                <textarea
                  id="negativeP"
                  type="text"
                  className="border mx-2 w-[20vw] h-[10vh] "
                  onChange={(e) => {
                    setNegativePrompts(e.target.value);
                  }}
                />
                {image && (
                  <img
                    src={image}
                    alt="Generated Image"
                    width={500}
                    height={500}
                  />
                )}
              </div>
              <button className="border p-1 my-2 " onClick={generate}>
                Generate
              </button>
            </div>
          </div>
      </main>
    </>
  );
};

export default GenerateImage;
