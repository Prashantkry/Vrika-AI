const UserSchema = require("../model/UserSchema");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ! when sign up
const signUpController = async (req, res) => {
  // console.log("triggered signUp");
  const { Name, Email, Password, Phone, image } = req.body;
  // console.log("Name -> ", Name, "Email -> ", Email, "Password -> ", Password, "Phone -> ", Phone, "image -> ", image);

  try {
    // if account already exists
    const alreadyAccount = await UserSchema.findOne({ email: Email });
    if (alreadyAccount) {
      return res.status(400).json({ message: "User already exists" });
    }

    // saving data to mongo db if account not exists
    const signUpData = new UserSchema({
      // creating new instance of user details
      UserId: "",
      googleId: "",
      email: Email,
      name: Name,
      phone: Phone,
      password: Password,
      jwtToken: "",
      jwtRefreshToken: "",
      Image: image.myFile,
      Subscription: {
        product: "",
        status: false,
        purchaseDate: "",
        expiryDate: "",
        token: 0,
        amount: 0,
      },
    });

    // ! data processing like encrypting password jwt token
    // creating unique UserId
    let guid = "";
    function generateGUID() {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 32; i++) {
        const index = Math.floor(Math.random() * chars.length);
        guid += chars.charAt(index);
        if (i === 7 || i === 11 || i === 15 || i === 19) {
          guid += "";
        }
      }
      return guid;
    }
    signUpData.UserId = generateGUID();

    // * encrypting password
    const encyPassword = await bcrypt.hash(Password, 10); // 10 here means no of rotations to encrypt password
    signUpData.password = encyPassword;
    // signUpData.password = undefined; // this will be not sent in frontend as response

    // ! end

    await signUpData.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("Error -> ", error);
    return res.status(500).json({ message: "Error in signUp" });
  }
};
// * end

// !  when login
const LoginController = async (req, res) => {
  console.log("triggered api sign in");
  const body = req.body;
  // console.log("body -> ", body);
  const { Email, Password } = body;

  const userData = await UserSchema.findOne({ email: Email });
  // console.log(userData);
  if (userData && (await bcrypt.compare(Password, userData.password))) {
    console.log("Correct Credential");

    // * creating jwt token
    const accessToken = jwt.sign(
      {
        // accept payload & secret key
        id: userData._id,
        email: Email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // 1d => 1 day || 2h can be many after that token will expire
    );
    // console.log(accessToken);

    // refresh jwt token
    const refreshJWTToken = jwt.sign(
      {
        id: userData._id,
        email: Email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // updating jwt token in user database
    const updateQuery = {
      $set: {
        jwtToken: accessToken,
        jwtRefreshToken: refreshJWTToken,
      },
    };
    const updateRes = await UserSchema.updateOne(
      {
        _id: userData._id,
      },
      updateQuery
    );
    // console.log(updateRes);

    // * cookie work handled here start
    const options = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // durations -> 1 * 24 * 60 * 60 * 1000  days,hrs,min,sec,miliSec
      // expires: new Date(Date.now() + 300000), // durations -> 1 * 24 * 60 * 60 * 1000  days,hrs,min,sec,miliSec
      httpOnly: false, // true -> make cookie secure or encrypted & can be manipulated by server not by user
    };

    const rOptions = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: false,
      secure: true,
      sameSite: "strict",
    };

    res.cookie("refreshJWTToken", refreshJWTToken, rOptions);
    res.cookie("accessToken", accessToken, options);
    return res.json({
      success: true,
      message: "Login Successful",
      UserId: userData.UserId,
      UserEmail: userData.Email,
    });

    // * end
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Enter valid email or password" });
  }
};
// * end

// ! for private verification of token
const verifyUser = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    if (renewToken(req, res)) {
      next();
    }
  } else {
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ valid: false, message: "Invalid Token" });
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};

const renewToken = (req, res) => {
  const refreshJWTToken = req.cookies.refreshJWTToken;
  let exist = false;
  if (!refreshJWTToken) {
    return res.json({ valid: false, message: "No refresh token" });
  } else {
    jwt.verify(refreshJWTToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ valid: false, message: "Invalid refresh Token" });
      } else {
        const accessToken = jwt.sign({ email: decoded.email }, "accessToken", {
          expiresIn: "h",
        });
        res.cookie("accessToken", accessToken);
        exist = true;
      }
    });
  }
  return exist;
};
// * end

// ! making routes protected
const verifyAuth = async (req, res) => {
  return res.json({ valid: true, message: "authorized" });
};
// * end

module.exports = { signUpController, LoginController, verifyAuth, verifyUser };
