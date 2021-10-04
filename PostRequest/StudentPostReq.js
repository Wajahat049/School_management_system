const mysql = require("mysql");
const express = require('express');
const router = express.Router();
const alert = require('alert');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'school_management_system'
});


// SIGNUP
router.post('/StudentSignUp', (req, res) => {
    console.log(req.body);

    db.query("SELECT * FROM student WHERE STUDENT_EMAIL = ?", [req.body.STUDENT_EMAIL], (error, results) => {
        console.log(error)
        if (results.length > 0) {
            res.render('/StudentForm', { message: 'Email already in used' })
        }
        else {
            db.query("INSERT INTO student (STUDENT_NAME, STUDENT_EMAIL, STUDENT_PASSWORD, STUDENT_GENDER, STUDENT_CLASS, STUDENT_PHONENO, STUDENT_DATE_OF_BIRTH, STUDENT_DATE_OF_ADMISSION) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [req.body.STUDENT_NAME, req.body.STUDENT_EMAIL, req.body.STUDENT_PASSWORD, req.body.STUDENT_GENDER, req.body.STUDENT_CLASS, req.body.STUDENT_PHONENO, req.body.STUDENT_DATE_OF_BIRTH, req.body.STUDENT_DATE_OF_ADMISSION], (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    alert("User Registered");
                    res.redirect('/StudentForm')
                }
            });
        }
    })
}
);


//  LOGIN
router.post('/StudentLogin', async (req, res) => {
    try {
        if (!req.body.STUDENT_EMAIL || !req.body.STUDENT_PASSWORD) {
            alert("Your Email or Password is incorrect");
            res.redirect('/StudentForm');
        }
        // console.log('body',req.body);
        db.query('SELECT * FROM student WHERE STUDENT_EMAIL = ?', [req.body.STUDENT_EMAIL], async (error, results) => {
            console.log(req.body);
            if (!results || !(req.body.STUDENT_PASSWORD == results[0].STUDENT_PASSWORD)) {
                alert("Your Email or Password is incorrect");
                res.redirect('/StudentForm');
                console.log(error)

            }
            else {
                res.redirect('/StudentPortal');
                alert("Successfully Login")
                // console.log(results)


                // Student Portal
                router.get('/StudentProfile', (req, res) => {
                    if (results.length > 0) {
                        res.send(results)
                    }
                })


                // StudentFees
                router.get('/OwnFees', (req, response) => {
                    response.send(results)
                }
                );
            }
        })
    } catch (error) {
        console.log(error);
    }
});




module.exports = router;
