import { config } from "dotenv";
config();
import AppError from "../utils/error.utils.js";
import User from "../model/user.models.js";
import cloudinary from "cloudinary";
import sendEmail from "../utils/sendEmail.js";
import fs from "fs";
import crypto from "crypto";
import { userInfo } from "os";
import bcrypt from "bcryptjs";
import { runInNewContext } from "vm";
import { request } from "http";
import { response } from "express";
const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
};
const register = async (req, res, next) => {
  try {
    {
      //     return res.status(400).json({
      //         success:false
      //     })
      const { fullName, password, email } = req.body;
      // console.log(fullName, password, email);
      if (!fullName || !password || !email) {

        return next(
          new AppError("All fields are required for registration of users", 400)
        );
      }

      const userExists = await User.findOne({
        email,
      });

      if (userExists) {
        return next(new AppError("Email already exists", 400));
      }

      const user = await User.create({
        fullName,
        password,
        email,
        //adding deafalt if user not give
        avatar: {
          public_id: email,
          secure_url:
            "https://cdn.pixabay.com/photo/2023/08/10/03/39/woman-8180638_1280.jpg",
        },
      });
      console.log('registerfasdlkjflk');

      if (!user) {
        return next(new AppError("user registration failed,try again", 400));
      }
      // console.log(req.file);
      // if (req.file) {
      //   try {
      //     if (req.file) {
      //       const result = await cloudinary.v2.uploader.upload(req.file.path, {
      //         folder: "lms",
      //         width: "250",
      //         height: "250",
      //         gravity: "faces",
      //         crop: "fill",
      //       });
      //       if (result) {
      //         user.avatar.public_id = result.public_id;
      //         user.avatar.secure_url = result.secure_url;
      //       }
      //     }
      //     fs.unlink(req.file.path, (err) => {
      //       if (err) {
      //         throw err;
      //       }

      //       console.log("File is deleted.");
      //     });
      //   } catch (error) {
      //     return next(new AppError("file not found", 400));
      //   }
      // }

      await user.save();
      const token = await user.generateJWTToken();
      console.log(token);
      user.password = undefined;
      res.cookie("token", token, cookieOptions);
      res.status(200).json({
        success: true,
        message: "user registered successfully on website",
        data: user,
      });
    }
  } catch (error) {
    console.log('errorjfaksdkf');
    res.status(500).json({
      success: true,
      message: "failed signup",
    });
  }
};

const login = async function (req, res, next) {
  

  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return next(new AppError("email or password is required", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    // console.log(user);
    user.comparePassword(password, async function (err, isMatch) {
      // console.log("error", err, "pass", isMatch);
      if (!isMatch) {
        // console.log(isMatch);
        return next(new AppError("Login failed password ", 400));
      }
      const token = await user.generateJWTToken();
      // user.password = undefined;
      // console.log(token);
      // console.log("flasjdlkfjs");
      res.cookie("token", token, cookieOptions);
      
      res.status(200).json({
        success: true,
        message: "user login successful",
        user,
      });
    });
    // if (!user) {
    //   return next(new AppError("Login failed password ", 400));
    // }
  } catch (e) {
    console.log("error");
    return next(new AppError(e, 400));
  }
  // usermail=await user.email;
  // console.log(usermail);
  // if (!user.email==email) {
  //  return new AppError("Login failed password",400)
  // }
};
const logout = (req, res) => {
  // console.log("logout success");

  res.cookie("token", null, {
    maxAge: 0,
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logout success",
  });
};

const forgot = async (req, res, next) => {
  // console.log("forgot password");
  const { email } = req.body;
  console.log(req.body);
  if (!email) {
    return next(new AppError("email is required", 400));
  }
  // console.log(email);
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("user not register", 400));
  }
  const resetPass = await user.generatePassToken();
  await user.save();
  const resetUrl = `${process.env.FRONTENDURL}/reset/${resetPass}`;
  // console.log(process.env.FRONTENDURL);
  // console.log(process.env.PORT);
  console.log(resetUrl);
  const subject = `reset ${resetUrl}`;
  const message = `you can reset password using ${resetPass} url `;
  try {
    await sendEmail(email, subject, message);
    res.status(200).json({
      success: true,
      message: `mail send email to ${email}`,
    });
  } catch (error) {
    user.forgotPasswordExpires = undefined;
    user.forgotPasswordToken = undefined;
    await user.save();
    return next(new AppError(error.message, 404));
  }
};
const reset = async function (req, res, next) {
  console.log("reset password");
  // res.status(200).json({success:true});
  try {
    const { resetToken } = req.body;
    console.log(resetToken);
    const { password } = req.body;
    const forgotPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const user = await User.findOne({
      forgotPasswordToken,
      forgotPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return next(new AppError("token is now valid,try again please", 400));
    }
    user.password = password;
    user.forgotPasswordExpires = undefined;
    user.forgotPasswordToken = undefined;
    await user.save();
    res.status(200).json({
      success: true,
      message: "User saved successfully and password new",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const changePassword = async (req, res, next) => {
  // console.log("namsdfajskjsdf", oldpassword, newpassword, fullname);
  const { oldpassword, newpassword, fullname } = req.body;
  // console.log(req.body.fullName);
  const id = req.user.id;
  // const username=req.user.fullName
  // console.log('user is ',req.user);
  const user = await User.findById(id).select("+password");
  // const user = await User.findOne({fullName:fullname}).select("+password");
  // console.log('userrafjlsd',user);
  if (!oldpassword || !newpassword) {
    return next(new AppError("error password is required", 400));
  }
  if (!user) {
    return next(new AppError("user not found", 400));
  }
  const isValid = user.comparePassword(oldpassword,async function (err, isMatch) {
    // console.log("error", err, "pass", isMatch);
    // console.log('username is',user.fullName);
    if (!isMatch) {
      // console.log(isMatch);
      return next(new AppError("Login failed password change ", 400));
    }
    const token = await user.generateJWTToken();
    user.password = newpassword;
    if(fullname){
      user.fullName=fullname;
    }
    await user.save();
    user.password = undefined;
    // user.password = undefined;
    console.log(token);
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      success: true,
      message: "password change succcesfull",
      user,
    });
  });
  // console.log('pass',isValid);
  // console.log('password',oldpassword ,newpassword);
  // if (!isValid) {
  //   return next(new AppError("password is not valid", 400));
  // }
 
 
};
const updateProfile = async (req, res) => {
  const { fullName } = req.body;
  const id = req.user.id;
  const user = User.findById(id);
  if (!user) {
    return next(new AppError("user not found", 400));
  }
  if (req.fullName) {
    user.fullName = fullName;
  }
  if (req.file) {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  }
  if (req.file) {
    try {
      if (req.file) {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
          width: "250",
          height: "250",
          gravity: "faces",
          crop: "fill",
        });
        if (result) {
          user.avatar.public_id = result.public_id;
          user.avatar.secure_url = result.secure_url;
        }
      }
      fs.unlink(req.file.path, (err) => {
        if (err) {
          throw err;
        }

        console.log("File is deleted.");
      });
    } catch (error) {
      return next(new AppError("file not found", 400));
    }
  }
  await user.save();
  res.status(200).json({ success: true, message: "user saved successfully" });
};
const getdata=async (req,res,next)=>{
  console.log('getkfjdalkjfd');
  try {
    const id = req.user.id;
  const user = await User.findById(id);
  // console.log(id,user);
  res.status(200).json({
    success: true,
    message: "user data get succesful",
    user,
  });
    
  } catch (error) {
    return next(new AppError("no user found", 400));
    
  }
}
export {
  register,
  login,
  logout,
  forgot,
  reset,
  changePassword,
  updateProfile,
  getdata
};
