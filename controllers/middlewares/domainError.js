module.exports = (err, req, res, next) => {
  const errorMap = {
    notFound: 404,
    // is_required: 400,
  };

  const status = errorMap[err.code];

  if (!status) {
    return next(err);
  }

  res.status(status).json(err);
};
