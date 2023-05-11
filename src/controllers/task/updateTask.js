const { Task } = require("../../models");

module.exports = async (req, res) => {
  try {
    const taskId = parseInt(req.params.taskId);
    const { title, description, status } = req.body;

    const taskExist = await Task.findByPk(taskId);

    if (!taskExist) {
      return res.status(422)
        .json({ message: "Task is not exists with this taskId!" });
    }

    if (taskExist.dataValues.user !== req.user.id) {
      return res
        .status(422)
        .json({
          message: "Task can only be updated by same user user who created!",
        });
    }

    await Task.update(
      {
        title,
        description,
        status,
      },
      {
        where: {
          id: taskId,
        },
        individualHooks: true,
      }
    );

    return res.status(200).json({ messsage: "task has been updated successfully" });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
