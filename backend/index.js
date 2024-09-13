import express from "express";
import cors from "cors";
import "dotenv/config";
import nodemailer from "nodemailer";

const port = 6969;
const app = express();

// Proper CORS options
app.use(
  cors({
    origin: "*", // Adjust this to restrict origins in production
    methods: ["GET", "POST"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/sendEmail", async (req, res) => {
  const { name, email, message, subject } = req.body;
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_USERNAME,
      pass: process.env.PASSWORD,
    },
  });

  const msg = {
    from: process.env.MY_USERNAME,
    to: process.env.MY_USERNAME,
    subject: `New message from ${name}`, // Dynamic subject
    text: `${name} (email: ${email}) has a Subject for you:\n\n${subject}\n\nmessage: ${message}`,
  };

  try {
    const info = await transporter.sendMail(msg);
    console.log("Email Sent: " + info.response);
    res.status(200).json({ message: "Mail is sent successfully!" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        message: "There was an error sending the mail. Please try again.",
      });
  }
});

app.listen(port, () => console.log(`Server has started on port ${port}`));
