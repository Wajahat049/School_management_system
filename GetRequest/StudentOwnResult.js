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



router.get('/studentview_examresult', (req, res) => {

    // Final Result
    request('http://localhost:5007/StudentProfile', { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        db.query('SELECT examination_result_final.COURSE_CODE, student.STUDENT_ID, examination_result_final.MARKS FROM examination_result_final, student WHERE (examination_result_final.STUDENT_ID = student.STUDENT_ID) AND student.STUDENT_ID = ?', [body[0].STUDENT_ID], async (error, resultFinal) => {

            // console.log('Error', error);
            // console.log('Results', results[0]);
            // console.log('body', body[0]);





            // MID RESULT
            request('http://localhost:5007/StudentProfile', { json: true }, (err, response, body) => {
                if (err) { return console.log(err); }
                db.query('SELECT examination_result_mids.COURSE_CODE, student.STUDENT_ID, examination_result_mids.MARKS FROM examination_result_mids, student WHERE (examination_result_mids.STUDENT_ID = student.STUDENT_ID) AND student.STUDENT_ID = ?', [body[0].STUDENT_ID], async (error, results) => {

                    // console.log('Error', error);
                    // console.log('Results', results[0]);
                    // console.log('body', body[0]);
                    res.render('studentview_examresult', { OwnResult: resultFinal, OwnMidResult: results });

                })
            })
        })
    })




}
);



module.exports = router;
