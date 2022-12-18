const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
    minlength: [2, "Title has to be at least 2 characters!"],
  },
  author: {
    type: String,
    required: [true, "Author is required!"],
    minlength: [5, "Author has to be at least 5 characters!"],
  },
  image: {
    type: String,
    required: [true, "Image url is required!"],
    validate:[/^https?:\/\//i, "Invalid image url!"],
  },
  review: {
    type: String,
    required: [true, "Review is required!"],
    minlength: [10, "Review has to be maximum 10 characters!"],
  },
  genre: {
    type: String,
    required: [true, "Genre date is required!"],
    minlength: [3, "Genre date has to be 3 characters in the form of '02.02.2022'!"],
  },
  stars: {
    type: Number,
    required: [true, "Stars is required!"],
    min: [1, "Start has to be at least 1!"],
    max: [5, "Start has to be at most 5!"],
  },
  wishinglist: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: ObjectId,
    ref: "User",
  },
});

const Book = model("Book", bookSchema);

module.exports = Book;
