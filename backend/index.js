import express from "express";
import cors from "cors";
import "dotenv/config";
import nodemailer from "nodemailer";

const port = 6969;
const app = express();
app.use(cors({ options: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/sendEmail", (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_USERNAME, // Check if USERNAME matches the variable name in your .env file
      pass: process.env.PASSWORD, // Check if PASSWORD matches the variable name in your .env file
    },
  });

  let msg = {
    from: process.env.MY_USERNAME,
    to: process.env.MY_USERNAME,
    subject: "You have a new message from your fans",
    text: `${name} with email ${email} has a message for you - ${message}`,
  };

  transporter
    .sendMail(msg)
    .then((info) => {
      console.log("Email Sent: " + info.response);
    })
    .catch((err) => console.log(err));
});

app.listen(port, () => console.log("Server has started"));
