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



router.get('/status', (req, res) => {
    // console.log(req.body);
    db.query("SELECT teacher.TEACHER_NAME, salary.TEACHER_ID, SUBSTR(salary.SALARY_DATE,1,10) AS SALARY_DATE, salary.SALARY_STATUS, AMOUNT.AMOUNT FROM teacher, teacher_salary_status AS salary, teacher_salary_amount AS AMOUNT  WHERE (teacher.TEACHER_ID = salary.TEACHER_ID AND teacher.TEACHER_ID = AMOUNT.TEACHER_ID)", (error, results) => {
        // console.log(error)
        // console.log('Results',results)
        if (results.length > 0) {
            res.send(results)
        }
    })
}
);


router.get('/adminview_teacher_salary_status',(req,res) => {
  request('http://localhost:5007/status', { json: true }, (err, response, body) => {
  if (err) { return console.log(err); }
//   console.log('explanation',body);
  res.render('adminview_teacher_salary_status', {Status: body});

});
});



module.exports = router;
