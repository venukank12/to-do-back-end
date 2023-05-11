const { User } = require("../../models");
const { hashPassword } = require("../../utils/helpers");

module.exports = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (user.dataValues.password !== hashPassword(req.body.password)) {
      return res.status(422).json({ message: "Old password is incorrect!" });
    }

    await User.update(
      {
        password: hashPassword(req.body.newPassword),
      },
      {
        where: {
          id: req.user.id,
        },
        individualHooks: true,
      }
    );

    return res.status(200).json({ message: "Password change success" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
