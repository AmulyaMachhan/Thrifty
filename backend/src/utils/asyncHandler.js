const asyncHandler = (requestHandler) => (req, res, next) => {
  Promise.resolve(requestHandler(req, res, next)).catch((error) =>
    res.status(500).json({
      message: error.message,
    })
  );
};

export { asyncHandler };
