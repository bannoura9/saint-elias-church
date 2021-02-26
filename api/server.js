const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = express.Router();
require("dotenv").config();
const mongoose = require("mongoose");
let Contact = require("./models/contact");

const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

let transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    // host: "smtp.gmail.com",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIl,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
);

// transporter.verify(function (error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });

// console.log("SMTP Configured");

const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use("/", routes);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "SaintElias",
  })
  .then(() => {
    console.log("database connection success");
  })
  .catch((err) => {
    console.log("database connection err", err);
  });

app.listen(PORT, function () {
  console.log("server is running now on port " + PORT);
});

routes.route("/contact-us").post(function (req, res) {
  console.log(req.body);
  let contact = new Contact(req.body);
  contact
    .save()
    .then(async (con) => {
      // send mail with defined transport object
      // let info = await transporter.sendMail({
      //   from: req.body.email, // sender address
      //   to: process.env.EMAIl, // list of receivers
      //   subject: "Hello ✔", // Subject line
      //   text: "Hello world?", // plain text body
      //   html: "<b>Hello world?</b>", // html body
      // });

      // console.log("Message sent: %s", info.messageId);

      console.log("contact us save ++++++", con);
      res.status(200).json({ contact: "sent contact us" });
    })
    .catch((err) => {
      console.log("contact us save error ++++++", err);
      res.status(400).send("contact us save error +++");
    });
});
