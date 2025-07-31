const express = require("express");
const app = express();
const PORT = process.env.PORT;
const movieRouter = require("./routes/movies");

app.use(express.static("public"));
app.use("/api/movies", movieRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my app");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
