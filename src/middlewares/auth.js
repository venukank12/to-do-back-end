const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = (req, res, next) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  if (token === null) {
    return res.status(401).json({
      message: "unauthorized access",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) {
      return res.status(401).json({
        message: "unauthorized access",
      });
    }
    if (payload) {
      try {
        const user = await User.findByPk(payload.sub);

        if (!user) {
          return res.status(401).json({
            message: "unauthorized access",
          });
        }

        req.user = user.dataValues;
        next();
      } catch (e) {
        return res.status(500).json({
          message: e.message,
        });
      }
    }
  });
};
