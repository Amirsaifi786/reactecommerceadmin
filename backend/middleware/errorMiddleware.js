const notFound = (req, res, next) => {
  res.status(404);
  throw new Error("Not Found");
};

const errorHandler = (err, req, res, next) => {
  res.status(res.statusCode === 200 ? 500 : res.statusCode);
  res.json({
    message: err.message,
  });
};

module.exports = { notFound, errorHandler };

