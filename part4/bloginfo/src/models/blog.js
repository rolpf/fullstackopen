import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    minLength: 12,
    maxLength: 64,
    required: true,
  },
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Blog", blogSchema);
