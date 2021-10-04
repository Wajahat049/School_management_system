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
router.post('/EnterAnnualFees', (req, res) => {
    console.log('EnterAnnualFees ', req.body);

    db.query("SELECT * FROM students_annual_fees_status WHERE STUDENT_ID = ?", [req.body.STUDENT_ID], (error, results) => {
        // console.log(error)
        if (results.length > 0) {
            res.render('adminview_student_fee_status', { message: 'Already Present' })
        }
        else {
            db.query("INSERT INTO students_annual_fees_status (STUDENT_ID, DATE, FEE_STATUS, AMOUNT) VALUES (?, ?, ?, ?)", [req.body.STUDENT_ID, req.body.DATE, req.body.FEE_STATUS, req.body.AMOUNT], (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    alert("Enter Successfull");
                    res.redirect('adminview_student_fee_status')
                }
            });
        } 
    })
}
);




// EXAMFEES
router.post('/EnterExamFees', (req, res) => {
    console.log('EnterExamFees ', req.body);

    db.query("SELECT * FROM students_exam_fees_status WHERE STUDENT_ID = ?", [req.body.STUDENT_ID], (error, results) => {
        // console.log(error)
        if (results.length > 0) {
            res.render('adminview_student_fee_status', { message: 'Already Present' })
        }
        else {
            db.query("INSERT INTO students_exam_fees_status (STUDENT_ID, DATE, FEE_STATUS, AMOUNT) VALUES (?, ?, ?, ?)", [req.body.STUDENT_ID, req.body.DATE, req.body.FEE_STATUS, req.body.AMOUNT], (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    alert("Enter Successfull");
                    res.redirect('adminview_student_fee_status')
                }
            });
        } 
    })
}
);



// MONTHLYFEES
router.post('/MonthlyFees', (req, res) => {
    console.log('MonthlyFees ', req.body);

    db.query("SELECT * FROM students_monthly_fees_status WHERE STUDENT_ID = ?", [req.body.STUDENT_ID], (error, results) => {
        // console.log(error)
        if (results.length > 0) {
            res.render('adminview_student_fee_status', { message: 'Already Present' })
        }
        else {
            db.query("INSERT INTO students_monthly_fees_status (STUDENT_ID, DATE, FEE_STATUS, AMOUNT) VALUES (?, ?, ?, ?)", [req.body.STUDENT_ID, req.body.DATE, req.body.FEE_STATUS, req.body.AMOUNT], (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    alert("Enter Successfull");
                    res.redirect('adminview_student_fee_status')
                }
            });
        } 
    })
}
);

module.exports = router;


