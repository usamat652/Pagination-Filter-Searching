import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    releaseYear: Number,
    // other movie-related fields
  });
  const movieModel= mongoose.model("Movies", movieSchema);
  export default movieModel;