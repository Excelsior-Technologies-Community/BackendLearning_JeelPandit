import Movie from "../model/movieModel.js";

// GET all movies
export const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();

    res.status(200).json({
      success: true,
      data: movies,
    });
  } catch (error) {
    next(error);
  }
};

// POST add movie
export const addMovie = async (req, res, next) => {
  try {
    const { title, year } = req.body;

    if (!title || !year) {
      const error = new Error("Title and year are required");
      error.statusCode = 400;
      return next(error);
    }

    const newMovie = await Movie.create({
      title,
      year,
    });

    res.status(201).json({
      success: true,
      message: "Movie added successfully",
      data: newMovie,
    });
  } catch (error) {
    next(error);
  }
};

// GET single movie
export const getSingleMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      const error = new Error("Movie not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};
