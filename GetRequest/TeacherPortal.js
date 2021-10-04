const mysql = require("mysql");
const express = require('express');
const router = express.Router();
const request = require('request');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'school_management_system'
});


router.get('/TeacherPortal',(req,res) => {
    request('http://localhost:5007/TeacherProfile', { json: true }, (err, response, body) => {
    if (err) { return console.log(err); }
    console.log('TeacherDetails',body[0]);
    res.render('TeacherPortal', {TeacherDetails: body[0]});

  
  });
});

module.exports = router;