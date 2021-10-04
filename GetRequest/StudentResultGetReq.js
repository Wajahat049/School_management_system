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


// FINAL RESULT
router.get('/result', (req, res) => {
    // console.log(req.body);  
    db.query("SELECT student.STUDENT_ID, student.STUDENT_NAME, student.STUDENT_CLASS, subject.SUBJECT_NAME, examination_result_final.MARKS FROM student, examination_result_final, subject  WHERE (student.STUDENT_ID = examination_result_final.STUDENT_ID AND examination_result_final.COURSE_CODE = subject.COURSE_CODE)", (error, results) => {
        // console.log(error)
        console.log('StudentResults', results)
        if (results.length > 0) {
            res.send(results)
        }
    })
}
);


router.get('/adminview_student_result_status', (req, res) => {
    request('http://localhost:5007/result', { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        console.log('explanation', body);


            request('http://localhost:5007/midresult', { json: true }, (err, response, Midbody) => {
                if (err) { return console.log(err); }
                console.log('explanation', body);
                res.render('adminview_student_result_status', { StudentResult: body, StudentMidResult: Midbody });

            });
    });
});





// MID RESULT
router.get('/midresult', (req, res) => {
    // console.log(req.body);  
    db.query("SELECT student.STUDENT_ID, student.STUDENT_NAME, student.STUDENT_CLASS, subject.SUBJECT_NAME, examination_result_mids.MARKS FROM student, examination_result_mids, subject  WHERE (student.STUDENT_ID = examination_result_mids.STUDENT_ID AND examination_result_mids.COURSE_CODE = subject.COURSE_CODE)", (error, results) => {
        // console.log(error)
        console.log('StudentResults', results)
        if (results.length > 0) {
            res.send(results)
        }
    })
});




module.exports = router;
