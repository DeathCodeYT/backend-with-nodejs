import express from 'express'
import { createUrl, getAllUrl, redirectToUrl, uploadPhoto } from '../controllers/url.controller.js'
import { verifyUser } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/upload.middleware.js'

const router = express.Router()

router.route('/').post(verifyUser,createUrl).get(verifyUser,getAllUrl)
router.route("/upload").post(upload.single("img"),uploadPhoto)
router.route("/:shortId").get(redirectToUrl)

export const urlRouter = router
