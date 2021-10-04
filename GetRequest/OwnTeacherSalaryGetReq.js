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



router.get('/teachersalarydetail', (req, res) => {
    request('http://localhost:5007/OwnTeacherSalary', { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        // console.log('explanation', body[0].TEACHER_ID);
        db.query('SELECT amount.AMOUNT, salary.SALARY_STATUS, SUBSTR(salary.SALARY_DATE,1,10) AS SALARY_DATE FROM teacher_salary_amount AS amount, teacher_salary_status As salary WHERE (salary.TEACHER_ID = amount.TEACHER_ID) AND salary.TEACHER_ID = ?', [body[0].TEACHER_ID], async (error, results) => {
            // console.log('Error', error);
            console.log('Results', results);
            res.render('teachersalarydetail',{OwnSalary:results});
    
        })
    })

}
);
        


        



    module.exports = router;
