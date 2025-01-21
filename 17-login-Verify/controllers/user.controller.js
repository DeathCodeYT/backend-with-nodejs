import { asyncWrapper } from "../middlewares/asyncWrapper.middleware.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import bcrypt from "bcrypt";
import { ApiRes } from "../utils/ApiRes.js";

export const signup = asyncWrapper(async (req, res, next) => {
  const { fullname, email, username, password, confirmPassword } = req.body;
  if (!(fullname && email && username && password && confirmPassword))
    throw new ApiError(400, "Wrong Credentials");

  if (password != confirmPassword)
    throw new ApiError(400, "Password doesn't match");

  const user = User({ fullname, email, username, password });
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
  res.cookie("auth", "", {
    maxAge: 0,
    secure: false,
    httpOnly: true,
  });
  const user = await User.findById(req.user._id)
  if(!user) throw new ApiError(401,"User not found")
  user.refreshToken = ""
  await user.save()
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

  res.cookie("auth", accessToken, {
    maxAge: 2 * 24 * 60 * 60 * 1000,
    secure: false,
    httpOnly: true,
  });
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
