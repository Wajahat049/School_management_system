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

// FINALMARKS
router.post('/EnterFinalMarks', (req, res) => {
    // console.log('EnterFinalMarks ', req.body);

    db.query("SELECT * FROM examination_result_final WHERE STUDENT_ID = ?", [req.body.STUDENT_ID], (error, results) => {
        // console.log(error)
        if (results.length > 0) {
            res.render('/adminview_student_result_status', { message: 'Already Present' })
        }
        else {
            db.query("INSERT INTO examination_result_final (STUDENT_ID, COURSE_CODE, MARKS) VALUES (?, ?, ?)", [req.body.STUDENT_ID, req.body.COURSE_CODE, req.body.MARKS], (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    alert("Enter Successfull");
                    res.redirect('adminview_student_result_status')
                }
            });
        }
    })
});



// MIDSMARKS
router.post('/EnterMidsMarks', (req, res) => {
    // console.log('EnterMidsMarks ', req.body);

    db.query("SELECT * FROM examination_result_mids WHERE STUDENT_ID = ?", [req.body.STUDENT_ID], (error, results) => {
        // console.log(error)
        if (results.length > 0) {
            res.render('/adminview_student_result_status', { message: 'Already Present' })
        }
        else {
            db.query("INSERT INTO examination_result_mids (STUDENT_ID, COURSE_CODE, MARKS) VALUES (?, ?, ?)", [req.body.STUDENT_ID, req.body.COURSE_CODE, req.body.MARKS], (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    alert("Enter Successfull");
                    res.redirect('adminview_student_result_status')
                }
            });
        }
    })
});

module.exports = router;


