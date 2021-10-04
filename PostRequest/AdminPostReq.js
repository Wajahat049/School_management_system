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


// SIGNUP
router.post('/AdminSignUp', (req, res) => {
    console.log(req.body);

    db.query("SELECT * FROM admin WHERE ADMIN_EMAIL = ?", [req.body.ADMIN_EMAIL], (error, results) => {
        console.log(error)
        if (results.length > 0) {
            res.render('/AdminForm', { message: 'Email already in used' })
        }
        else {
            db.query("INSERT INTO admin (ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_GENDER, ADMIN_AGE, ADMIN_PHONENO) VALUES (?, ?, ?, ?, ?, ?)", [req.body.ADMIN_NAME, req.body.ADMIN_EMAIL, req.body.ADMIN_PASSWORD, req.body.ADMIN_GENDER, req.body.ADMIN_AGE, req.body.ADMIN_PHONENO], (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    alert("User Registered");
                    res.redirect('/AdminForm')
                }
            });
        }
    })
}
);


//  LOGIN
router.post('/AdminLogin', async (req, res) => {
    try {
        if (!req.body.ADMIN_EMAIL || !req.body.ADMIN_PASSWORD) {
            alert("Your Email or Password is incorrect");
            res.redirect('/AdminForm');
        }
        // console.log(results);
        db.query('SELECT * FROM admin WHERE ADMIN_EMAIL = ?', [req.body.ADMIN_EMAIL], async (error, results) => {
            // console.log(results);
            if (!results || !(req.body.ADMIN_PASSWORD == results[0].ADMIN_PASSWORD)) {
                alert("Your Email or Password is incorrect");
                res.redirect('/AdminForm');
                console.log(error)

            }
            else {
                res.redirect('/AdminPortal');
                alert("Successfully Login")
                console.log(results)

                // AdminPortal
                router.get('/AdminDetail', (req, res) => {
                    if (results.length > 0) {
                        res.send(results)
                    }
                })

            }
        })
    } catch (error) {
        console.log(error);
    }
});






module.exports = router;
