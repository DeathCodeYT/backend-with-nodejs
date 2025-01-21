import express from 'express'
import { createUrl, getAllUrl, redirectToUrl } from '../controllers/url.controller.js'
import { verifyUser } from '../middlewares/auth.middleware.js'
const router = express.Router()

router.route('/').post(verifyUser,createUrl).get(verifyUser,getAllUrl)
router.route("/:shortId").get(redirectToUrl)

export const urlRouter = router
