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



router.get('/subjects', (req, res) => {
    // console.log(req.body);
    db.query("SELECT teacher.TEACHER_NAME, subject.TEACHER_ID, subject.CLASS, subject.SUBJECT_NAME, subject.COURSE_CODE FROM teacher, subject WHERE teacher.TEACHER_ID = subject.TEACHER_ID", (error, results) => {
        // console.log(error)
        console.log(results)
        if (results.length > 0) {
            res.send(results)
        }
    })
}
);


router.get('/adminview_subject',(req,res) => {
  request('http://localhost:5007/subjects', { json: true }, (err, response, body) => {
  if (err) { return console.log(err); }
  console.log('explanation',body);
  res.render('adminview_subject', {Subjects: body});

});
});



module.exports = router;
