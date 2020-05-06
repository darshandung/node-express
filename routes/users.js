var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
const mysqlCon = require('./mysql-con');
const cors = require('cors');

// router.use(bodyParser());
router.use(express.json())
router.use(cors())

/* GET users listing. */
router.post('/', function(req, res, next) {
  var bodyResponse  =JSON.parse(req.body.x)
  
  mysqlCon.connect().then(function (con) {


    mysql = con;
        
    mysql.on('error', function (err, result) {
        console.log('error occurred. Reconneting...'.purple);
        //mysqlAPI.reconnect();
    });
    mysql.query("update customers set status=true where id in ("+(bodyResponse)+")", function (err, results) {

        if (err) console.log('err', err);
        console.log('Works bro get Posts', results);

        res.send(JSON.stringify(results));

    });
});
});

module.exports = router;
