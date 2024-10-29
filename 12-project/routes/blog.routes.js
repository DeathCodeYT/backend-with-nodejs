import express from 'express'
import { createBlog, deleteBlog, getAllBlogs, getBlog } from '../controllers/blog.controller.js'

const router = express.Router()

router.route('/').post(createBlog).get(getAllBlogs)
router.route('/:id').get(getBlog).delete(deleteBlog)

export const blogRouter = router

