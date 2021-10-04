const mysql = require("mysql");
const express = require('express');
const router = express.Router();
const alert = require('alert');
const request = require('request');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'school_management_system'
});

router.post('/EditMarks', (req, res) => {
    console.log('EditMarks', req.body);

    db.query('UPDATE examination_result_final SET ? WHERE STUDENT_ID = ? AND COURSE_CODE = ?', [{ MARKS: req.body.MARKS}, req.body.STUDENT_ID, req.body.COURSE_CODE], (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    alert("Edit Successfull");
                    res.redirect('/adminview_student_result_status')
                }
            });
         
    });


module.exports = router;


