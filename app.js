const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const authRouter = require("./routes/api/authRouter")
const contactsRouter = require("./routes/api/contactsRouter")

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"))

app.use("/api/auth", authRouter)
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Server error",
  });
});

module.exports = app;







const Mailjet = require('node-mailjet');
require("dotenv").config();

const { MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE, MJ_SENDER_EMAIL } = process.env;

const mailjet = new Mailjet({
  apiKey: MJ_APIKEY_PUBLIC,
  apiSecret: MJ_APIKEY_PRIVATE
});


// const request = mailjet
//         .post('send', { version: 'v3.1' })
//         .request({
//           Messages: [
//             {
//               From: {
//                 Email: MJ_SENDER_EMAIL,
//                 // Name: "Mailjet Pilot"
//               },
//               To: [
//                 {
//                   Email: "passenger1@mailjet.com",
//                   Name: "passenger 1"
//                 }
//               ],
//               Subject: "Your email flight plan!",
//               TextPart: "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
//               HTMLPart: "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!"
//             }
//           ]
//         })

// request
//     .then((result) => {
//         console.log(result.body)
//     })
//     .catch((err) => {
//         console.log(err.statusCode)
//     })



// const data = {
//   to: "",
//   subject: "",
//   htmlPart: "",

//     }


const sendEmail = async(data) => {
  await mailjet.post('send', { version: 'v3.1' }).request({
       
          Messages: [
            {
              From: {
                Email: MJ_SENDER_EMAIL,
                // Name: "Mailjet Pilot"
              },
              To: [
                {
                  Email: data.to,
                  // Name: "passenger 1"
                }
              ],
              Subject: data.subject,
              // TextPart: "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
              HTMLPart: data.htmlPart,
            }
          ]
  })
    return true
    }
