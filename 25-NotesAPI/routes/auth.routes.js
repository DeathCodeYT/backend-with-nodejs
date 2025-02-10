import express from 'express'
import { login, signUp } from '../controllers/Users/user.controller.js'

const router = express.Router()
router.route('/login').post(login)
router.route('/signup').post(signUp)

export const authRoutes = router