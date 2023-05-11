const express = require("express");
const router = express.Router();
const validate = require("../validations");
const {
  loginUserValidation,
  passChange,
  registerUser,
} = require("../validations/userValidations");

// controllers
const registerUserController = require("../controllers/user/registerUser");
const loginUserController = require("../controllers/user/loginUser");
const changePasswordController = require("../controllers/user/changePassword");
const getAllUsersController = require("../controllers/user/getAllUsers");

const authMiddleware = require("../middlewares/auth");
const roleMiddleware = require("../middlewares/role");

router.get("/", authMiddleware, roleMiddleware(), getAllUsersController);

router.post("/register", validate(registerUser), registerUserController);

router.post("/login", validate(loginUserValidation), loginUserController);

router.post(
  "/change-password",
  authMiddleware,
  validate(passChange),
  changePasswordController
);

module.exports = router;
