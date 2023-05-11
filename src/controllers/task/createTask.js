const {Task} = require("../../models");

module.exports = async (req, res) => {
  try {
    const { title, description } = req.body;

    const taskExists = await Task.findOne({
      where: { title },
    });

    if (taskExists) {
      return res.status(422).json({ message: "Task already exists with this title!" });
    }

    const task = await Task.create({ title, description,status:'Todo', user:req.user.id });

    return res.status(200).json({
      message: "Task create success",
      data:task.dataValues
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
