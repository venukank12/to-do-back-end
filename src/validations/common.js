const { query } = require("express-validator");

const page = query("page")
  .if(query("page").exists())
  .notEmpty()
  .withMessage("page can not be null")
  .isInt()
  .withMessage("page should be number");

const pageSize = query("pageSize")
  .if(query("pageSize").exists())
  .notEmpty()
  .withMessage("page size can not be null")
  .isInt()
  .withMessage("page size should be number");

exports.pagination = [page, pageSize];
