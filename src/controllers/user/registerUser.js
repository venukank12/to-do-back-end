const {User} = require("../../models");
const { hashPassword } = require("../../utils/helpers");

module.exports = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (user) {
      return res.status(422).json({ message: "email already registered!" });
    }

    await User.create({ firstName, lastName, email,userType:'User', password:hashPassword(password) });

    return res.status(200).json({
      message: "register success",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
