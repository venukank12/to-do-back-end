const express = require("express");
const router = express.Router();
const validate = require("../validations");
const {
  createTaskValidation,
  getAllTaskWithPagination,
  updateTask,
} = require("../validations/taskValidations");

// controllers
const createTaskController = require("../controllers/task/createTask");
const getAllTaskController = require("../controllers/task/getAllTask");
const updateTaskController = require("../controllers/task/updateTask");

const authMiddleware = require("../middlewares/auth");
const roleMiddleware = require("../middlewares/role");

router.get(
  "/",
  authMiddleware,
  validate(getAllTaskWithPagination),
  getAllTaskController
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("User"),
  validate(createTaskValidation),
  createTaskController
);

router.put(
  "/:taskId",
  authMiddleware,
  validate(updateTask),
  updateTaskController
);

// router.delete(
//   "/:id",
//   authMiddleware,
//   validate(passChange),
//   changePasswordController
// );

module.exports = router;
