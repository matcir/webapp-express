const connection = require("../database/connection");

function index(req, res) {
  const sql = "SELECT * FROM movies";

  connection.query(sql, (err, result) => {
    if (err)
      return res.status(500).json({
        error: true,
        message: err.message,
      });

    res.json(result);
  });
}

function show(req, res) {
  const { id } = req.params;
  const sql = "SELECT * FROM movies WHERE id=?";
  connection.execute(sql, [id], (err, result) => {
    if (err)
      return res.status(500).json({
        error: true,
        message: err.message,
      });

    if (result.length === 0) {
      return res.status(404).json({
        error: true,
        message: "Not found",
      });
    }

    const movie = result[0];

    const reviewSql = "Select * from reviews WHERE movie_id=?";

    connection.execute(reviewSql, [id], (err, result) => {
      if (err)
        return res.status(500).json({
          err: true,
          message: err.message,
        });

      const movieReviews = result;
      movie.reviews = movieReviews;

      res.json(movie);
    });
  });
}

module.exports = {
  index,
  show,
};
