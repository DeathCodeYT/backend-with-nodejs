import express from 'express'
import { createNote, deleteNote, getNotes, updateNote } from '../controllers/Users/note.controller.js'
import { verifyUser } from '../middlewares/auth.middleware.js'

const router = express.Router()
router.route('/').get(verifyUser,getNotes).post(verifyUser,createNote)
router.route('/:id').patch(verifyUser,updateNote).delete(verifyUser,deleteNote)

export const noteRoutes = router