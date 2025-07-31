const connection = require("../database/connection");

function index(req, res) {
  const sql = "SELECT * FROM movies";

  connection.query(sql, (err, result) => {
    if (err)
      return res.status(500).json({
        error: true,
        message: err.message,
      });
    //mappo su result per inserire il path prima del nome delle immagini
    result.map((item) => {
      item.image = "http://localhost:3000/img/" + item.image;
    });
    res.json(result);
  });
}
//show
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

      //inserisco il path prima del nome dell'immagine
      movie.image = "http://localhost:3000/img/" + movie.image;

      res.json(movie);
    });
  });
}

module.exports = {
  index,
  show,
};
