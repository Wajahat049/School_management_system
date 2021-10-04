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


// FINALRESULTDLT
router.post('/DltFinalMarks', (req, res) => {
    // console.log('DltFinalMarks ', req.body);
    var rbt = Number(req.body.STUDENT_ID)
    console.log('rbt', rbt)
    db.query("DELETE FROM examination_result_final WHERE STUDENT_ID = ? AND COURSE_CODE = ?", [rbt, req.body.COURSE_CODE], (error, results) => {
        res.redirect('adminview_student_result_status')
    })
});


// MIDSRESULTDLT
router.post('/DltMidMarks', (req, res) => {
    // console.log('DltMidMarks ', req.body);
    var rbt = Number(req.body.STUDENT_ID)
    console.log('rbt', rbt)
    db.query("DELETE FROM examination_result_mids WHERE STUDENT_ID = ? AND COURSE_CODE = ?", [rbt, req.body.COURSE_CODE], (error, results) => {
        res.redirect('adminview_student_result_status')
    })
});



module.exports = router;


