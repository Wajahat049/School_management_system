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

router.post('/EnterSalary', (req, res) => {
    console.log('EnterSalary ', req.body);

    db.query("SELECT * FROM teacher_salary_status WHERE TEACHER_ID = ?", [req.body.TEACHER_ID], (error, results) => {
        // console.log(error)
        if (results.length > 0) {
            res.render('/adminview_teacher_salary_entry', { message: 'Already Present' })
        }
        else {
            db.query("INSERT INTO teacher_salary_status (TEACHER_ID, SALARY_DATE, SALARY_STATUS) VALUES (?, ?, ?)", [req.body.TEACHER_ID, req.body.SALARY_DATE, req.body.SALARY_STATUS], (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    alert("Enter Successfull");
                }
            });
            db.query("INSERT INTO teacher_salary_amount (TEACHER_ID, AMOUNT) VALUES (?, ?)", [req.body.TEACHER_ID, req.body.AMOUNT], (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    res.redirect('adminview_teacher_salary_status')
                }
            });
        } 
    })
}
);

module.exports = router;


