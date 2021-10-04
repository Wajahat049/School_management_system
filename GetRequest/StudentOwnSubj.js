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



router.get('/studentview_subject', (req, res) => {
    request('http://localhost:5007/StudentProfile', { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        db.query('SELECT subject.COURSE_CODE, subject.SUBJECT_NAME, student.STUDENT_CLASS FROM subject, student WHERE (subject.CLASS = student.STUDENT_CLASS) AND student.STUDENT_ID = ?', [body[0].STUDENT_ID], async (error, results) => {
        
            console.log('Error', error);
            console.log('Results', results[0]);
            console.log('body', body[0]);
            res.render('studentview_subject',{OwnSubj:results});
    
        })
    })

}
);



module.exports = router;
