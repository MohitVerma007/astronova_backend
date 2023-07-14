import express from "express";

import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const checkInput = (req, res, next) => {
  const { name, email, password, mobile } = req.body;

  // Check the name field.
  if (!name) {
    res.status(422).send({ errors: ["name is required"] });
    return;
  }

  // Check the email field.
  if (!email) {
    res.status(422).send({ errors: ["email is required"] });
    return;
  }

  // Check the password field.
  if (!password) {
    res.status(422).send({ errors: ["password is required"] });
    return;
  }

  // Check the password length.
  if (password.length < 6) {
    res
      .status(422)
      .send({ errors: ["password must be greater than 6 characters"] });
    return;
  }

  // Check the mobile length.

  if (!mobile) {
    res.status(422).send({ errors: ["mobile is required"] });
    return;
  }
  if (mobile.length != 10) {
    res
      .status(422)
      .send({ errors: ["mobile number length must be equal to 10"] });
    return;
  }

  // Check the password for uppercase letters.
  if (!/[A-Z]/.test(password)) {
    res.status(422).send({
      errors: ["password must contain at least one uppercase letter"],
    });
    return;
  }

  // Check the password for lowercase letters.
  if (!/[a-z]/.test(password)) {
    res.status(422).send({
      errors: ["password must contain at least one lowercase letter"],
    });
    return;
  }

  // Check the password for special characters.
  if (!/[~!@#$%&?]/.test(password)) {
    res.status(422).send({
      errors: ["password must contain at least one special character"],
    });
    return;
  }

  // Check the profile image mimetype.
  if (req.files?.profileImg) {
    const profileImg = req.files.profileImg[0];
    if (
      profileImg.mimetype != "image/jpeg" &&
      profileImg.mimetype != "image/png"
    ) {
      res
        .status(422)
        .send({ errors: ["Profile image must be in JPEG or PNG format"] });
      return;
    }
  } else {
    res.status(422).send({
      errors: ["Profile image is required in JPEG or PNG format"],
    });
    return;
  }

  // Check the cover image mimetype.
  if (req.files?.coverImg?.[0]) {
    const coverImg = req.files.coverImg[0];

    if (coverImg.mimetype != "image/jpeg" && coverImg.mimetype != "image/png") {
      res
        .status(422)
        .send({ errors: ["Cover image must be in JPEG or PNG format"] });
      return;
    }
  }

  // Continue to the next middleware function.
  next();
};

export default checkInput;
