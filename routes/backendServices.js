module.exports = function(db) {
    var express         = require('express');
    var router          = express.Router();
    var nodemailer      = require('nodemailer');
    var mongoose        = require('mongoose');
    var attendeesSchema  = require('../models/attendees');

    router.post('/register', function(req, res) {
      if (!req.body.email) res.send({success: false});
      var attendee = new attendeesSchema({email: req.body.email});
      attendee.save(function(err, att) {
        if (err) res.send({success: false, err: err});
        else res.send({success: true})
      });
    });

    var sendEmail = function(data) {
      var result;
      var fullname = data.fname + " " + data.lname;
      var smtpTransporter = nodemailer.createTransport({
        service: 'Mailgun',
        auth: {
          user: process.env.emailUser,
          pass: process.env.emailPass
        }
      });
      var message = {
        from: 'hackridge.io',
        to: 'sstapleton425@s207.org',
        subject: 'New Applicant: ' + fullname,
        text: JSON.stringify(data)
      };

      smtpTransporter.sendMail(message, function(err, info) {
         if (err) {
             console.log(err);
            result = {success: false, err: err};
         } else {
            result = {success: true};
         }
      });

      return result;
    }

    router.post('/registerApplicant', function(req, res) {
      var data = req.body;
      console.log("data: ", data);
      var attendee = new attendeesSchema({data: data});
      attendee.save(function(err, att) {
        var email = sendEmail(data);
        if (err) {
          if (email.success) res.send({success: true});
          else res.send({success: false, dberror: err, emailerror: email.err});
        }
        else res.send({success: true});
      });
    });

    router.post('/sendEmail', function(req, res) {
      var contactData = req.body;
      var fullname = contactData.fname + " " + contactData.lname;
      var smtpTransporter = nodemailer.createTransport({
        service: 'Mailgun',
        auth: {
          user: process.env.emailUser,
          pass: process.env.emailPass
        }
      });
      var message = {
        from: 'hackridge.io',
        to: 'sstapleton425@s207.org',
        subject: 'Sponsor Email: ' + fullname,
        text: "Name: " + fullname + "\n" + "Email: " + contactData.email + "\n" + "Company: " + contactData.company + "\nMessage: " + contactData.message
      };

      smtpTransporter.sendMail(message, function(err, info) {
         if (err) {
             console.log(err);
             res.send({
                success: false
              });
         } else {
              console.log(req.body);
              res.send({
                success: true
              });
         }
      });
    });

    router.get('/register', function(req, res) {
      res.send("opah!");
    });

    return router;
}
