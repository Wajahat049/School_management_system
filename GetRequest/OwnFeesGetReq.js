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



router.get('/studentview_paymnetdetail', (req, res) => {
    request('http://localhost:5007/OwnFees', { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        // console.log('explanation', body[0].TEACHER_ID);
        db.query('SELECT students_exam_fees_status.AMOUNT, students_exam_fees_status.FEE_STATUS, SUBSTR(students_exam_fees_status.DATE,1,10) AS DATE FROM students_exam_fees_status WHERE students_exam_fees_status.STUDENT_ID = ?', [body[0].STUDENT_ID], async (error, results) => {
            // console.log('Error', error);
            // console.log('Results', results);



            request('http://localhost:5007/OwnFees', { json: true }, (err, response, annualbody) => {
                if (err) { return console.log(err); }
                // console.log('explanation', body[0].TEACHER_ID);
                db.query('SELECT students_annual_fees_status.AMOUNT, students_annual_fees_status.FEE_STATUS, SUBSTR(students_annual_fees_status.DATE,1,10) AS DATE FROM students_annual_fees_status WHERE students_annual_fees_status.STUDENT_ID = ?', [annualbody[0].STUDENT_ID], async (error, annualresults) => {
                    // console.log('Error', error);
                    // console.log('Results', results);


                    request('http://localhost:5007/OwnFees', { json: true }, (err, response, monthlybody) => {
                        if (err) { return console.log(err); }
                        // console.log('explanation', body[0].TEACHER_ID);
                        db.query('SELECT students_monthly_fees_status.AMOUNT, students_monthly_fees_status.FEE_STATUS, SUBSTR(students_monthly_fees_status.DATE,1,10) AS DATE FROM students_monthly_fees_status WHERE students_monthly_fees_status.STUDENT_ID = ?', [monthlybody[0].STUDENT_ID], async (error, monthlyresults) => {
                            // console.log('Error', error);
                            // console.log('Results', results);
                            res.render('studentview_paymnetdetail', { OwnAnnualFees: annualresults, OwnExamFees: results, OwnMonthlyFees: monthlyresults });

                        })

                    })

                })

            })
        })
    })

});







module.exports = router;
