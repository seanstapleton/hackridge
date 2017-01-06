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

    router.get('/register', function(req, res) {
      res.send("opah!");
    });

    return router;
}
