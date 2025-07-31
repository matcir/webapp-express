function routeNotFound(req, res, next) {
  res.status(404).json({
    error: "Not Found",
    message: "Page not found",
  });
}

module.exports = routeNotFound;
