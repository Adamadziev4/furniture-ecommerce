const jwt = require("jsonwebtoken");
const { secret } = require("../config");

// Промежуточная функция, которая выполнится до контроллера
const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, secret);
      console.log(decoded);

      req.userId = decoded._id;

      next();
    } catch (error) {
      console.log(error);

      return res.status(403).json({
        message: "No access",
      });
    }
  } else {
    return res.status(403).json({
      message: "No access",
    });
  }
};

module.exports = {
  checkAuth,
};
