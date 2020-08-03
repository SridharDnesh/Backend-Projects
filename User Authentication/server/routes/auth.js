const express = require("express");
const router = express.Router();

const User = require("../database/models/Users");

const util = require("../lib/util");

router.post("/signup", (req, res) => {
  //Check if the email already exists
  User.findOne({ email: req.body.email })
    .then((user) => {
      //if exists, then respond 409-CONFLICT
      if (user) {
        return res.status(409).json({
          success: false,
          message: "Email Id already exists",
          error: null,
        });
      }

      //else, hash the password for storing in db
      const hashedPassword = util.hashPassword(req.body.password);

      //create a object as the schema created and change the password value to hashedPassword
      const saveUser = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      };

      //Create a new instance of the user model by sending the created 'user' object.
      const newUser = new User(saveUser);

      //call the save function using the created instance
      newUser.save((error, savedUser) => {
        //if any error occured while saving, respond with 500-SERVER ERROR
        if (error) {
          return res.status(500).json({
            success: false,
            message: "Internal Server Error Occured::DBERROR",
            error: error,
          });
        }

        //finally, if no error occured then respond with 201-CREATED
        if (savedUser) {
          //issue a token for the saved user
          const tokenData = util.issueToken(savedUser);

          //Respond with the token - frontend will use this to store it in browser
          res.status(201).json({
            success: true,
            message: "User created successfully",
            data: savedUser,
            token: tokenData.token,
            expiresIn: tokenData.expiresIn,
          });
        }
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Internal Server Error Occured::DBERROR(catch)",
        error: error,
      });
    });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(404).json({
          success: false,
          message: "No user found",
          error: null,
        });
      }

      const isValid = util.verifyPassword(req.body.password, user.password);

      if (isValid) {
        const tokenData = util.issueToken(user);

        res.status(200).json({
          success: true,
          message: "User authenticated successfully",
          data: user, //TESTING PURPOSE ONLY
          token: tokenData.token,
          expiresIn: tokenData.expiresIn,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Email or Password incorrect",
          error: null,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: "Internal Error Occured::DBERROR",
        error: error,
      });
    });
});

module.exports = router;
