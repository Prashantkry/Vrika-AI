import React, { useState } from "react";
import { useSelector } from "react-redux";

export const Plans = () => {
  const [btn, setBtn] = useState("Yearly");

  // TODO add email to stripe checkout session

  const EmailId = useSelector((state) => state.Login.Email);
  console.log("EmailId -> ", EmailId);
  const userId = useSelector((state) => state.Login.UserId);
  console.log(userId);

  const handlePayment = async () => {
    const paymentData = await fetch("http://localhost:5000/api/v1/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        EmailId_: EmailId,
      },
    });
  };

  return (
    <div
      className="
                2xl:container 2xl:mx-auto
                py-12
                px-4
                md:px-6
                xl:px-12
                flex flex-col
                justify-center
                items-center
                xl:h-[84vh]
                bg-gray-950
            "
    >
      {/* title */}
      <h1
        className="
                    text-xl
                    md:text-2xl
                    lg:text-4xl
                    font-bold
                    lg:font-extrabold
                    leading-6
                    md:leading-8
                    lg:leading-10
                    text-center text-indigo-500
                    w-2/3
                "
      >
        Plans for Vrika AI
      </h1>

      {/* Content start */}
      <div
        className="
                    mt-7
                    md:mt-10
                    lg:mt-12
                    md:flex-row
                    flex-col flex
                    justify-center
                    items-start
                    space-y-6
                    md:space-y-0 md:space-x-6
                    lg:space-x-8
                "
      >
        {/* Monthly price plan */}
        <div
          className="
                        w-80
                        md:w-auto
                        border
                        rounded
                        border-indigo-600
                        py-6
                        px-10
                        md:px-12
                        xl:px-16
                    "
        >
          <div className="w-64 flex justify-center items-center flex-col">
            <div
              className="
                                flex
                                w-full
                                justify-center
                                items-center
                                flex-col
                                space-y-6
                                lg:space-y-4
                            "
            >
              <p
                className="
                                    text-base
                                    lg:text-lg
                                    font-medium
                                    leading-6
                                    text-center text-gray-800
                                "
              >
                Monthly Plans
              </p>
              <div
                className="
                                    flex
                                    justify-center
                                    items-center
                                    space-x-1
                                "
              >
                <p className="text-base leading-4 text-gray-800">₹</p>
                <p
                  className="
                                        text-2xl
                                        lg:text-4xl
                                        font-medium
                                        leading-6
                                        lg:leading-9
                                        text-center text-indigo-700
                                    "
                >
                  999
                </p>
                <p
                  className="
                                        text-base
                                        font-bold
                                        leading-4
                                        text-gray-600
                                    "
                >
                  /mo
                </p>
              </div>
            </div>

            <div
              className="
                                mt-10
                                lg:mt-8
                                flex flex-col
                                w-full
                                justify-start
                                items-start
                                space-y-6
                            "
            >
              <div
                className="
                                    flex
                                    justify-center
                                    items-center
                                    space-x-2
                                "
              >
                <img
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/pricing_5_svg1.svg"
                  alt="indigo tick"
                />
                <p className="text-sm leading-none text-gray-600">
                  Unlimited Generations based <br /> on tokens left
                </p>
              </div>

              <div
                className="
                                    flex
                                    justify-center
                                    items-center
                                    space-x-2
                                "
              >
                <img
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/pricing_5_svg1.svg"
                  alt="indigo tick"
                />
                <p className="text-sm leading-none text-gray-600">
                  Customer Support
                </p>
              </div>
            </div>
            <a
              href={`https://buy.stripe.com/test_dR628tcxSdE54V28wJ?prefilled_email=${EmailId}&client_reference_id=${userId}&line_items`}
              target="blank"
            >
              <button
                onClick={handlePayment}
                className=" mt-12 lg:mt-16 py-3 px-20 bg-indigo-700 hover:bg-indigo-600 focus:bg-indigo-800 rounded text-base font-medium leading-4 text-white"
              >
                Buy
              </button>
            </a>
          </div>
        </div>

        {/* Yearly price plan */}
        <div
          className="
                        w-80
                        md:w-auto
                        border
                        rounded
                        border-indigo-600
                        py-6
                        px-10
                        md:px-12
                        xl:px-16
                    "
        >
          <div className="w-64 flex justify-center items-center flex-col">
            <div
              className="
                                flex
                                w-full
                                justify-center
                                items-center
                                flex-col
                                space-y-6
                                lg:space-y-4
                            "
            >
              <p
                className="
                                    text-base
                                    lg:text-lg
                                    font-medium
                                    leading-6
                                    text-center text-gray-800
                                "
              >
                Yearly Plans
              </p>
              <div
                className="
                                    flex
                                    justify-center
                                    items-center
                                    space-x-1
                                "
              >
                <p className="text-base leading-4 text-gray-800">₹</p>
                <p
                  className="
                                        text-2xl
                                        lg:text-4xl
                                        font-medium
                                        leading-6
                                        lg:leading-9
                                        text-center text-indigo-700
                                    "
                >
                  10999
                </p>
                <p
                  className="
                                        text-base
                                        font-bold
                                        leading-4
                                        text-gray-600
                                    "
                >
                  /y
                </p>
              </div>
            </div>

            <div
              className="
                                mt-10
                                lg:mt-8
                                flex flex-col
                                w-full
                                justify-start
                                items-start
                                space-y-6
                            "
            >
              <div
                className="
                                    flex
                                    justify-center
                                    items-center
                                    space-x-2
                                "
              >
                <img
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/pricing_5_svg1.svg"
                  alt="indigo tick"
                />
                <p className="text-sm leading-none text-gray-600">
                  Unlimited Generations based <br /> on tokens left
                </p>
              </div>
              <div
                className="
                                    flex
                                    justify-center
                                    items-center
                                    space-x-2
                                "
              >
                <img
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/pricing_5_svg1.svg"
                  alt="indigo tick"
                />
                <p className="text-sm leading-none text-gray-600">
                  Customer Support
                </p>
              </div>
            </div>
            <a
              href={`https://buy.stripe.com/test_dR614p8hC7fH4V25ky?prefilled_email=${EmailId}&client_reference_id=${userId}&line_items`}
              target="blank"
            >
              <button
                onClick={handlePayment}
                className=" mt-12 lg:mt-16 py-3 px-20 bg-indigo-700 hover:bg-indigo-600 focus:bg-indigo-800 rounded text-base font-medium leading-4 text-white"
              >
                Buy
              </button>
            </a>
          </div>
        </div>
      </div>
      {/* end */}
    </div>
  );
};
