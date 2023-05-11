const { body, query } = require("express-validator");

const email = body("email")
  .notEmpty()
  .withMessage("Email should be provided!")
  .isEmail()
  .withMessage("Email is not valid")
  .normalizeEmail();

const password = body("password")
  .notEmpty()
  .withMessage("Password should be provided!")
  .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,50}$/)
  .withMessage(
    "Password must be 8 to 50 characters length and should have one number and special character"
  );

const newPassword = body("newPassword")
  .notEmpty()
  .withMessage("New Password should be provided!")
  .custom((value, { req }) => {
    if (req.body.password === value) {
      throw new Error("Old and New password can not be the same!");
    }

    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,50}$/.test(value)) {
      throw new Error(
        "New Password must be 8 to 50 characters length and should have one number and special character!"
      );
    }

    return true;
  });

const firstName = body("firstName")
  .notEmpty()
  .withMessage("firstName shoule be provided")
  .isLength({ min: 3, max: 50 })
  .withMessage("firstName should be 3 to 50 characters");

const lastName = body("lastName")
  .notEmpty()
  .withMessage("lastName shoule be provided")
  .isLength({ min: 3, max: 50 })
  .withMessage("lastName should be 3 to 50 characters");

exports.loginUserValidation = [email, password];

exports.passChange = [password, newPassword];

exports.registerUser = [firstName, lastName, email, password];
