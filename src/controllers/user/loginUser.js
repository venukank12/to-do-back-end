const { User } = require("../../models");
const { hashPassword } = require("../../utils/helpers");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    const { email, password: pwd } = req.body;

    const user = await User.findOne({
      where: {
        [Op.and]: [
          {
            email,
          },
          {
            password: hashPassword(pwd),
          },
        ],
      },
    });

    if (!user) {
      return res
        .status(422)
        .json({ message: "we could not find your profile" });
    }

    const { password, ...restUser } = user.dataValues;
    
    const token = jwt.sign(
      {
        sub: restUser.id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      message: "login success",
      token: token,
      user: restUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
