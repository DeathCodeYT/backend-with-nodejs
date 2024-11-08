import { asyncWrapper } from "../middlewares/asyncWrapper.js";
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
export const login = asyncWrapper(async (req, res, next) => {
  const { username, password } = req.body;
  if (!(username && password)) throw new ApiError(400, "Wrong Credentials");

  const user = await User.findOne({ username });
  if (!user) throw new ApiError(400, "User not Found");

  if (!await user.isPasswordCorrect(password))
    throw new ApiError(400, "Wrong Credentials");

  const accessToken = user.genrateAccessToken();
  const refreshToken = user.genrateRefreshToken();
    res.cookie('auth',accessToken,)
  return res
    .status(200)
    .json(
      new ApiRes(
        200,
        { username: user.username, email: user.email, fullname:user.fullname,accessToken },
        "User Created"
      )
    );
});
