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


// ANNUAL FEES
router.get('/fees', (req, res) => {
    // console.log(req.body);
    db.query("SELECT student.STUDENT_ID, student.STUDENT_NAME, student.STUDENT_CLASS, students_annual_fees_status.AMOUNT , SUBSTR(students_annual_fees_status.DATE,1,10) AS PAYMENT_DATE, students_annual_fees_status.FEE_STATUS FROM student, students_annual_fees_status  WHERE student.STUDENT_ID = students_annual_fees_status.STUDENT_ID ", (error, results) => {
        // console.log(error)
        // console.log('Results',results)
        if (results.length > 0) {
            res.send(results)
        }
    })
}
);


router.get('/adminview_student_fee_status', (req, res) => {
    request('http://localhost:5007/fees', { json: true }, (err, response, FeesBody) => {
        if (err) { return console.log(err); }
        //   console.log('explanation',FeesBody);


        request('http://localhost:5007/Examfees', { json: true }, (err, response, body) => {
            if (err) { return console.log(err); }
            // console.log('explanation', body);





            request('http://localhost:5007/Monthlyfees', { json: true }, (err, response, MonthlyFeesBody) => {
                if (err) { return console.log(err); }
                // console.log('explanation', MonthlyFeesBody);
                res.render('adminview_student_fee_status', { ExamFees: body, Fees: FeesBody, MonthlyFees: MonthlyFeesBody });

            });
        });

    });
});





// EXAMINATION FEES
router.get('/Examfees', (req, res) => {
    // console.log(req.body);
    db.query("SELECT student.STUDENT_ID, student.STUDENT_NAME, student.STUDENT_CLASS, students_exam_fees_status.AMOUNT , SUBSTR(students_exam_fees_status.DATE,1,10) AS EXAMFEE_DATE, students_exam_fees_status.FEE_STATUS FROM student, students_exam_fees_status  WHERE student.STUDENT_ID = students_exam_fees_status.STUDENT_ID ", (error, results) => {
        // console.log(error)
        console.log('Results', results)
        if (results.length > 0) {
            res.send(results)
        }
    })
}
);






// MONTHLY FEES
router.get('/MonthlyFees', (req, res) => {
    // console.log(req.body);
    db.query("SELECT student.STUDENT_ID, student.STUDENT_NAME, student.STUDENT_CLASS, students_monthly_fees_status.AMOUNT , SUBSTR(students_monthly_fees_status.DATE,1,10) AS MONTHLYFEE_DATE, students_monthly_fees_status.FEE_STATUS FROM student, students_monthly_fees_status  WHERE student.STUDENT_ID = students_monthly_fees_status.STUDENT_ID ", (error, results) => {
        // console.log(error)
        // console.log('Results',results)
        if (results.length > 0) {
            res.send(results)
        }
    })
}
);



module.exports = router;
