import { useEffect, useState } from 'react'
// import { ProfileData } from './interfaceAll'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
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

let imageArray = [w1, w3, w4, w5, w2, a1, a2, a3, a4, a5];
let imageData
let customerId, dataOfImage

const ProfileDashboard = () => {
  const navigate = useNavigate()
  // taking userId from store redux 
  const UserID: string = useSelector((state) => state.Login.UserId)

  const [profileData, setProfileData] = useState(null);
  const [activeTab, setActiveTab] = useState("project");
  const [imagesGenerated, setImagesGenerated] = useState([])
  const [viewImage, setViewImage] = useState(null)

  useEffect(() => {
    const fetchProfileData = async () => {
      const ProfileFetchedData = await fetch('https://vrika-ai.onrender.com/api/v1/getProfileData', {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          UserID
        })
      })
      if (ProfileFetchedData.ok) {
        const data = await ProfileFetchedData.json();
        setProfileData(data.userData);

      } else {
        console.error('Failed to fetch profile data:', ProfileFetchedData.status, ProfileFetchedData.statusText);
      }
    }

    if (UserID) {
      fetchProfileData();
    }
  }, [])

  // ! get all generated images from mongo db start
  useEffect(() => {
    const generatedImages = async () => {
      console.log('trig')
      const res = await fetch('https://vrika-ai.onrender.com/api/v1/getAllGeneratedImagesData', {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          UserID
        })
      })

      const data = await res.json()
      // console.log(data)
      dataOfImage = data

      customerId = data.customerId


      // setImagesGenerated(data.allImages.flatMap(item => item.imagesData.flat())) // when images 
      const allImages = data.allImages.flatMap(item =>
        item.imagesData.flat().map(image => ({
          url: image,
          prompt: item.generationImageData.prompt,
          negativePrompt: item.generationImageData.negative_prompt,
          width: item.generationImageData.width,
          height: item.generationImageData.height,
          seed: item.generationImageData.seed,
          refineSteps: item.generationImageData.refine_steps,
          guidanceScale: item.generationImageData.guidance_scale,
          numInferenceSteps: item.generationImageData.num_inference_steps,
          controlnet1: item.generationImageData.controlnet_1,
          controlnet1Start: item.generationImageData.controlnet_1_start,
          controlnet1End: item.generationImageData.controlnet_1_end,
          controlnet1ConditioningScale: item.generationImageData.controlnet_1_conditioning_scale,
        }))
      );

      setImagesGenerated(allImages);
      // console.log('imagesGenerated', imagesGenerated)
    }
    if (UserID) {
      generatedImages();
    }
  }, [])

  // end

  // ! show images in big view 
  function showHideBigImage(index) {
    if (index === viewImage) {
      setViewImage(null);
    } else {
      setViewImage(index);
    }
  }
  // end


  // ! redirect to customer portal of payment management 
  async function redirectToUpgrade() {
    //   // window.location.href("https://billing.stripe.com/p/login/test_3cs6rlbZn7093PG9AA")
    console.log("customerId => ", customerId)
    let response = await fetch('https://vrika-ai.onrender.com/api/v1/getCustomerPortalR', {
      method: 'POST',
      body: JSON.stringify({ customerId }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log("response => ", response)
    let userStripeData = await response.json();
    console.log(userStripeData)
    let url = userStripeData.paymentResponse;
    console.log("customerPortal API response : ", url);
    window.open(url, '_blank');
    // window.location.href(url)
    // navigate(url)
  }

  return (
    <>
      <div className="border-0 border-indigo-900 rounded flex p-10 pt-5 m- my-6 text-gray-400 items-center justify-center w-[94vw] h-[90vh]">
        {/* user data */}
        {profileData !== null && (
          <div className='w-[24vw] h-full border-r border-gray-700 mr-3.5'>
            <div className='flex flex-col justify-center items-center'>
              <img src={profileData.pImage} alt="" className='w-[180px] h-[180px] rounded border border-gray-700 mt-4' />
              <div className='flex items-center justify-center'>
                <h1 className="text-2xl font-bold">{profileData.UserName}</h1>
                <p className='ml-3 mt-1 text-indigo-500'>
                  Pro
                </p>
              </div>
              <button className='bg-indigo-700 w-[60%] my-3 rounded py-2 ' onClick={redirectToUpgrade}>
                Upgrade Plan
              </button>
            </div>
            <div className='flex flex-col items-start justify-start text-sm ml-5 px-10 mt-5'>
              <h3 className="font-semibold tracking-wide leading-6 text-indigo-400"><span className='text-indigo-600'>Subscription - </span>{profileData.Subscriptions.product}</h3>
              <h3 className="font-semibold tracking-wide leading-6 text-indigo-400"><span className='text-indigo-600'>Subscription Status -</span> {profileData.Subscriptions.status ? 'Active' : 'Inactive'}</h3>
              <h3 className="font-semibold tracking-wide leading-6 text-indigo-400"><span className='text-indigo-600'>Subscription Price -</span> {profileData.Subscriptions.amount}</h3>
              <h3 className="font-semibold tracking-wide leading-6 text-indigo-400"><span className='text-indigo-600'>Start Date - </span> {new Date(profileData.Subscriptions.purchaseDate).toLocaleDateString()}</h3>
              <h3 className="font-semibold tracking-wide leading-6 text-indigo-400"><span className='text-indigo-600'>Expiry Date - </span> {new Date(profileData.Subscriptions.expiryDate).toLocaleDateString()}</h3>
              <h3 className="font-semibold tracking-wide leading-6 text-indigo-400"><span className='text-indigo-600'>Token - </span> {profileData.Subscriptions.token}</h3>
            </div>
            {/* <button>Edit Profile</button> */}
          </div>
        )}

        {/* images created */}
        <div className='w-[70vw] h-full'>
          {/* navbar */}
          <div className="h-[8vh] w-full border-0 flex items-center justify-between ">
            <div className="flex items-center justify-around p-1 bg-gray-950 relative">
              <button
                className={`mr-2 p-1 px-3 rounded tracking-wide ${activeTab === "project" ? "text-purple-800" : ""
                  }`}
              >
                Dashboard
              </button>
              <p
                className={`mr-2 p-1 px-3 rounded tracking-wide ${activeTab === "favorite" ? "text-purple-800" : ""
                  }`}
              >
                All Generated Images
              </p>
            </div>
            <input
              type="text"
              className=" w-[17vw] h-[4vh] px-1 placeholder-slate-700 bg-transparent outline-none border border-gray-600 rounded "
              placeholder="Search images"
            />
          </div>

          {/* content */}
          <div className="w-full h-[90vh] ">
            <div className="w-full h-[75vh] border-t border-gray-700 grid xl:grid-cols-3 gap-3 p-10 z-30 overflow-scroll no-scrollbar">
              {
                dataOfImage ? (
                  imagesGenerated.map((e, i) => (
                    <div
                      key={i}
                      className=" h-[300px] border p-2 rounded-xl border-gray-800"
                    >
                      <img
                        src={e.url}
                        alt=""
                        className=" rounded-xl w-full h-full"
                        onClick={() => showHideBigImage(i)}
                      />
                    </div>
                  ))
                ) : (
                  <div className="loader"></div>
                )
              }

              {/* big view of images pop model*/}
              {viewImage !== null && (
                <div className='absolute inset-0 flex items-center justify-center m-5 p-2 w-[90%] h-[90%] mx-auto my-auto rounded bg-gray-950 border-2 border-gray-900' onClick={() => showHideBigImage(viewImage)}>
                  <img src={imagesGenerated[viewImage].url} alt="" className='w-[70%] h-full rounded' id='viewImages' />
                  <div className="w-[29%] h-full">

                    {/* content data */}
                    <div className="w-full h-full p-5 text-xs">
                      <h3 className="font-bold text-indigo-600 text-sm mb-1">Prompt:</h3>
                      <p className='ml-2 mb-1'>{imagesGenerated[viewImage].prompt}</p>
                      <h3 className="font-bold text-indigo-600 text-sm mb-1">Negative Prompt:</h3>
                      <p className='ml-2 mb-1'>{imagesGenerated[viewImage].negativePrompt}</p>
                      <h3 className="font-bold text-indigo-600 text-sm mb-1">Dimensions:</h3>
                      <p className='ml-2 mb-1'>{imagesGenerated[viewImage].width} x {imagesGenerated[viewImage].height}</p>
                      <h3 className="font-bold text-indigo-600 text-sm mb-1">Seed:</h3>
                      <p className='ml-2 mb-1'>{imagesGenerated[viewImage].seed}</p>
                      <h3 className="font-bold text-indigo-600 text-sm mb-1">Refine Steps:</h3>
                      <p className='ml-2 mb-1'>{imagesGenerated[viewImage].refineSteps}</p>
                      <h3 className="font-bold text-indigo-600 text-sm mb-1">Guidance Scale:</h3>
                      <p className='ml-2 mb-1'>{imagesGenerated[viewImage].guidanceScale}</p>
                      <h3 className="font-bold text-indigo-600 text-sm mb-1">Inference Steps:</h3>
                      <p className='ml-2 mb-1'>{imagesGenerated[viewImage].numInferenceSteps}</p>
                      <h3 className="font-bold text-indigo-600 text-sm mb-1">Controlnet 1:</h3>
                      <p className='ml-2 mb-1'>{imagesGenerated[viewImage].controlnet1}</p>
                      <h3 className="font-bold text-indigo-600 text-sm mb-1">Controlnet 1 Start:</h3>
                      <p className='ml-2 mb-1'>{imagesGenerated[viewImage].controlnet1Start}</p>
                      <h3 className="font-bold text-indigo-600 text-sm mb-1">Controlnet 1 End:</h3>
                      <p className='ml-2 mb-1'>{imagesGenerated[viewImage].controlnet1End}</p>
                      <h3 className="font-bold text-indigo-600 text-sm mb-1">Controlnet 1 Conditioning Scale:</h3>
                      <p className='ml-2 mb-1'>{imagesGenerated[viewImage].controlnet1ConditioningScale}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileDashboard