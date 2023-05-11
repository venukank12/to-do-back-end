const { validationResult } = require("express-validator");

module.exports = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const resErr = [];
    errors.array().map((e) => resErr.push(e.msg));
    return res
      .status(400)
      .json({ message: "validation failed", error: resErr });
  };
};
