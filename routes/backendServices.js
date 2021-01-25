module.exports = function(db) {
    var express         = require('express');
    var router          = express.Router();
    var nodemailer      = require('nodemailer');
    var mg              = require('nodemailer-mailgun-transport');
    var mongoose        = require('mongoose');
    var emailSchema     = require('../models/email');
    var contactSchema   = require('../models/contact');
    var errorSchema     = require('../models/error');
    var attendeeSchema  = require('../models/attendee');
    var nodemailer      = require('nodemailer');
    var mg              = require('nodemailer-mailgun-transport');
    var emailValidator  = require('email-validator');
    var bodyParser      = require('body-parser');
    var path            = require('path');
    var validator       = require('validator');
    var pug             = require('pug');

    router.post('/subscribeToEmailList', function(req, res) {
      var email = new emailSchema({email: req.body.email});
      email.save(function(err) {
        if (err) res.end();
        else res.send("success");
      });
    });

    var sendConfirmationEmail = (userInfo) => {
      const compileFn = pug.compileFile(__dirname + '/../templates/confirmation.pug');
      const compiledEmail = compileFn(userInfo);
      var auth = {
        auth: {
          api_key: process.env.api_key,
          domain: process.env.domain
        }
      }
      var smtpTransporter = nodemailer.createTransport(mg(auth));
      var message = {
        from: 'Hack Ridge Team <team@hackridge.io>',
        to: userInfo.email,
        subject: "Registration Confirmed!",
        text: "We have received your registration and will keep you updated with new information about Hack Ridge. Feel free to reach out to us at team@hackridge.io if you have any questions or concerns. Get hyped!!",
        html: compiledEmail
      };
      return smtpTransporter.sendMail(message);
    }

    router.post('/testEmail', function(req, res) {
      sendConfirmationEmail(req.body)
      .then(function(info, err) {
        if (err) {
          return res.send({success: false, err: "Looks like our servers aren't doing so hot. Please try again later."});
          console.log(err);
        } else {
          return res.send({success: true});
        }
      });
    });

    // Register a new Hack Ridge attendee
    router.post('/register', async (req, res) => {
      try {
        const attendee = new attendeeSchema(req.body);
        await attendee.save();
        await sendConfirmationEmail({
          name: req.body.student_fname,
          email: req.body.student_email
        });
        res.send({ success: true });
      } catch (err) {
        // Registration failed. Log an error in the DB.
        console.log(err);
        const newError = new errorSchema({
          name: req.body.student_fname,
          email: req.body.student_email,
          error: JSON.stringify(err),
          date: new Date()
        });
        await newError.save();
        res.send({ success: false, error: err }); 
      }
    });

    router.post('/sendMessage', function(req, res) {
      var data = req.body;
      Object.keys(data).map(function(key, index) {
         data[key] = validator.escape(data[key]);
      });
      var contact = new contactSchema(data);
      contact.save();
      var isValidEmail = emailValidator.validate(data.email);
      if (!isValidEmail) return res.send({success: false, err: 'Invalid contact email. If this is an error, please send an email info@hackridge.io. Thanks!'});
      var auth = {
        auth: {
          api_key: process.env.api_key,
          domain: process.env.domain
        }
      }
      var smtpTransporter = nodemailer.createTransport(mg(auth));
      var message = {
        from: 'signup@hackridge.io',
        to: 'hackridge@gmail.com',
        subject: 'Contact Form: ' + data.fname + " " + data.lname,
        text: "Name: " + data.fname + " " + data.lname + "\nEmail: " + data.email + "\nMessage: " + data.message
      };
      smtpTransporter.sendMail(message, function(err, info) {
         if (err) {
           return res.send({success: false, err: "Looks like our servers aren't doing so hot. Please try again later."});
           console.log(err);
         } else {
           return res.send({success: true});
         }
      });
    });


    return router;
}
