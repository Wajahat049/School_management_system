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

router.post('/DltSalary', (req, res) => {
    console.log('DltSalary ', req.body);
    var rbt = Number(req.body.TEACHER_ID)
    // console.log('rbt', rbt)
    db.query("DELETE FROM teacher_salary_status WHERE TEACHER_ID = ?", [rbt], (error, results) => {
})
    db.query("DELETE FROM teacher_salary_amount WHERE TEACHER_ID = ?", [rbt], (error, results) => {
        res.redirect('adminview_teacher_salary_status')
    })
}
);

module.exports = router;


