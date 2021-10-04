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

router.post('/EditSubj', (req, res) => {
    console.log('EditSubj', req.body);

    db.query('UPDATE subject SET ? WHERE COURSE_CODE = ?', [{ TEACHER_ID: req.body.TEACHER_ID }, req.body.COURSE_CODE], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            alert("Edit Successfull");
            res.redirect('/adminview_subject')
        }
    });

});



module.exports = router;


