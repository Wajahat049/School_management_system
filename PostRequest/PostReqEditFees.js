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

// ANNUALFEES
router.post('/AnnualFeesEdit', (req, res) => {
    // console.log('EditAnnualFees ', req.body);
    var rbs = Number(req.body.STUDENT_ID)
    console.log('rbs', rbs)

    db.query('UPDATE students_annual_fees_status SET ? WHERE STUDENT_ID = ? AND SUBSTR(DATE,1,10) = ?', [{ FEE_STATUS: req.body.FEE_STATUS, AMOUNT: req.body.AMOUNT }, rbs, req.body.DATE], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            alert("Edit Successfull");
            res.redirect('/adminview_student_fee_status')
        }
    });
});



// EXAMFEES
router.post('/ExamFeesEdit', (req, res) => {
    // console.log('EditAnnualFees ', req.body);
    var rbs = Number(req.body.STUDENT_ID)
    // console.log('rbs', rbs)

    db.query('UPDATE students_exam_fees_status SET ? WHERE STUDENT_ID = ? AND SUBSTR(DATE,1,10) = ?', [{ FEE_STATUS: req.body.FEE_STATUS, AMOUNT: req.body.AMOUNT }, rbs, req.body.DATE], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            alert("Edit Successfull");
            res.redirect('/adminview_student_fee_status')
        }
    });
});



// MONTHLYFEES
router.post('/MonthlyFeesEdit', (req, res) => {
    // console.log('EditAnnualFees ', req.body);
    var rbs = Number(req.body.STUDENT_ID)
    // console.log('rbs', rbs)

    db.query('UPDATE students_monthly_fees_status SET ? WHERE STUDENT_ID = ? AND SUBSTR(DATE,1,10) = ?', [{ FEE_STATUS: req.body.FEE_STATUS, AMOUNT: req.body.AMOUNT }, rbs, req.body.DATE], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            alert("Edit Successfull");
            res.redirect('/adminview_student_fee_status')
        }
    });
});

module.exports = router;


