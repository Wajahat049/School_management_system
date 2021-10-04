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


// MONTHLYFEESDLT
router.post('/DltMonthlyFees', (req, res) => {
    // console.log('DltFees ', req.body);
    var rbt = Number(req.body.STUDENT_ID)
    console.log('rbt', rbt)
    db.query("DELETE FROM students_monthly_fees_status WHERE STUDENT_ID = ?", [rbt], (error, results) => {
        res.redirect('adminview_student_fee_status')
    })
});


// ANNUALFEESDLT
router.post('/DltAnnualFees', (req, res) => {
    // console.log('DltFees ', req.body);
    var rbt = Number(req.body.STUDENT_ID)
    console.log('rbt', rbt)
    db.query("DELETE FROM students_annual_fees_status WHERE STUDENT_ID = ?", [rbt], (error, results) => {
        res.redirect('adminview_student_fee_status')
    })
});


// EXAMFEESDLT
router.post('/DltExamFees', (req, res) => {
    // console.log('DltFees ', req.body);
    var rbt = Number(req.body.STUDENT_ID)
    console.log('rbt', rbt)
    db.query("DELETE FROM students_exam_fees_status WHERE STUDENT_ID = ?", [rbt], (error, results) => {
        res.redirect('adminview_student_fee_status')
    })
});
module.exports = router;


