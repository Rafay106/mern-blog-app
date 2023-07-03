import Blog from "../models/blogModel.js";

// @desc Get all comments of a blog
// route GET api/blogs/:blogId/comments
// @access Private
const getComments = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found!");
    }
    const comments = blog.comments;

    res.status(200).json(comments);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// @desc Add a comment in a blog
// route POST api/blogs/:blogId/comments
// @access Private
const addComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);

    if (!blog) {
      res.status(404);
      throw new Error("Comment not found!");
    }

    const { body } = req.body;

    blog.comments.push({ commenterId: req.user._id, body });
    const commentedBlog = await blog.save();
    res.status(201).json(commentedBlog.comments);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// @desc Update a comment of a blog
// route PUT api/blogs/:blogId/comments/:commentId
// @access Private
const updateComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found!");
    }

    const comment = blog.comments.find((cmnt) =>
      cmnt._id.equals(req.params.commentId)
    );

    if (!comment) {
      res.status(404);
      throw new Error("Comment not found");
    }

    if (!comment.commenterId.equals(req.user._id)) {
      res.status(401);
      throw new Error("Only commenter can edit their comment.");
    }

    const { body } = req.body;
    comment.body = body || comment.body;

    blog.comments = blog.comments.map((cmnt) => {
      if (cmnt._id.equals(comment._id)) return comment;
      return cmnt;
    });
    const updatedBlog = await blog.save();

    res.status(200).json(updatedBlog.comments);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// @desc Delete a blog
// route DELETE api/blogs/:blogId
// @access Private
const deleteComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found!");
    }

    const comment = blog.comments.find((cmnt) =>
      cmnt._id.equals(req.params.commentId)
    );

    if (!comment) {
      res.status(404);
      throw new Error("Comment not found");
    }

    if (!comment.commenterId.equals(req.user._id)) {
      res.status(401);
      throw new Error("Only commenter can delete their comment.");
    }
    blog.comments = blog.comments.filter((cmnt) => {
      if (!cmnt._id.equals(req.params.commentId)) return cmnt;
    });
    console.log(blog.comments);
    const updatedBlog = await blog.save();
    res.status(200).json({
      comments: updatedBlog.comments,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export { getComments, addComment, updateComment, deleteComment };
