const express = require("express");
const bodyParser = require("body-parser");
//앞에서 export된 pool의 시작점인 db.js를 불러오기
const db = require("./db");

const EXPRESS_PORT = 5000;

const app = express();

//JSON형태로 오는 요청을 해석할 수 있도록 parser 사용
app.use(bodyParser.json());
//------------! 테이블 생성 !---------------/
//참고용으로 기록해두었으며, 실제 환경에서는 컨테이너 로드시 별도로 테이블을 생성합니다
/*
db.pool.query(`CREATE TABLE lists(
    id INT AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
)`, (err, results, fields) => {
    console.log(`results : ${results}`)
})
*/   
//--------------! API !--------------------/
//DB 테이블에 있는 모든 데이터를 프론트로 보내기
app.get('/api/values'), function (req, res, next) { //핸들러 생성
    db.pool.query("SELECT * FROM lists;", //DB에서 모든 데이터 가져오기
        (err, results, fields) => {
            if (err)
                return res.status(500).send(err)
            else
                return res.json(results)
        })
})

//프론트에서 입력한 값을 DB 테이블에 입력
app.post('/api/values', function (res, req, next) {
    db.pool.query(`INSERT INTO lists (values) VALUES("${req.body.value}");`, //bodyParser 사용
        (err, results, fields) => {
            if (err)
                return res.status(500).send(err)
            else
                return res.json({success: true, value: req.body.value})
    })
})

//------------! START EXPRESS !-----------------/

app.listen(EXPRESS_PORT, ()) => {
    console.log("app running on PORT 5000")
}