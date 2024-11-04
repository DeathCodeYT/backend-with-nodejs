import { Url } from "../model/url.model.js";
import { nanoid } from "nanoid";
import {asyncWrapper} from "../middlewares/asyncWrapper.js";

export const createUrl = asyncWrapper(async (req, res,next) => {
  const { url } = req.body;
  if (!url) {
    return res.status(401).json({
      success: false,
      message: "url is required",
    });
  }
  let shortId = nanoid(5);
  let shortedUrl = `http://localhost:4000/api/v1/${shortId}`;
  const obj = new Url({ shortId: shortId, redirectUrl: url, shortedUrl });
  await obj.save();
  return res.status(200).json({
    success: true,
    message: "Short url is ready",
    data: obj,
  });
});

export const getAllUrl = asyncWrapper(async (req, res,next) => {
  const urls = await Url.find();
  return res.status(200).json({
    success: true,
    message: "All Shorted Urls",
    data: urls,
  });
});

export const redirectToUrl = asyncWrapper(async (req, res,next) => {
  const { shortId } = req.params;
  if (!shortId) {
    return res.status(401).json({
      success: false,
      message: "id is required",
    });
  }
  const url = await Url.findOne({ shortId });
  if (!url) {
    return res.status(400).json({
      success: false,
      message: "Url Not Found",
    });
  }
  url.visited += 1;
  await url.save();
  return res.redirect(url.redirectUrl);
})
