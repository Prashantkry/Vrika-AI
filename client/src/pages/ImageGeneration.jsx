import { useEffect, useState } from "react";
import w2, {
  down,
  right,
  w1,
  w3,
  w4,
  w5,
  a1,
  a2,
  a3,
  a4,
  a5,
} from "../components/Image";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileDashboard from "../components/ProfileDashboard";
import { useSelector } from "react-redux";

let maxLimit = 500;
let textContent = "";
let nTextContent = "";
let inputFile;
let imageData;

let imageArray = [w1, w3, w4, w5, w2, a1, a2, a3, a4, a5];

const ImageGeneration = () => {
  // check authorization 1st start
  const [setMessage] = useState();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("https://vrika.onrender.com/api/v1/generateImageT3DM")
      .then((res) => {
        console.log("res -> ", res);
        if (res.data.valid === true) {
          setMessage(res.data.message);
        } else {
          navigate("/signIn");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  // check authorization 1st end

  const [positivePrompts, setPositivePrompts] = useState("");
  const [negativePrompts, setNegativePrompts] = useState("");
  const [image, setImage] = useState([]);
  // const [image, setImage] = useState([]);
  const [isPromptVisible, setIsPromptVisible] = useState(true);
  const [isSettingVisible, setIsSettingVisible] = useState(true);
  const [isGeneratedVisible, setIsGeneratedVisible] = useState(false);

  const [remainingCharacters, setRemainingCharacters] = useState(maxLimit);
  const [nRemainingCharacters, setNRemainingCharacters] = useState(maxLimit);

  const [promptWeight, setPromptWeight] = useState(0);
  const [ControlWeight, setControlWeight] = useState(0);
  const [ImagesNosCount, setImagesNosCount] = useState(0);
  const [ImagesChange, setImagesChange] = useState(0); // for blur effect
  const [seed, setSeed] = useState(-1);

  const [help, setHelp] = useState(false);

  const [showProject, setShowProject] = useState(false);
  const [showImageGenerationAndTools, setShowImageGenerationAndTools] =
    useState(true);
  const [showSettings, setShowSettings] = useState(true);
  const [showChoosedImage, setShowChoosedImage] = useState(true);

  const [showImageGeneration, setShowImageGeneration] = useState(false);

  const [imageChosen, setImageChosen] = useState(false);
  const [imageSrc, setImageSrc] = useState(""); // image choosed

  const [isGenerating, setIsGenerating] = useState(false);

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // handle remianing characters in prompts textarea
  function handleTextRemainingCharacters(text, isNegative = false) {
    if (!isNegative) {
      nTextContent = text;
      if (textContent.length <= 500) {
        const remaining = maxLimit - nTextContent.length;
        setRemainingCharacters(remaining);
      }
    } else {
      textContent = text;
      const remaining = maxLimit - textContent.length;
      setNRemainingCharacters(remaining);
    }
  }

  // toggling b/w tools
  const Toggle = (e) => {
    if (e === "prompt") {
      setIsPromptVisible(!isPromptVisible);
    }
    if (e === "setting") {
      setIsSettingVisible(!isSettingVisible);
    }
    if (e === "generated") {
      setIsGeneratedVisible(!isGeneratedVisible);
    }
  };

  // handle random value of seed
  function handleRandom() {
    const randomValue = Math.floor(Math.random() * 4294967297);
    setSeed(randomValue);
  }

  function handleReset() {
    setSeed(-1);
  }

  // handle input change
  const handleRangeChange = (type, event) => {
    const value = event.target.value;
    if (value === "") {
      if (type === "prompt") {
        setPromptWeight(0);
      } else if (type === "control") {
        setControlWeight(0);
      } else if (type === "ImagesNos") {
        setImagesNosCount(0);
      } else if (type === "ImagesChange") {
        setImagesChange(0);
      }
    } else {
      if (type === "prompt") {
        setPromptWeight(parseInt(value));
      } else if (type === "control") {
        setControlWeight(value);
      } else if (type === "ImagesNos") {
        setImagesNosCount(parseInt(value));
      } else if (type === "ImagesChange") {
        setImagesChange(parseInt(value));
      }
    }
  };

  // handle open closen of right side tool help section
  function toggleHelp() {
    if (help === false) {
      setHelp(true);
    } else {
      setHelp(false);
    }
  }

  function toggleDashboard() {
    setShowChoosedImage(true);
    setShowProject(false);
    setShowImageGenerationAndTools(true);
    setShowSettings(true);
    let imageChoosed = document.getElementById("imageChoosed");
    imageChoosed.style.display = "block";
  }
  function toggleProject() {
    setShowProject(true);
    setShowImageGenerationAndTools(false);
    setShowSettings(false);
    setShowChoosedImage(false);
  }

  // ! drag and drop for image and 3-D model in image generation dashboard start

  function enableDragAndDrop() {
    const dropArea = document.getElementById("dropAreaBig");

    ["dragenter", "dragover"].forEach((eventName) => {
      dropArea.addEventListener(eventName, highlight, false);
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropArea.addEventListener(eventName, unhighlight, false);
    });

    dropArea.addEventListener("drop", handleDrop, false);

    const fileLabel = document.querySelector("#filebg_label");
    inputFile = document.getElementById("file_bigger");
    inputFile.addEventListener("change", function () {
      // * --------------------- choosing file ---------------------
      if (inputFile.files.length > 0) {
        console.log("first");
        fileLabel.textContent = inputFile.files[0].name;
        console.log("imageSrc -> ", imageSrc);
        setImageChosen(true);
        console.log("imageChosen:", imageChosen);
        const reader = new FileReader();
        console.log("reader -> ", reader);
        reader.onload = (es) => {
          const imageSrc = es.target.result;
          // console.log("imageSrc -> ", imageSrc);
          setImageSrc(imageSrc);
        };
        reader.readAsDataURL(inputFile.files[0]);
      } else {
        resetChoosedImageData();
        fileLabel.textContent = "Choose File";
      }
    });
  }

  function handleDrop(e) {
    console.log("handleDrop called");
    e.preventDefault();
    e.stopPropagation();
    const dt = e.dataTransfer;
    const files = dt.files;
    const fileLabel = document.querySelector("#filebg_label");
    const inputFile = document.getElementById("file_bigger");
    inputFile.files = files;
    fileLabel.textContent = files[0].name;

    // Set imageChosen to true
    setImageChosen(true);
    console.log("imageChosen:", imageChosen);
    const reader = new FileReader();
    reader.onload = (es) => {
      const imageSrc = es.target.result;
      console.log(imageSrc);
      setImageSrc(imageSrc);
    };
    reader.readAsDataURL(files[0]);
  }

  function highlight(e) {
    const dropArea = document.getElementById("dropAreaBig");
    dropArea.style.backgroundColor = "#2d3748";
    e.preventDefault();
  }

  function unhighlight(e) {
    const dropArea = document.getElementById("dropAreaBig");
    dropArea.style.backgroundColor = "";
    e.preventDefault();
  }

  useEffect(() => {
    enableDragAndDrop();
  }, []);

  // ! drag and drop for image and 3-D model in image generation dashboard end

  // get user id form redux store start
  let userId = useSelector((state) => state.Login.UserId);
  // end

  // ! generate imasge start
  const generate = async () => {
    setIsGenerating(true);
    setIsGeneratedVisible(true);
    setIsSettingVisible(false);
    setIsPromptVisible(true);
    setShowProject(false);
    setShowImageGeneration(true);

    console.log(userId);

    const backendContent = {
      textContent:
        positivePrompts ||
        "realistic, cinematic lighting, photorealistic, hyper-realistic, 3d rendering, render, 8k, 16k, extremely detailed, unreal engine, octane, maya",
      nTextContent:
        negativePrompts ||
        "blurry, (distorted), unrealistic, white floor, untextured, cars",
      seed: seed.toString() || "-1",
      guidance_scale: promptWeight || 1,
      num_outputs: ImagesNosCount || 1,
      controlnet_conditioning_scale: ControlWeight || 1,
      UserID_: userId,
    };
    console.log(backendContent);

    const response = await fetch("https://vrika.onrender.com/api/v1/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        backendContent,
      }),
    });
    const apiRes = await response.json();
    console.log("apiRes => ", apiRes);
    const imageData = apiRes.imageData.ImageDataGenAi;
    console.log("imageData => ", imageData);
    setImage((prevImages) => [...prevImages, ...imageData]);
    console.log(image);
    setIsGenerating(false);

    // for mongo db extractions
    const InfoJson = {
      input: {
        controlnet_1: apiRes.imageData.GenAiImageData.input.controlnet_1,
        controlnet_1_conditioning_scale:
          apiRes.imageData.GenAiImageData.input.controlnet_1_conditioning_scale,
        controlnet_1_end:
          apiRes.imageData.GenAiImageData.input.controlnet_1_end,
        controlnet_1_start:
          apiRes.imageData.GenAiImageData.input.controlnet_1_start,
        controlnet_2: apiRes.imageData.GenAiImageData.input.controlnet_2,
        controlnet_2_conditioning_scale:
          apiRes.imageData.GenAiImageData.input.controlnet_2_conditioning_scale,
        controlnet_2_end:
          apiRes.imageData.GenAiImageData.input.controlnet_2_end,
        controlnet_2_start:
          apiRes.imageData.GenAiImageData.input.controlnet_2_start,
        guidance_scale: apiRes.imageData.GenAiImageData.input.guidance_scale,
        height: apiRes.imageData.GenAiImageData.input.height,
        width: apiRes.imageData.GenAiImageData.input.width,
        prompt: apiRes.imageData.GenAiImageData.input.prompt,
        negative_prompt: apiRes.imageData.GenAiImageData.input.negative_prompt,
        num_inference_steps:
          apiRes.imageData.GenAiImageData.input.num_inference_steps,
        num_outputs: apiRes.imageData.GenAiImageData.input.num_outputs,
        refine: apiRes.imageData.GenAiImageData.input.refine,
        refine_steps: apiRes.imageData.GenAiImageData.input.refine_steps,
        scheduler: apiRes.imageData.GenAiImageData.input.scheduler,
        seed: apiRes.imageData.GenAiImageData.input.seed,
        sizing_strategy: apiRes.imageData.GenAiImageData.input.sizing_strategy,
      },
      created_at: apiRes.imageData.GenAiImageData.created_at,
      started_at: apiRes.imageData.GenAiImageData.started_at,
      completed_at: apiRes.imageData.GenAiImageData.completed_at,
      metrics: {
        predict_time: apiRes.imageData.GenAiImageData.metrics.predict_time,
      },
      images: apiRes.imageData.GenAiImageData.output,
    };
    console.log("InfoJson => ", InfoJson);
  };
  // ! end

  // ! showing image data in main view port start
  const showImage = (index) => {
    imageData = image[index];
    console.log(index);
    if (index === selectedImageIndex) {
      // Toggle through images if the same image is clicked
      setSelectedImageIndex((prevIndex) =>
        prevIndex === image.length - 1 ? 0 : prevIndex + 1
      );
    } else {
      setSelectedImageIndex(index);
    }
  };

  useEffect(() => {
    if (image.length > 0 && selectedImageIndex === null) {
      setSelectedImageIndex(0);
    }
  }, [image, selectedImageIndex]);
  // end

  // resetChoosedImageData start
  function resetChoosedImageData() {
    setImageSrc("");
    setImageChosen(false);
  }
  // resetChoosedImageData end

  // removeImageVIewPort start
  function removeImageVIewPort() {
    setSelectedImageIndex("");
  }
  // removeImageVIewPort end

  // show image generated info
  function showImageGeneratedInfo(sendImageInformations) {
    // console.log('iData showImageGeneratedInfo -> ',iData)
    console.log("iData showImageGeneratedInfo -> ", sendImageInformations);
    let imageInfoData_ = document.getElementById("imageInfoData_");
    let displayStyle = window
      .getComputedStyle(imageInfoData_)
      .getPropertyValue("display");

    if (displayStyle === "none") {
      imageInfoData_.style.display = "block";
    } else {
      imageInfoData_.style.display = "none";
    }

    // imageInfoData = {
    // imageInfoDataPrompt = sendImageInformations.Prompt;
    // imageInfoDataNegativePrompt = sendImageInformations.NegativePrompt;
    // imageInfoDataPromptWeight = sendImageInformations.PromptWeight;
    // imageInfoDataControlWeight = sendImageInformations.ControlWeight;
    // imageInfoDataSeed = sendImageInformations.seed;
    // imageInfoDatatype = sendImageInformations.type;
    // console.log(imageInfoData);
  }

  // download image start
  async function downloadImage(iData) {
    console.log("iData downloadImage -> ", iData);
    const image = await fetch(iData);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  // download image end

  // replicate image data from 1 to another start
  async function handleReplicateImage(sendImageInformations) {
    console.log("handleReplicateImage -> ", sendImageInformations);
    textContent = sendImageInformations.Prompt;
    nTextContent = sendImageInformations.NegativePrompt;
    PromptCount = sendImageInformations.PromptWeight;
    setControlWeight(sendImageInformations.ControlWeight);
    setSeed(sendImageInformations.seed);
  }
  // replicate image data from 1 to another end

  return (
    <>
      <main>
        <div className="relative border-0 h-[92vh] p-2 w-full bg-slate-950">
          <div className="flex flex-row-reverse h-full items-center justify-between">
            {/* side tools start*/}
            <div className="w-[3.5vw] rounded h-full ml-2 -mr-1 border-0 bg-gray-900 flex items-center justify-between py-5 flex-col">
              {/* generation related data start */}
              <div>
                {/* Project */}
                <button
                  className="w-[35px] h-[35px] mb-6 flex items-center justify-center hover:bg-purple-950 rounded "
                  onClick={toggleProject}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-[22px] h-[22px]"
                  >
                    <path
                      fill="#6f1ed2"
                      d="M368 80h32v32H368V80zM352 32c-17.7 0-32 14.3-32 32H128c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64v64c0 17.7 14.3 32 32 32V352c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32H320c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V384c0-17.7-14.3-32-32-32V160c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H352zM96 160c17.7 0 32-14.3 32-32H320c0 17.7 14.3 32 32 32V352c-17.7 0-32 14.3-32 32H128c0-17.7-14.3-32-32-32V160zM48 400H80v32H48V400zm320 32V400h32v32H368zM48 112V80H80v32H48z"
                    />
                  </svg>
                </button>

                {/* create new generate image dashboard */}
                <button
                  className="w-[35px] h-[35px] mb-6 flex items-center justify-center hover:bg-purple-950 rounded "
                  onClick={toggleDashboard}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-[22px] h-[22px]"
                  >
                    <path
                      fill="#6f1ed2"
                      d="M315.4 15.5C309.7 5.9 299.2 0 288 0s-21.7 5.9-27.4 15.5l-96 160c-5.9 9.9-6.1 22.2-.4 32.2s16.3 16.2 27.8 16.2H384c11.5 0 22.2-6.2 27.8-16.2s5.5-22.3-.4-32.2l-96-160zM288 312V456c0 22.1 17.9 40 40 40H472c22.1 0 40-17.9 40-40V312c0-22.1-17.9-40-40-40H328c-22.1 0-40 17.9-40 40zM128 512a128 128 0 1 0 0-256 128 128 0 1 0 0 256z"
                    />
                  </svg>
                </button>
                <div className="w-full h-[1.5px] bg-gray-800" />
              </div>
              {/* generation related data end */}

              {/* user related data start */}
              <div className="relative">
                <div className="w-full h-[1.5px] flex items-center justify-around mb-7 bg-gray-800" />
                {/* help */}
                <button
                  onClick={toggleHelp}
                  className="w-[35px] h-[35px] mb-6 flex items-center justify-center hover:bg-purple-950 rounded "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    className=" w-[22px] h-[22px] ring-2 rounded-full p-1 ring-purple-800"
                  >
                    <path
                      fill="#6f1ed2"
                      d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
                    />
                  </svg>
                </button>

                {/* model start */}
                {help && (
                  <div className="w-[20vw] absolute h-fit px-2 rounded text-gray-300 -ml-[22vw] -mt-[27vh] border-gray-950 bg-gray-950 border">
                    <form action="" className="leading-10 px-2">
                      <div className="my-2">
                        <label htmlFor="name" className="mr-2">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="bg-transparent border rounded w-full border-gray-700 outline-none px-1"
                          id="name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="mr-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="bg-transparent border rounded w-full border-gray-700 outline-none px-1"
                          id="email"
                        />
                      </div>

                      <div>
                        <label htmlFor="message">Message</label>
                        <br />
                        <textarea
                          name="message"
                          id="message"
                          cols="27"
                          rows="2"
                          className="bg-transparent border rounded w-full h-[9vh] border-gray-700 overflow-scroll leading-5 no-scrollbar outline-none px-1"
                        ></textarea>
                      </div>

                      <button className="bg-purple-950 px-3 mb-2 w-full font-normal font-sans tracking-wide  py-0 rounded">
                        Send
                      </button>
                    </form>
                  </div>
                )}
                {/* model end */}

                {/* message */}
                <div className="w-[35px] h-[35px] mb-6 flex items-center justify-center hover:bg-purple-950 rounded ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className=" w-[22px] h-[22px] scale-x-[-1]"
                  >
                    <path
                      fill="#6f1ed2"
                      d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64h96v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64z"
                    />
                  </svg>
                </div>

                {/* profile */}
                <div className="w-[35px] h-[35px] mb-6 flex items-center justify-center hover:bg-purple-950 rounded ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className=" w-[22px] h-[22px] "
                  >
                    <path
                      fill="#6f1ed2"
                      d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
                    />
                  </svg>
                </div>
              </div>
              {/* user related data end */}
            </div>
            {/* side tools end*/}

            {/* home screen main view start  */}
            {showChoosedImage && (
              <div className="ml-2 p-2 w-[65vw] border-0 h-full bg-gray-900 rounded flex items-center justify-center relative">
                {/* showing generated image start pop model */}
                <div className="absolute z-20 flex items-center justify-center align-middle p-10 max-w-full h-full">
                  <img
                    src={selectedImageIndex}
                    alt=""
                    className="rounded max-w-full mr-2 max-h-full" // TODO margin had to be set later also fix delete image data
                  />
                </div>
                {/* showing generated image end */}

                {/* before choosing image start */}
                {showImageGenerationAndTools && !imageChosen ? (
                  <div className="border-2 border-dashed border-indigo-900 rounded flex items-center justify-center w-full h-full">
                    <div
                      className="cursor-pointer flex flex-col justify-center items-center bg-rpGray-909 w-[98%] h-full m-3 rounded-md p-4"
                      id="dropAreaBig"
                      onClick={() =>
                        document.getElementById("file_bigger").click()
                      }
                    >
                      <input
                        accept="image/png,.png,image/jpeg,.jpeg,image/webp,.webp/,.glb,.3ds"
                        multiple=""
                        type="file"
                        id="file_bigger"
                        name="file_bigger"
                        style={{ display: "none" }}
                        alt=""
                      />
                      <img
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NCIgaGVpZ2h0PSI0NCIgZmlsbD0ibm9uZSIgeG1sbnM6dj0iaHR0cHM6Ly92ZWN0YS5pby9uYW5vIj48Y2lyY2xlIGN4PSIyMiIgY3k9IjIyIiByPSIyMCIgZmlsbD0iI2U3ZWRmYiIvPjxwYXRoIGQ9Ik0zMC43OTMgMTcuMTI0Yy0uNDE5LTIuNTAyLTIuNTc1LTQuMzc1LTUuMTgtNC4zNzUtLjQ2IDAtLjkxMi4wNTktMS4zNS4xNzVhNi41MSA2LjUxIDAgMCAwLTUuMjI0LTIuNTkxYy0zLjYyNSAwLTYuNTc0IDIuOTQ5LTYuNTc0IDYuNTc0bC4wMTcuNDZhNi4xNCA2LjE0IDAgMCAwLTMuODE1IDUuNjc1YzAgMy4zODMgMi43NTIgNi4xMzYgNi4xMzYgNi4xMzYuNDg0IDAgLjg3Ny0uMzkyLjg3Ny0uODc2cy0uMzkyLS44NzYtLjg3Ni0uODc2YTQuMzkgNC4zOSAwIDAgMS00LjM4My00LjM4MyA0LjM4IDQuMzggMCAwIDEgMy4yNS00LjIyOGMuNDQzLS4xMTguNzItLjU1OC42MzUtMS4wMDlhNC44NyA0Ljg3IDAgMCAxLS4wODctLjg5OCA0LjgzIDQuODMgMCAwIDEgNC44MjEtNC44MjFjMS42OTggMCAzLjI0Ljg3MyA0LjEyNCAyLjMzNS4yMjUuMzcyLjY4OS41MjMgMS4wOS4zNTRhMy40OCAzLjQ4IDAgMCAxIDEuMzU5LS4yNzQgMy40OSAzLjQ5IDAgMCAxIDMuNDk5IDMuMzc4Yy4wMTUuNDIxLjMyOC43NzIuNzQ1LjgzNSAyLjEyMy4zMiAzLjcyNCAyLjE4IDMuNzI0IDQuMzI3YTQuMzkgNC4zOSAwIDAgMS00LjM4MiA0LjM4M2MtLjQ4NCAwLS44NzYuMzkyLS44NzYuODc3cy4zOTIuODc3Ljg3Ny44NzdjMy4zODMgMCA2LjEzNi0yLjc1MyA2LjEzNi02LjEzNiAwLTIuNzc0LTEuOTA5LTUuMjA3LTQuNTQtNS45MTh6bS0yLjM4OSA3LjIxMmwtNS43ODUtNS43ODVjLS4zNDItLjM0Mi0uODk3LS4zNDItMS4yMzkgMGwtNS43ODUgNS43ODVjLS4zNDIuMzQyLS4zNDIuODk3IDAgMS4yMzlzLjg5Ny4zNDIgMS4yMzkgMGw0LjI4OC00LjI4OHYxMC44NzVjMCAuNDg0LjM5Mi44NzcuODc3Ljg3N3MuODc3LS4zOTIuODc3LS44NzZWMjEuMjg3bDQuMjg4IDQuMjg4Yy4xNzEuMTcxLjM5Ni4yNTcuNjIuMjU3cy40NDktLjA4Ni42Mi0uMjU3YS44OC44OCAwIDAgMCAwLTEuMjR6IiBmaWxsPSIjMTk3N2YyIi8+PC9zdmc+"
                        className=""
                        alt=""
                        id="uploadIcon"
                      />
                      <p className="antialiased font-inter-medium font-sans text-[0.875rem] leading-[1.5rem] text-purple-800 text-center">
                        <label id="filebg_label">
                          Drag and Drop or Choose Your File
                        </label>
                      </p>
                      <div className="mt-2.5 flex flex-row justify-center items-center w-full">
                        <h6
                          className="!font-inter-regular antialiased font-inter-regular font-sans text-xs tracking-wide leading-[1.25rem] text-gray-500 text-center poppins-light"
                          id="imageType"
                        >
                          PNG, JPEG, JPG Max File Size: 10 MB
                        </h6>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-indigo-900 rounded flex items-center justify-center w-full h-full"
                    id="imageChoosed"
                  >
                    <img
                      src={imageSrc}
                      alt=""
                      className="max-w-full max-h-full p-2 rounded blurChoosed"
                      style={{
                        filter: `blur(calc(${ImagesChange / 30}px) `,
                      }}
                    />
                  </div>
                )}
              </div>
            )}
            {/* home screen main view end  */}

            {/* side bar start*/}
            {showSettings && (
              <div className="w-[30vw] px-3 h-full bg-gray-900 rounded">
                <div className="w-full h-[83vh] overflow-scroll no-scrollbar">
                  <div className="w-full border-0 flex flex-col items-center justify-between rounded">
                    {/* all button of image view delete , download , share ,replicate , information of images */}
                    <div className="w-full bg-gray-950 h-fit rounded flex items-center justify-around m-3 mb-0 p-3">
                      {/* reset choosed imaged */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={resetChoosedImageData}
                        className="w-[25px] h-[25px] hover:border-2 p-1 rounded border-purple-600 cursor-pointer"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="#6a1599"
                          d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                        />
                      </svg>

                      {/* remove image from view port */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[25px] h-[25px] hover:border-2 p-1 rounded border-purple-600 cursor-pointer"
                        viewBox="0 0 448 512"
                        onClick={removeImageVIewPort}
                      >
                        <path
                          fill="#6a1599"
                          d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm88 200H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z"
                        />
                      </svg>

                      {/* ṣhare image button */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[25px] h-[25px] hover:border-2 p-1 rounded border-purple-600 cursor-pointer"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="#6a1599"
                          d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z"
                        />
                      </svg>

                      {/* replicate image data  */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[25px] h-[25px] hover:border-2 p-1 rounded border-purple-600 cursor-pointer"
                        viewBox="0 0 640 512"
                      >
                        <path
                          fill="#6a1599"
                          d="M48.2 66.8c-.1-.8-.2-1.7-.2-2.5c0-.1 0-.1 0-.2c0-8.8 7.2-16 16-16c.9 0 1.9 .1 2.8 .2C74.3 49.5 80 56.1 80 64c0 8.8-7.2 16-16 16c-7.9 0-14.5-5.7-15.8-13.2zM0 64c0 26.9 16.5 49.9 40 59.3V228.7C16.5 238.1 0 261.1 0 288c0 35.3 28.7 64 64 64c26.9 0 49.9-16.5 59.3-40H324.7c9.5 23.5 32.5 40 59.3 40c35.3 0 64-28.7 64-64c0-26.9-16.5-49.9-40-59.3V123.3c23.5-9.5 40-32.5 40-59.3c0-35.3-28.7-64-64-64c-26.9 0-49.9 16.5-59.3 40H123.3C113.9 16.5 90.9 0 64 0C28.7 0 0 28.7 0 64zm368 0a16 16 0 1 1 32 0 16 16 0 1 1 -32 0zM324.7 88c6.5 16 19.3 28.9 35.3 35.3V228.7c-16 6.5-28.9 19.3-35.3 35.3H123.3c-6.5-16-19.3-28.9-35.3-35.3V123.3c16-6.5 28.9-19.3 35.3-35.3H324.7zM384 272a16 16 0 1 1 0 32 16 16 0 1 1 0-32zM80 288c0 7.9-5.7 14.5-13.2 15.8c-.8 .1-1.7 .2-2.5 .2l-.2 0c-8.8 0-16-7.2-16-16c0-.9 .1-1.9 .2-2.8C49.5 277.7 56.1 272 64 272c8.8 0 16 7.2 16 16zm391.3-40h45.4c6.5 16 19.3 28.9 35.3 35.3V388.7c-16 6.5-28.9 19.3-35.3 35.3H315.3c-6.5-16-19.3-28.9-35.3-35.3V352H232v36.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64c26.9 0 49.9-16.5 59.3-40H516.7c9.5 23.5 32.5 40 59.3 40c35.3 0 64-28.7 64-64c0-26.9-16.5-49.9-40-59.3V283.3c23.5-9.5 40-32.5 40-59.3c0-35.3-28.7-64-64-64c-26.9 0-49.9 16.5-59.3 40H448v16.4c9.8 8.8 17.8 19.5 23.3 31.6zm88.9-26.7a16 16 0 1 1 31.5 5.5 16 16 0 1 1 -31.5-5.5zM271.8 450.7a16 16 0 1 1 -31.5-5.5 16 16 0 1 1 31.5 5.5zm301.5 13c-7.5-1.3-13.2-7.9-13.2-15.8c0-8.8 7.2-16 16-16c7.9 0 14.5 5.7 15.8 13.2l0 .1c.1 .9 .2 1.8 .2 2.7c0 8.8-7.2 16-16 16c-.9 0-1.9-.1-2.8-.2z"
                        />
                      </svg>

                      {/* Show image informations */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[25px] h-[25px] hover:border-2 p-1 rounded border-purple-600 cursor-pointer"
                        viewBox="0 0 192 512"
                      >
                        <path
                          fill="#6a1599"
                          d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"
                        />
                      </svg>

                      {/* download image */}
                      <svg
                        onClick={() => downloadImage(imageData)}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[25px] h-[25px] hover:border-2 p-1 rounded border-purple-600 cursor-pointer"
                        viewBox="0 0 384 512"
                      >
                        <path
                          fill="#6a1599"
                          d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                        />
                      </svg>
                    </div>
                    {/* all button of image view delte , download , share ,replicate , information of images */}

                    {/* prompt start */}
                    <div className="w-full bg-gray-950 h-fit rounded m-3 p-3">
                      {/* button work */}
                      <div className="flex items-center justify-between px-2 rounded border-indigo-900 border-2">
                        <button
                          className="flex border-0 w-full p-2 text-lg tracking-wide items-center justify-start text-gray-200"
                          onClick={(e) => {
                            Toggle("prompt");
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                            height="20px"
                            width="20px"
                            className="mt-1 mr-2"
                          >
                            <path
                              fill="#f8f9fc"
                              d="M112 0C99.1 0 87.4 7.8 82.5 19.7l-66.7 160-13.3 32c-6.8 16.3 .9 35 17.2 41.8s35-.9 41.8-17.2L66.7 224h90.7l5.1 12.3c6.8 16.3 25.5 24 41.8 17.2s24-25.5 17.2-41.8l-13.3-32-66.7-160C136.6 7.8 124.9 0 112 0zm18.7 160H93.3L112 115.2 130.7 160zM256 32v96 96c0 17.7 14.3 32 32 32h80c44.2 0 80-35.8 80-80c0-23.1-9.8-43.8-25.4-58.4c6-11.2 9.4-24 9.4-37.6c0-44.2-35.8-80-80-80H288c-17.7 0-32 14.3-32 32zm96 64H320V64h32c8.8 0 16 7.2 16 16s-7.2 16-16 16zm-32 64h32 16c8.8 0 16 7.2 16 16s-7.2 16-16 16H320V160zM566.6 310.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L352 434.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l192-192z"
                            ></path>
                          </svg>
                          <p className="tracking-wide font-poppins">Prompts</p>
                        </button>
                        {isPromptVisible ? (
                          <img
                            src={down}
                            alt=""
                            className="w-[30px] h-[30px] "
                          />
                        ) : (
                          <img
                            src={right}
                            alt=""
                            className="w-[30px] h-[30px] "
                          />
                        )}
                      </div>

                      {/* prompts text area work start */}
                      {isPromptVisible && (
                        <div className="my-2">
                          {/* +ve */}
                          <div className="border-2 flex flex-col items-end justify-end rounded border-gray-900 focus:border-gray-800 w-full">
                            <textarea
                              cols="30"
                              rows="4"
                              placeholder="positive prompts"
                              className="bg-transparent outline-none  w-full p-2 text-gray-200 overflow-scroll no-scrollbar"
                              onChange={(e) =>
                                handleTextRemainingCharacters(e.target.value)
                              }
                              maxLength={maxLimit}
                            />
                            <p className="remainingCharacters text-xs relative float-right mr-1.5 text-gray-500">
                              {remainingCharacters}/{maxLimit}
                            </p>
                          </div>
                          {/* -ve */}
                          <div className="border-2 flex flex-col items-end justify-end rounded border-gray-900 focus:border-gray-800 w-full mt-2">
                            <textarea
                              cols="30"
                              rows="4"
                              placeholder="negative prompts"
                              className="bg-transparent outline-none w-full p-2 text-gray-200 overflow-scroll no-scrollbar"
                              onChange={(e) =>
                                handleTextRemainingCharacters(
                                  e.target.value,
                                  true
                                )
                              }
                              maxLength={maxLimit}
                            />
                            <p className="remainingCharacters text-xs relative float-right mr-1.5 text-gray-500">
                              {nRemainingCharacters}/{maxLimit}
                            </p>
                          </div>
                        </div>
                      )}
                      {/* prompts text area work end */}
                    </div>
                    {/* prompt end */}

                    {/* settings tools start */}
                    <div className="w-full bg-gray-950 h-fit rounded mb-3 p-3 overflow-scroll no-scrollbar">
                      {/* button settings close open */}
                      <div className="flex items-center justify-between px-2 mb-2 rounded border-indigo-900 border-2">
                        <button
                          className="flex border-0 w-full p-2 text-lg tracking-wide items-center justify-start text-gray-200"
                          onClick={(e) => {
                            Toggle("setting");
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20px"
                            viewBox="0 0 512 512"
                            fill="#f9fafb"
                            className="mr-2"
                          >
                            <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
                          </svg>
                          <p className="tracking-wide font-poppins">Tools</p>
                        </button>
                        {isSettingVisible ? (
                          <img
                            src={down}
                            alt=""
                            className="w-[30px] h-[30px] "
                          />
                        ) : (
                          <img
                            src={right}
                            alt=""
                            className="w-[30px] h-[30px] "
                          />
                        )}
                      </div>
                      {/* tools */}
                      {isSettingVisible && (
                        <div className="">
                          {/* Prompt start */}
                          <div className="mb-1 mt-4 flex h-6 w-full justify-between items-center">
                            <p className=" m-4 ml-1 w-[25vw] text-gray-300 tracking-normal text-[.9rem]">
                              Prompt Weight
                            </p>
                            <input
                              type="range"
                              name=""
                              id="Prompt"
                              className="py-0.5 h-[2px] mr-4 m-2 bg-transparent border-0 text-white w-[80%]"
                              min="1"
                              max="50"
                              value={promptWeight}
                              onChange={(e) => handleRangeChange("prompt", e)}
                            />
                            <p className="text-gray-300 border w-[3.5rem] text-center border-gray-600 rounded ">
                              {promptWeight}
                            </p>
                          </div>

                          {/* control start */}
                          <div className="mb-1 my-3 flex h-6 w-full justify-between items-center">
                            <p className=" m-4 ml-1 w-[25vw] text-gray-300 tracking-normal text-[.9rem]">
                              Control Weight
                            </p>

                            <input
                              type="range"
                              name=""
                              id="ControlWeight_"
                              className="py-0.5 h-[2px] mr-4 m-2 bg-transparent border-0 text-white w-[80%]"
                              step="0.1"
                              min="0"
                              max="1"
                              value={ControlWeight}
                              onChange={(e) => handleRangeChange("control", e)}
                            />
                            <p className="text-gray-300 border w-[3.5rem] text-center border-gray-600 rounded ">
                              {ControlWeight}
                            </p>
                          </div>

                          {/* no of image start */}
                          <div className="mb-1 my-3 flex h-6 w-full justify-between items-center">
                            <p className=" m-4 ml-1 w-[25vw] text-gray-300 tracking-normal text-[.9rem]">
                              Numbers of Images
                            </p>
                            <input
                              type="range"
                              name=""
                              id="ImagesNos_"
                              className="py-0.5 h-[2px] mr-4 m-2 bg-transparent border-0 text-white w-[80%]"
                              min="0"
                              max="2"
                              value={ImagesNosCount}
                              onChange={(e) =>
                                handleRangeChange("ImagesNos", e)
                              }
                            />
                            <p className="text-gray-300 border w-[3.5rem] text-center border-gray-600 rounded ">
                              {ImagesNosCount}
                            </p>
                          </div>

                          {/* image changes from original */}
                          <div className="mb-1 my-3 flex h-6 w-full justify-between items-center">
                            <p className=" m-4 ml-1 w-[25vw] text-gray-300 tracking-normal text-[.9rem]">
                              Similarity
                            </p>
                            <input
                              type="range"
                              name=""
                              id="ImagesChange"
                              className="py-0.5 h-[2px] mr-4 m-2 bg-transparent border-0 text-white w-[80%]"
                              min="0"
                              max="100"
                              value={ImagesChange}
                              onChange={(e) =>
                                handleRangeChange("ImagesChange", e)
                              }
                            />
                            <p className="text-gray-300 border w-[3.5rem] text-center border-gray-600 rounded ">
                              {ImagesChange}
                            </p>
                          </div>

                          {/* settings options end */}

                          {/* seed start */}
                          <div className="mb-1 mt-2 flex items-center justify-between w-full open-sans md:hidden sm:flex lg:flex 2xl:flex">
                            <p className="text-[0.9rem] text-gray-300 ml-1.5">
                              Seed
                            </p>
                            <input
                              type="number"
                              name=""
                              className="w-[25%] 2xl:w-[5vw] pl-1 bg-transparent ml-[20%] 2xl:ml-[43%] 2xl:mr-4 h-8 border-2 border-gray-800 text-white border-b-2 md:mb-2 border-gray-910 border-t-0 border-l-0 border-r-0 outline-none"
                              placeholder="Default -1"
                              id="resetButton"
                              value={seed}
                            />
                            <button
                              className=" font-semibold border-2 transition duration-150 ease-in-out hover:text-gray-900 rounded border-gray-900 text-gray-900 bg-gray-900 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 2xl:mr-2"
                              onClick={handleRandom}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="15px"
                                viewBox="0 0 512 512"
                                fill="#6d6d6f"
                              >
                                <path d="M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160H352c-10.1 0-19.6 4.7-25.6 12.8L284 229.3 244 176l31.2-41.6C293.3 110.2 321.8 96 352 96h32V64c0-12.9 7.8-24.6 19.8-29.6zM164 282.7L204 336l-31.2 41.6C154.7 401.8 126.2 416 96 416H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c10.1 0 19.6-4.7 25.6-12.8L164 282.7zm274.6 188c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V416H352c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8h32V320c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z"></path>
                              </svg>
                            </button>

                            <button
                              className="font-semibold mr-1 2xl:mr-1 border-2 transition duration-150 ease-in-out rounded border-gray-900 bg-gray-900 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                              onClick={() => handleReset("seed")}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="13px"
                                viewBox="0 0 512 512"
                                fill="#828487"
                              >
                                <path d="M205 34.8c11.5 5.1 19 16.6 19 29.2v64H336c97.2 0 176 78.8 176 176c0 113.3-81.5 163.9-100.2 174.1c-2.5 1.4-5.3 1.9-8.1 1.9c-10.9 0-19.7-8.9-19.7-19.7c0-7.5 4.3-14.4 9.8-19.5c9.4-8.8 22.2-26.4 22.2-56.7c0-53-43-96-96-96H224v64c0 12.6-7.4 24.1-19 29.2s-25 3-34.4-5.4l-160-144C3.9 225.7 0 217.1 0 208s3.9-17.7 10.6-23.8l160-144c9.4-8.5 22.9-10.6 34.4-5.4z"></path>
                              </svg>
                            </button>
                          </div>
                          {/* seed end */}
                        </div>
                      )}
                    </div>
                    {/* settings tools end */}

                    {/* generated image view start */}
                    <div className="w-full bg-gray-950 h-fit rounded p-3 overflow-scroll no-scrollbar">
                      {/* button */}
                      <div className="flex items-center justify-between px-2 mb-2 rounded border-indigo-900 border-2">
                        <button
                          className="flex border-0 w-full p-2 text-lg tracking-wide items-center justify-start text-gray-200"
                          onClick={(e) => {
                            Toggle("generated");
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20px"
                            viewBox="0 0 576 512"
                            fill="#f0f2f4"
                            className="mt-1.5 mr-2"
                          >
                            <path d="M160 32c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160zM396 138.7l96 144c4.9 7.4 5.4 16.8 1.2 24.6S480.9 320 472 320H328 280 200c-9.2 0-17.6-5.3-21.6-13.6s-2.9-18.2 2.9-25.4l64-80c4.6-5.7 11.4-9 18.7-9s14.2 3.3 18.7 9l17.3 21.6 56-84C360.5 132 368 128 376 128s15.5 4 20 10.7zM192 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120V344c0 75.1 60.9 136 136 136H456c13.3 0 24-10.7 24-24s-10.7-24-24-24H136c-48.6 0-88-39.4-88-88V120z" />
                          </svg>
                          <p className="tracking-wide font-poppins">
                            Generated Image
                          </p>
                        </button>
                        {isGeneratedVisible ? (
                          <img
                            src={down}
                            alt=""
                            className="w-[30px] h-[30px] "
                          />
                        ) : (
                          <img
                            src={right}
                            alt=""
                            className="w-[30px] h-[30px] "
                          />
                        )}
                      </div>

                      {/* images */}
                      {/* loader and image generations */}

                      {isGeneratedVisible && (
                        <>
                          {isGenerating === true ? (
                            <div className="flex items-center justify-center my-20">
                              <div className="loader"></div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-3 rounded p-2">
                              {image.map((imag, i) => (
                                <img
                                  key={i}
                                  src={imag}
                                  alt=""
                                  className="w-[200px] h-[200px] border rounded "
                                  onClick={() => showImage(imag)}
                                />
                              ))}
                            </div>
                          )}
                        </>
                      )}

                      {/* <div className="grid grid-cols-2 gap-3 rounded p-2">
                        {image.map((imag, i) => (
                          <img
                            key={i}
                            src={imag}
                            alt=""
                            className="w-[200px] h-[200px] border rounded "
                            onClick={() => {
                              showImage(imag), (imageData = imag);
                            }}
                          />
                        ))}
                      </div> */}
                    </div>
                    {/* generated image view end */}
                  </div>
                </div>

                {/* generate button start */}
                <button
                  className="border-2 flex items-center justify-center relative border-purple-900 hover:border-purple-950 w-full p-1 mt-3 rounded text-gray-200 tracking-wide text-lg hover:bg-purple-900 transition-all bg-purple-950"
                  onClick={generate}
                >
                  <div className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="20"
                      fill="none"
                      className="mr-2"
                    >
                      <path
                        d="M13.72 8.386l.54 2.239c.124.515.387.961.755 1.307s.844.593 1.392.709l2.384.507c.229.048.372.262.321.476-.037.155-.166.269-.321.302l-2.384.507a2.9 2.9 0 0 0-1.392.709c-.367.346-.631.792-.755 1.307l-.54 2.239c-.051.215-.279.35-.507.302-.165-.035-.286-.156-.321-.302l-.54-2.239a2.62 2.62 0 0 0-.755-1.307c-.369-.346-.844-.593-1.391-.71l-2.385-.507c-.229-.048-.373-.262-.321-.477.037-.155.166-.269.321-.302l2.384-.507a2.9 2.9 0 0 0 1.392-.709c.367-.346.631-.792.755-1.307l.54-2.239c.051-.215.279-.35.507-.302.165.035.287.156.321.302zm2.492-7.074l.249 1.035a1.02 1.02 0 0 0 .297.508 1.12 1.12 0 0 0 .523.262l1.102.234c.229.048.373.262.321.476-.037.155-.166.269-.322.302l-1.102.234c-.21.045-.392.139-.532.27s-.241.304-.288.5l-.25 1.035c-.051.215-.279.35-.507.302-.165.035-.287.156-.321.302l-.25-1.035c-.047-.197-.148-.368-.287-.5a1.12 1.12 0 0 0-.532-.27l-1.102-.234c-.229-.048-.373-.262-.321-.476.037-.155.166-.269.322-.302l1.102-.234a1.12 1.12 0 0 0 .54-.279 1.01 1.01 0 0 0 .279-.491l.25-1.035c.051-.215.279-.35.507-.302.165.035.287.156.321.302zM7.133 3.007l.38 1.576a1.73 1.73 0 0 0 .498.862l.018.018c.24.218.547.375.9.45l1.678.356c.229.048.372.262.321.476-.037.155-.166.269-.321.302l-1.678.357c-.362.077-.675.24-.918.467s-.415.523-.497.863l-.38 1.576c-.051.215-.279.35-.507.302-.165-.035-.287-.156-.321-.302l-.38-1.576a1.73 1.73 0 0 0-.498-.862c-.243-.228-.556-.391-.917-.468l-1.678-.357c-.229-.048-.373-.262-.321-.476.037-.155.166-.269.321-.302l1.678-.356a1.91 1.91 0 0 0 .917-.468l.019-.017a1.73 1.73 0 0 0 .479-.845l.38-1.576c.051-.215.279-.35.507-.302.165.035.287.156.321.302z"
                        fill="currentColor"
                      />
                    </svg>
                    <p>Generate</p>
                  </div>

                  <p className="absolute border border-gray-500 flex items-center justify-center rounded w-fit h-fit p-1 px-2 text-xs ml-[24vw]">
                    01
                  </p>
                </button>
                {/* generate button end */}
              </div>
            )}
            {/* side bar end*/}

            {/* project part start */}
            {showProject && <ProfileDashboard />}
            {/* project part end */}
          </div>
        </div>
      </main>
    </>
  );
};

export default ImageGeneration;
