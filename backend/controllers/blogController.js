import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";

// @desc Get a Blogs
// route GET api/blogs/:blogId
// @access Private
const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) {
      res.status(400);
      throw new Error("Blog not found!");
    }

    const author = await User.findById(blog.authorId);
    if (!author) {
      res.status(404);
      throw new Error("Author not found");
    }
    const blogWithAuthorName = blog.toObject();
    blogWithAuthorName.authorName = `${author.first_name} ${author.last_name}`;
    res.status(200).json(blogWithAuthorName);
  } catch (error) {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ error: error.message });
  }
};

// @desc Get all Blogs
// route GET api/blogs
// @access Private
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ authorId: req.user._id }).sort({
      createdAt: -1,
    });

    if (!blogs) {
      res.status(404);
      throw new Error("Blogs not found!");
    }

    res.status(200).json(blogs);
  } catch (error) {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ error: error.message });
  }
};

// @desc Get all Blogs
// route GET api/blogs
// @access Public
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({
      createdAt: -1,
    });

    if (!blogs) {
      res.status(404);
      throw new Error("Blogs not found!");
    }

    const blogsWithAuthorName = await Promise.all(
      blogs.map(async (blog) => {
        const author = await User.findById(blog.authorId);
        if (!author) {
          res.status(404);
          throw new Error("Author not found!");
        }

        const blogWithAuthorName = blog.toObject();
        blogWithAuthorName.authorName = `${author.first_name} ${author.last_name}`;
        return blogWithAuthorName;
      })
    );

    res.status(200).json(blogsWithAuthorName);
  } catch (error) {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ error: error.message });
  }
};

// @desc Create a blog
// route POST api/blogs
// @access Private
const createBlog = async (req, res) => {
  try {
    const { title, body } = req.body;

    const blog = await Blog.create({
      title,
      authorId: req.user._id,
      body,
      comments: [],
      meta: {
        votes: 0,
        favs: 0,
      },
    });

    res.status(201).json(blog);
  } catch (error) {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ error: error.message });
  }
};

// @desc Update a blog
// route PUT api/blogs/:blogId
// @access Private
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      authorId: req.user._id,
      _id: req.params.blogId,
    });
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found!");
    }
    blog.title = req.body.title || blog.title;
    blog.body = req.body.body || blog.body;
    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (error) {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ error: error.message });
  }
};

// @desc Delete a blog
// route DELETE api/blogs/:blogId
// @access Private
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      authorId: req.user._id,
      _id: req.params.blogId,
    });
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found!");
    }
    const deletedBlog = await blog.deleteOne();
    res.status(200).json({
      blog: deletedBlog,
      message: "Deleted successfully",
    });
  } catch (error) {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ error: error.message });
  }
};

export { getBlog, getBlogs, getAllBlogs, createBlog, updateBlog, deleteBlog };
