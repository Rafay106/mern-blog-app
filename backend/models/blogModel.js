import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required!."],
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    body: {
      type: String,
      required: [true, "Body is required!."],
    },
    comments: [
      {
        commenterId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        body: String,
        date: {
          type: Date,
          default: Date,
        },
      },
    ],
    hidden: Boolean,
    meta: {
      votes: Number,
      favs: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
