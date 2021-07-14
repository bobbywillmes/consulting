const express = require('express')
const emailRouter = express.Router()
const nodemailer = require('nodemailer')

console.log("from email.route.js")

const transport = {
  // config for email send
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.email,
    pass: process.env.password
  }
}

const transporter = nodemailer.createTransport(transport)
transporter.verify((error, success) => {
  if (error) {
    //if error happened code ends here
    console.error(error)
  } else {
    //this means success
    console.log('Successful email connection')
  }
})


emailRouter.post('/', (req, res, next) => {
  console.log(`emailRouter.post ----`)
  console.log(req.body)
  // make mailable object
  const mail = {
    from: process.env.email,
    to: 'bobbywillmes@gmail.com',
    subject: req.body.subject,
    text: `
      from: ${req.body.name}  -  ${req.body.email}
      message: 
      ${req.body.text}`
  }
  // error handling
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.redirect('/')
    }
  })
  res.redirect('/')
})

module.exports = emailRouter;