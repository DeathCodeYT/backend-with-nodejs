import { asyncWrapper } from "../../middlewares/asyncWrapper.js";
import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/apiRes.js";
function isValidEmail(email) {
  // Simple email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
function isValidUsername(username) {
  // Username should be 3-15 characters long and can include letters, numbers, and underscores
  const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
  return usernameRegex.test(username);
}
export const signUp = asyncWrapper(async (req, res, next) => {
  const { name, username, email, password } = req.body;
  if (!isValidUsername(username))
    throw new ApiError(400, "username is not valid");
  if (!isValidEmail(email)) throw new ApiError(400, "eamil is not valid");
  const user = new User({
    name,
    email,
    password,
    username,
  });
  await user.save();
  res.status(201).json(
    new ApiResponse(
      201,
      true,
      {
        name: user.name,
        email: user.email,
        username: user.username,
      },
      "User Created"
    )
  );
});

export const login = asyncWrapper(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid Credentials");
  }
  const token = user.generateAccessToken();
  const cookieOptions = {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    httpOnly: true, // Prevent XSS attacks
    sameStie: "strict", // Prevent CSRF Attack
    secure: process.env.NODE_ENV === "production",
  };
  if (process.env.NODE_ENV === "production") {
    cookieOptions.domain = ".example.com";
  }

  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json(
    new ApiResponse(
        200,
        true,
        {
            username: user.username,
            accessToken: token,
            email:user.email,
            name:user.name
        },
        "Logined Completed"
    )
  )
});
