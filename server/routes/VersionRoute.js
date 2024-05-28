const express = require("express");
const versionRoute = express.Router();

const ImageRouter = require("./generateImage");
versionRoute.use("/generateImage", ImageRouter);

const CreateUserRoutes = require("./CreateUserRoutes");
const LogInUserRoutes = require("./LogInUserRoutes");
versionRoute.use("/signUp", CreateUserRoutes);
versionRoute.use("/signIn", LogInUserRoutes);

const verifyAuthRoute = require("./checkAuth");
versionRoute.use("/generateImageT3DM", verifyAuthRoute);

const paymentRoute = require("./subscriptionsRoute");
versionRoute.use("/payment", paymentRoute);

const getProductRouter = require("./ProfileDataRoute");
versionRoute.use("/getProfileData", getProductRouter);

const getProductCreditsRouter = require("./ProfileRouteCredits");
versionRoute.use("/getProfileDataCredits", getProductCreditsRouter);

const GetAllGeneratedImagesRouter = require("./getAllGeneratedImages");
versionRoute.use("/getAllGeneratedImagesData", GetAllGeneratedImagesRouter);

const saveGeneratedImageDataR = require("./saveGeneratedImageDataR");
versionRoute.use("/saveGeneratedImageData", saveGeneratedImageDataR);

const getCustomerPortalR = require('./getCustomerPortalR')
versionRoute.use('/getCustomerPortalR', getCustomerPortalR)

module.exports = versionRoute;