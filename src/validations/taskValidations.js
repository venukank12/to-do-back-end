const { body, query, param } = require("express-validator");
const { pagination } = require("./common");

const title = body("title")
  .notEmpty()
  .withMessage("title should be provided!")
  .isLength({ min: 3, max: 50 })
  .withMessage("description should be 3 to 50 characters");

const description = body("description")
  .notEmpty()
  .withMessage("description shoule be provided")
  .isLength({ min: 3, max: 1024 })
  .withMessage("description should be 3 to 1024 characters");

const status = query("status")
  .if(query("status").exists())
  .notEmpty()
  .withMessage("status can not be null")
  .isIn(["Todo", "Inprocess", "Done"])
  .withMessage("status should be one of restricted values");

const taskId = param("taskId").isInt().withMessage("taskId should be a number");

exports.createTaskValidation = [title, description];

exports.getAllTaskWithPagination = [...pagination, status];

exports.updateTask = [taskId, title, description, status];
