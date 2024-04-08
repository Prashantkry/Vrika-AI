import "../App.css";
const Home = () => {
  function handleMouseEnter() {
    let showHide = document.getElementById("showHide");
    showHide.style.display = "block";
  }
  function handleMouseLeave() {
    let showHide = document.getElementById("showHide");
    setTimeout(() => {
      showHide.style.display = "none";
    }, 500);
  }
  return (
    <>
      <main>
        <div className="relative w-full h-[92vh] bg-slate-950">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative flex flex-col items-center justify-center">
            {/* title */}
            <h1 className="alex-brush-regular animate-text-gradient bg-gradient-to-r from-[#6c5fc9] via-[#8678f9] to-[#695cc9] bg-[200%_auto] pt-20 px-12 border-0 bg-clip-text text-transparent text-7xl font-bold text-center text-purple-950 md:text-[190px]">
              <span className="lovers-quarrel-regular text-[250px]">V</span>
              <span className="arizonia_regular">rika</span>{" "}
              <span className="lovers-quarrel-regular text-[250px]">A</span>
              <span className="arizonia_regular">I</span>
            </h1>

            {/* supporting content */}
            <p className="text-center text-2xl text-indigo-900 border-0 p-10 py-1">
              AI tools for designers and architects of future generations
            </p>
            <div className="flex items-center justify-around text-indigo-800 text-2xl font-bold tracking-wide w-full px-[30vw] mt-7 text-center">
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  fill="indigo"
                  className="w-[30px] h-[30px] mr-3 "
                >
                  <path d="M297.2 248.9C311.6 228.3 320 203.2 320 176c0-70.7-57.3-128-128-128S64 105.3 64 176c0 27.2 8.4 52.3 22.8 72.9c3.7 5.3 8.1 11.3 12.8 17.7l0 0c12.9 17.7 28.3 38.9 39.8 59.8c10.4 19 15.7 38.8 18.3 57.5H109c-2.2-12-5.9-23.7-11.8-34.5c-9.9-18-22.2-34.9-34.5-51.8l0 0 0 0c-5.2-7.1-10.4-14.2-15.4-21.4C27.6 247.9 16 213.3 16 176C16 78.8 94.8 0 192 0s176 78.8 176 176c0 37.3-11.6 71.9-31.4 100.3c-5 7.2-10.2 14.3-15.4 21.4l0 0 0 0c-12.3 16.8-24.6 33.7-34.5 51.8c-5.9 10.8-9.6 22.5-11.8 34.5H226.4c2.6-18.7 7.9-38.6 18.3-57.5c11.5-20.9 26.9-42.1 39.8-59.8l0 0 0 0 0 0c4.7-6.4 9-12.4 12.7-17.7zM192 128c-26.5 0-48 21.5-48 48c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-44.2 35.8-80 80-80c8.8 0 16 7.2 16 16s-7.2 16-16 16zm0 384c-44.2 0-80-35.8-80-80V416H272v16c0 44.2-35.8 80-80 80z" />
                </svg>
                Astute
              </div>
              <span className=" text-indigo-950 text-2xl font-normal">|</span>
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="indigo"
                  className="w-[30px] h-[30px] mr-3 "
                >
                  <path d="M156.6 384.9L125.7 354c-8.5-8.5-11.5-20.8-7.7-32.2c3-8.9 7-20.5 11.8-33.8L24 288c-8.6 0-16.6-4.6-20.9-12.1s-4.2-16.7 .2-24.1l52.5-88.5c13-21.9 36.5-35.3 61.9-35.3l82.3 0c2.4-4 4.8-7.7 7.2-11.3C289.1-4.1 411.1-8.1 483.9 5.3c11.6 2.1 20.6 11.2 22.8 22.8c13.4 72.9 9.3 194.8-111.4 276.7c-3.5 2.4-7.3 4.8-11.3 7.2v82.3c0 25.4-13.4 49-35.3 61.9l-88.5 52.5c-7.4 4.4-16.6 4.5-24.1 .2s-12.1-12.2-12.1-20.9V380.8c-14.1 4.9-26.4 8.9-35.7 11.9c-11.2 3.6-23.4 .5-31.8-7.8zM384 168a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
                </svg>
                Fast
              </div>
              <span className=" text-indigo-950 text-2xl font-normal">|</span>
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="indigo"
                  className="w-[30px] h-[30px] mr-3 "
                >
                  <path d="M320 488c0 9.5-5.6 18.1-14.2 21.9s-18.8 2.3-25.8-4.1l-80-72c-5.1-4.6-7.9-11-7.9-17.8s2.9-13.3 7.9-17.8l80-72c7-6.3 17.2-7.9 25.8-4.1s14.2 12.4 14.2 21.9v40h16c35.3 0 64-28.7 64-64V153.3C371.7 141 352 112.8 352 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V320c0 70.7-57.3 128-128 128H320v40zM456 80a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM192 24c0-9.5 5.6-18.1 14.2-21.9s18.8-2.3 25.8 4.1l80 72c5.1 4.6 7.9 11 7.9 17.8s-2.9 13.3-7.9 17.8l-80 72c-7 6.3-17.2 7.9-25.8 4.1s-14.2-12.4-14.2-21.9V128H176c-35.3 0-64 28.7-64 64V358.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V192c0-70.7 57.3-128 128-128h16V24zM56 432a24 24 0 1 0 48 0 24 24 0 1 0 -48 0z" />
                </svg>
                Accurate
              </div>
            </div>

            {/* button */}
            <button className="text-5xl font-bold text-indigo-500 p-6 w-fit px-10 border-2 border-purple-900 rounded my-12 flex items-center justify-around">
              Get Started for free
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="#553c9a"
                className="w-[30px] h-[30px] ml-3 mt-3"
              >
                <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
              </svg>
            </button>
            <p></p>
          </div>

          {/* help button */}
          <div className="relative border-0 w-[50vw] ">
            <button
              className="m-28 mt-3 border-0"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className=" w-[50px] h-[50px] ring-2 ring-purple-900 p-1.5 rounded-full"
              >
                <path
                  fill="#5e0eaf"
                  d="M267.7 471.5l10.6 15.8 5.3-12.3 5.3 7V512c21.1-7.9 21.1-66.9 25.5-97.2 4.6-31.9-.9-92.8 81.4-149.1-8.9-23.6-12-49.4-2.6-80.1C421 189 447 196.2 456.4 239.7l-30.4 8.4c11.2 23 17 46.8 13.2 72.1L412 313.2l-6.2 33.4-18.5-7-8.8 33.4-19.4-7 26.4 21.1 8.8-28.2L419 364.2l7-35.6 26.4 14.5c.3-20 7-58.1-8.8-84.5l26.4 5.3c4-22.1-2.4-39.2-7.9-56.7l22.4 9.7c-.4-25.1-29.9-56.8-61.6-58.5-20.2-1.1-56.7-25.2-54.1-51.9 2-19.9 17.5-42.6 43.1-49.7-44 36.5-9.7 67.3 5.3 73.5 4.4-11.4 17.5-69.1 0-130.2-40.4 22.9-89.7 65.1-93.2 147.8l-58 38.7-3.5 93.3L369.8 220l7 7-17.6 3.5-44 38.7-15.8-5.3-28.1 49.3-3.5 119.6 21.1 15.8-32.6 15.8-32.6-15.8 21.1-15.8-3.5-119.6-28.2-49.3-15.8 5.3-44-38.7-17.6-3.5 7-7 107.3 59.8-3.5-93.3-58.1-38.7C185 65.1 135.8 22.9 95.3 0c-17.5 61.1-4.4 118.8 0 130.2 15-6.2 49.3-37 5.3-73.5 25.7 7.1 41.2 29.8 43.1 49.7 2.6 26.7-33.9 50.8-54.1 51.9-31.7 1.7-61.2 33.4-61.6 58.5l22.4-9.7c-5.5 17.5-11.9 34.7-7.9 56.7l26.4-5.3c-15.8 26.4-9.1 64.4-8.8 84.5l26.4-14.5 7 35.6 24.6-5.3 8.8 28.2L153.4 366 134 373l-8.8-33.4-18.5 7-6.2-33.4-27.3 7c-3.8-25.4 2-49.1 13.2-72.1l-30.4-8.4c9.4-43.5 35.5-50.8 63.3-54.1 9.4 30.6 6.2 56.5-2.6 80.1 82.3 56.3 76.8 117.2 81.4 149.1 4.4 30.4 4.5 89.3 25.5 97.2v-29.8l5.3-7 5.3 12.3 10.6-15.8 11.4 21.1 11.4-21.1zm79.2-95L331.1 366c7.5-4.4 13.8-8.4 19.4-12.3-.6 7.2-.3 13.8-3.5 22.8zm28.2-49.3c-.4 10.9-.9 21.7-1.8 31.7-7.9-1.9-15.6-3.8-21.1-7 8.2-7.9 15.6-16.3 22.9-24.7zm24.6 5.3c0-13.4-2.1-24.2-5.3-33.4a235 235 0 0 1 -18.5 27.3zm3.5-80.9c19.4 12.8 27.8 33.7 29.9 56.3-12.3-4.5-24.6-9.3-37-10.6 5.1-12 6.7-28.1 7-45.7zm-1.8-45.7c.8 14.3 1.8 28.8 1.8 42.2 19.2-8.1 29.8-9.7 44-14.1-10.6-19-27.2-25.5-45.8-28.2zM165.7 376.5L181.5 366c-7.5-4.4-13.8-8.4-19.4-12.3 .6 7.3 .3 13.9 3.5 22.9zm-28.2-49.3c.4 10.9 .9 21.7 1.8 31.7 7.9-1.9 15.6-3.8 21.1-7-8.2-7.9-15.6-16.3-22.9-24.7zm-24.6 5.3c0-13.4 2-24.2 5.3-33.4a235 235 0 0 0 18.5 27.3zm-3.5-80.9c-19.4 12.8-27.8 33.7-29.9 56.3 12.3-4.5 24.6-9.3 37-10.6-5-12-6.7-28.1-7-45.7zm1.8-45.7c-.8 14.3-1.8 28.8-1.8 42.2-19.2-8.1-29.8-9.7-44-14.1 10.6-19 27.2-25.5 45.8-28.2z"
                />
              </svg>

              {/* content */}
              <div
                className="w-[30vw] h-[15vh] absolute border-0 bg-indigo-950 -mt-6 ml-16 rounded hidden"
                id="showHide"
              >
                <ul className=" text-left p-2">
                  <li className="text-center font-semibold text-gray-300">
                    Welcome Vrika AI
                  </li>
                  <li>
                    <a href="/">Help</a>
                  </li>
                </ul>
              </div>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
