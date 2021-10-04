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


router.get('/StudentPortal',(req,res) => {
    request('http://localhost:5007/StudentProfile', { json: true }, (err, response, body) => {
    if (err) { return console.log(err); }
    console.log('StudentDetails',body[0]);
    res.render('StudentPortal', {StudentDetails: body[0]});
    


  
  });
});

module.exports = router;