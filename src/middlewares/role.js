module.exports = (allowedRole = "Admin") => {
  return (req, res, next) => {
    if (req.user.userType !== allowedRole) {
      return res
      .status(403)
      .json({ message: "you dont have access to this resource" });
    }
    next();
  };
};
