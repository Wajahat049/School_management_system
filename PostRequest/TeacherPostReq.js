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
router.post('/TeacherSignUp', (req, res) => {
    console.log(req.body);

    db.query("SELECT * FROM teacher WHERE TEACHER_EMAIL = ?", [req.body.TEACHER_EMAIL], (error, results) => {
        console.log(error)
        if (results.length > 0) {
            res.render('/TeacherForm', { message: 'Email already in used' })
        }
        else {
            db.query("INSERT INTO teacher (TEACHER_NAME, TEACHER_EMAIL, TEACHER_PASSWORD, TEACHER_GENDER, TEACHER_AGE, TEACHER_QUALI, TEACHER_PHONENO) VALUES (?, ?, ?, ?, ?, ?, ?)", [req.body.TEACHER_NAME, req.body.TEACHER_EMAIL, req.body.TEACHER_PASSWORD, req.body.TEACHER_GENDER, req.body.TEACHER_AGE, req.body.TEACHER_QUALI, req.body.TEACHER_PHONENO], (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    alert("User Registered");
                    res.redirect('/TeacherForm')
                }
            });
        }
    })
}
);


//  LOGIN
router.post('/TeacherLogin', async (req, res) => {
    try {
        if (!req.body.TEACHER_EMAIL || !req.body.TEACHER_PASSWORD) {
            alert("Your Email or Password is incorrect");
            res.redirect('/TeacherForm');
        }
        // console.log(results);
        db.query('SELECT * FROM teacher WHERE TEACHER_EMAIL = ?', [req.body.TEACHER_EMAIL], async (error, results) => {
            // console.log('Results',results);
            if (!results || !(req.body.TEACHER_PASSWORD == results[0].TEACHER_PASSWORD)) {
                alert("Your Email or Password is incorrect");
                res.redirect('/TeacherForm');
                console.log(error)

            }
            else {
                // TeacherResult
                router.get('/OwnTeacherResult', (req, respo) => {
                    db.query('SELECT * FROM subject WHERE TEACHER_ID = ?', [results[0].TEACHER_ID], async (error, results) => {
                        // console.log(error)
                        // console.log(results)
                        if (results.length > 0) {
                            console.log('TeacherSubj', results)
                            respo.send(results)
                        }
                    })
                })


                // Teacher Portal
                res.redirect('/TeacherPortal');
                alert("Successfully Login")
                // console.log(results)


                // TeacherProfile
                router.get('/TeacherProfile', (req, res) => {
                    if (results.length > 0) {
                        res.send(results)
                    }
                })


                // Teacher Salary
                router.get('/OwnTeacherSalary', (req, response) => {
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
