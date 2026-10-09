const checkOrigin = (req, res, next) => {
  const protectedMethods = ["POST", "PUT", "PATCH", "DELETE"];

  if (!protectedMethods.includes(req.method)) {
    return next();
  }

  const origin = req.get("Origin");
  const allowedOrigin = process.env.CLIENT_ORIGIN;

  if (origin && origin !== allowedOrigin) {
    return res.status(403).json({
      error: "Forbidden origin",
    });
  }

  next();
};

export default checkOrigin;
