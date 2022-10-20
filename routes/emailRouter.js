var express = require("express");
var cors = require("../cors");
var emailRouter = express.Router();
var nodeMailer = require("nodemailer");
emailRouter
  .route("/")
  .options(cors.cors, (req, res) => {
    res.sendStatus(200);
  })
  .post(cors.cors, (req, res, next) => {
    var transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "rinis.webdesign@gmail.com",
        pass: "kjuwrwlhdujnrfqn",
      },
    });
    var mailOptions = {
      from: req.body.email,
      to: "rinis.webdesign@gmail.com",
      subject: req.body.subject,
      html: req.body.message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.send({
          msg: "error",
        });
      } else {
        console.log("Email sent: " + info.response);
        res.send({
          msg: "Sent successfully",
        });
      }
    });
  });

module.exports = emailRouter;
