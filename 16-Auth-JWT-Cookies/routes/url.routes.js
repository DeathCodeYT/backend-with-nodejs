import express from 'express'
import { createUrl, getAllUrl, redirectToUrl } from '../controllers/url.controller.js'

const router = express.Router()

router.route('/').post(createUrl).get(getAllUrl)
router.route("/:shortId").get(redirectToUrl)

export const urlRouter = router
