import express from 'express'
import { login, logout, signup } from '../controllers/user.controller.js'
import { verifyUser } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.route('/login').post(login)
router.route('/signup').post(signup)
router.route('/logout').post(verifyUser,logout)


export const authRouter = router
