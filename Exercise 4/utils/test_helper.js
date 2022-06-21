const Blog = require('../models/blogs')

const initialBlogs = [
    {
      title:'',
      author:'',
      url:'',
      likes:'',
    },
    {
      title:'',
      author:'',
      url:'',
      likes:'',
    },
  ]

  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }
  
  module.exports = {
    initialBlogs, blogsInDb
  }