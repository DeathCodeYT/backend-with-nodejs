import { Blog } from "../model/blog.model.js";

export async function createBlog(req, res) {
  try {
    const query = {};
    const { title, content } = req.body;
    if (!(title && content)) {
      return res.status(401).json({
        success: false,
        message: "Title & Content is Required",
      });
    }
    query.title = title;
    query.content = content;
    if (req.body.description) {
      query.description = req.body.description;
    }

    const blog = new Blog(query);
    await blog.save();
    return res.status(401).json({
      success: true,
      message: "Blog Posted",
      data: blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Someting went wrong",
    });
  }
}

export async function getAllBlogs(req, res) {
  try {
    const blogs = await Blog.find()
    return res.status(200).json({
        success: true,
        message: "All Blogs",
        data:blogs
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Someting went wrong",
    });
  }
}

export async function getBlog(req, res) {
    try {
      const {id} = req.params
      if(!id){
        return res.status(401).json({
            success: false,
            message: "Id of Blog is required",
          });
      }
    //   const blog = await Blog.findOne({_id:id})
      const blog = await Blog.findById(id)
      if(!blog){
        return res.status(401).json({
            success: false,
            message: "Blog not Found",
          });
      }
      return res.status(200).json({
        success: true,
        message: "Blog Found",
        data:blog
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Someting went wrong",
      });
    }
  }

export async function deleteBlog(req, res) {
    try {
      const {id} = req.params
      if(!id){
        return res.status(401).json({
            success: false,
            message: "Id of Blog is required",
          });
      }
      const blog = await Blog.findByIdAndDelete(id,{new:true})
    //   const blog = await Blog.findByIdAndUpdate(id,{title:"sldkfj"},{new:true}) task
      if(!blog){
        return res.status(401).json({
            success: false,
            message: "Blog not found",
          });
      }
      return res.status(200).json({
        success: true,
        message: "Blog Deleted",
        data:blog
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Someting went wrong",
      });
    }
  }

export async function updateBlog(req, res) {
    try {
      const {id} = req.params
      if(!id){
        return res.status(401).json({
            success: false,
            message: "Id of Blog is required",
          });
      }
      const query = {}
      const {title,content,description} = req.body
      if(title){
        query.title = title
      }
      if(content){
        query.content = content
      }
      if(description){
        query.description = description
      }
      const blog = await Blog.findByIdAndUpdate(id,query,{new:true})
      if(!blog){
        return res.status(401).json({
            success: false,
            message: "Blog not found",
          });
      }
      return res.status(200).json({
        success: true,
        message: "Blog Updated",
        data:blog
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Someting went wrong",
      });
    }
  }