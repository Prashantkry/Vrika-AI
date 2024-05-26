import React from "react";

export const UseCasesComponent = ({
  prompt,
  negPrompt,
  genImage,
  mainImage,
}) => {
  console.log(genImage);
  return (
    <>
      <div
        className="border-0 h-full mallContent m-auto mt-10 w-[90vw] relative flex justify-between items-center"
        id="mall"
      >
        <div className="border-0 mallImageCon h-full w-[45%] flex items-center justify-center border-green-400">
          <div className="h-full w-[40vw] mpn border-0 border-teal-950 p-4 pl-0">
            <div className="flex w-fit border-0 NP">
              {/* <!-- prompt start  --> */}
              <div className="relative border-4 promptW w-[18.7vw] h-full ml-0 p-0 bg-gray-900 text-white border-gray-800 rounded-md">
                <p className="w-full NegativeP bg-gray-950 pt-0 text-center text-wrap text-lg tracking-widest">
                  Prompts
                </p>
                <p className="p-3 promptText text-gray-400">{prompt}</p>
              </div>
              {/* <!-- prompt end  --> */}

              {/* <!-- Negative prompt start  --> */}
              <div className="ml-1 relative promptW border-4 w-[18.7vw] h-full p-0 bg-gray-900 text-white border-gray-800 rounded-md">
                <p className="w-full NegativeP bg-gray-950 pt-0 text-center text-wrap text-lg tracking-widest">
                  Negative Prompts
                </p>
                <p className="p-3 promptText text-gray-400">{negPrompt}</p>
              </div>
              {/* <!-- Negative prompt end  --> */}
            </div>
            <div className="border-4 border-gray-800 rounded-md h-[25vh] GeneratedImage w-fit overflow-hidden mt-10">
              <p className="text-center p-1 bg-gray-900 text-white tracking-widest">
                Generated Image
              </p>
              <div className="grid w-full h-full grid-cols-3">
                {genImage &&
                  genImage.map((image, ind) => (
                    <img
                      key={ind}
                      src={image}
                      className="border-0 object-fill w-full h-full"
                      alt=""
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- image of show case  --> */}
        <div className="border-0 border-yellow-500 w-[45%] h-[53vh] mainImg flex items-center justify-center">
          <div className="absolute rounded-md border w-[35vw] h-[45vh] -rotate-6 z-10 boxShadow boxShadow2 div1"></div>
          <div className="absolute rounded-md border-0 w-[34vw] h-[47vh] imageBig z-30 -mt-1 ml-7 p-0">
            <img src={mainImage} className="w-full h-full rounded-3xl" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};
