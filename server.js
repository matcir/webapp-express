const express = require("express");
const app = express();
const PORT = process.env.PORT;
const movieRouter = require("./routes/movies");
const cors = require("cors");
const routeNotFound = require("./middlewares/routeNotFound");
const serverErrorHandler = require("./middlewares/serverErrorHandler");

app.use(cors());
app.use(express.static("public"));
app.use("/api/movies", movieRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my app");
});

app.use(routeNotFound);
app.use(serverErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
