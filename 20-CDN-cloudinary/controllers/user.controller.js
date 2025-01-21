import { asyncWrapper } from "../middlewares/asyncWrapper.middleware.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import bcrypt from "bcrypt";
import { ApiRes } from "../utils/ApiRes.js";
import { uploadOnCloudinary } from "../cdn/couldinary.js";

export const signup = asyncWrapper(async (req, res, next) => {
  const { fullname, email, username, password, confirmPassword } = req.body;
  if (!(fullname && email && username && password && confirmPassword))
    throw new ApiError(400, "Wrong Credentials");

  if (password != confirmPassword)
    throw new ApiError(400, "Password doesn't match");
  const query = {fullname,email,username,password}
  if(req.file){
    const uploadResult = await uploadOnCloudinary(req.file.path)
    console.log(uploadResult);
    query.profilePhoto = uploadResult.url
    query.profilePhotoID = uploadResult.public_id
  }
  // return res.status(200).json({ message: "User created successfully" });

  const user = User(query);
  await user.save();
  return res
    .status(200)
    .json(
      new ApiRes(
        200,
        { username: user.username, email: user.email },
        "User Created"
      )
    );
});

export const logout = asyncWrapper(async (req, res, next) => {
  const cookieOptions = {
    maxAge: 0,
    httpOnly: true, // Prevent XSS attacks
    sameStie:"strict", // Prevent CSRF Attack
    secure: process.env.NODE_ENV === "production",
  };
  if(process.env.NODE_ENV === "production"){
    cookieOptions.domain = ".example.com"
  }
  res.cookie("accessToken", "", cookieOptions);
  res.cookie("refreshToken", "", cookieOptions);

  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(401, "User not found");
  user.refreshToken = "";
  await user.save();
  return res.status(200).json(new ApiRes(200, null, "Logout Successfully"));
});

export const login = asyncWrapper(async (req, res, next) => {
  const { username, password } = req.body;
  if (!(username && password)) throw new ApiError(400, "Wrong Credentials");

  const user = await User.findOne({ username });
  if (!user) throw new ApiError(400, "User not Found");

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) throw new ApiError(400, "Wrong Credentials");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  const cookieOptions = {
    maxAge: 2 * 24 * 60 * 60 * 1000,
    httpOnly: true, // Prevent XSS attacks
    sameStie:"strict", // Prevent CSRF Attack
    secure: process.env.NODE_ENV === "production",
  };
  if(process.env.NODE_ENV === "production"){
    cookieOptions.domain = ".example.com"
  }

  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);

  return res.status(200).json(
    new ApiRes(
      200,
      {
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        accessToken,
      },
      "User Created"
    )
  );
});
