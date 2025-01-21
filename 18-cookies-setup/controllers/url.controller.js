import { Url } from "../model/url.model.js";
import { nanoid } from "nanoid";
import {asyncWrapper} from "../middlewares/asyncWrapper.middleware.js";
import { ApiRes } from "../utils/ApiRes.js";
import { ApiError } from "../utils/ApiError.js";

export const createUrl = asyncWrapper(async (req, res,next) => {
  const { url } = req.body;
  if (!url) {
    throw new ApiError(400,"Url is required")
  }
  let shortId = nanoid(5);
  let shortedUrl = `http://localhost:4000/api/v1/${shortId}`;
  const obj = new Url({ shortId: shortId, redirectUrl: url,user:req.user._id, shortedUrl });
  await obj.save();
  return res.status(200).json( new ApiRes(200,obj,"Url is Shorted."));
});

export const getAllUrl = asyncWrapper(async (req, res,next) => {
  const urls = await Url.find({user:req.user._id});
  return res.status(200).json(new ApiRes(200,urls,"All Shorted Urls"));
});

export const redirectToUrl = asyncWrapper(async (req, res,next) => {
  const { shortId } = req.params;
  if (!shortId) {
    throw new ApiError(401,"Short ID required")
  }
  const url = await Url.findOne({ shortId });
  if (!url) {
    throw new ApiError(401,"Url not found")
  }
  url.visited += 1;
  await url.save();
  return res.redirect(url.redirectUrl);
})
