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

router.post('/Editsalary', (req, res) => {
    console.log('Editsalary', req.body);

    db.query('UPDATE teacher_salary_status SET ? WHERE TEACHER_ID = ? AND SUBSTR(SALARY_DATE,1,10) = ?', [{ SALARY_STATUS: req.body.SALARY_STATUS }, req.body.TEACHER_ID, req.body.SALARY_DATE], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            alert("Edit Successfull");
        }
    });
    db.query('UPDATE teacher_salary_amount SET ? WHERE TEACHER_ID = ?', [{ AMOUNT: req.body.AMOUNT }, req.body.TEACHER_ID], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/adminview_teacher_salary_status')
        }
    });

});



module.exports = router;


