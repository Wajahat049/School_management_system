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


// MID RESULT
router.get('/teacherview_result', (req, res) => {
    request('http://localhost:5007/OwnTeacherResult', { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        // console.log('TeacherCourseCode', body[0]);
        var ResultList = []
        for (const bod of body) {
            // console.log(`A JavaScript type is: ${bod.COURSE_CODE}`)
            db.query('SELECT examination_result_mids.STUDENT_ID, subject.CLASS, examination_result_mids.COURSE_CODE, examination_result_mids.MARKS FROM examination_result_mids, subject WHERE (subject.COURSE_CODE = examination_result_mids.COURSE_CODE) AND subject.COURSE_CODE = ?', [bod.COURSE_CODE], async (error, results) => {
                ResultList.push(results[0])
                // console.log('Error', error);
                // console.log('TeacherResults', results[0]);
                // console.log('ResultList', ResultList)
                if (body.indexOf(bod) === body.length - 1) {
                    // console.log('ResultList2', ResultList)


                    // FINAL
                    var FinalResultList = []
                    for (const bodF of body) {
                        // console.log(`A JavaScript type is: ${bodF.COURSE_CODE}`)
                        db.query('SELECT examination_result_final.STUDENT_ID, subject.CLASS, examination_result_final.COURSE_CODE, examination_result_final.MARKS FROM examination_result_final, subject WHERE (subject.COURSE_CODE = examination_result_final.COURSE_CODE) AND subject.COURSE_CODE = ?', [bodF.COURSE_CODE], async (error, Finalresults) => {
                            FinalResultList.push(Finalresults[0])
                            console.log('Error', error);
                            // console.log('TeacherResults', Finalresults[0].COURSE_CODE);
                            console.log('ResultList', FinalResultList)
                        })
                        if (body.indexOf(bodF) == body.length - 1) {
                            // console.log('ResultList2', FinalResultList)
                            res.render('teacherview_result', { OwnResult: ResultList, OwnFinalResult: FinalResultList });

                        }
                        // console.log('body', body.indexOf(bod))
                        // console.log('bodyLength', body.length)
                    }




                    // res.render('teacherview_result', { OwnResult: ResultList, OwnFinalResult: FinalResultList });

                }

            })

            // console.log('body', body.indexOf(bod))
            // console.log('bodyLength', body.length)


        }

    })
}
);





// FINAL RESULT
// router.get('/teacherview_result', (req, res) => {
//     request('http://localhost:5007/OwnTeacherResult', { json: true }, (err, response, body) => {
//         if (err) { return console.log(err); }
//         console.log('TeacherCourseCode', body[0].COURSE_CODE);
//         var ResultList = []
//         for (const bod of body) {
//             console.log(`A JavaScript type is: ${bod.COURSE_CODE}`)
//             db.query('SELECT examination_result_final.STUDENT_ID, subject.CLASS, examination_result_final.COURSE_CODE, examination_result_final.MARKS FROM examination_result_final, subject WHERE (subject.COURSE_CODE = examination_result_final.COURSE_CODE) AND subject.COURSE_CODE = ?', [bod.COURSE_CODE], async (error, results) => {
//                 ResultList.push(results[0])
//                 // console.log('Error', error);
//                 console.log('TeacherResults', results[0].COURSE_CODE);
//                 console.log('ResultList', ResultList)
//             })
//             if (body.indexOf(bod) == body.length - 1) {
//                 console.log('ResultList2', ResultList)
//                 res.render('teacherview_result', { OwnFinalResult: ResultList });

//             }
//             console.log('body', body.indexOf(bod))
//             console.log('bodyLength', body.length)


//         }
//     })

// }
// );



module.exports = router;




module.exports = router;
