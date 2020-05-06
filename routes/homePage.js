var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
const mysqlCon = require('./mysql-con');
const cors = require('cors');

// router.use(bodyParser());
router.use(express.json())
router.use(cors())
/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  mysqlCon.connect().then(function (con) {

    //console.log('conn====', con);
    console.log('reqqqqqqqqqq===', req.query.articleNumber);
    mysql = con;
    mysql.on('error', function (err, result) {
        console.log('error occurred. Reconneting...'.purple);
        //mysqlAPI.reconnect();
    });
    

    mysql.query('SELECT  * FROM    movie_list  WHERE   CityId  IN ('+req.query.Id+')', function (we, abc) {

        if (we) console.log('err', we);
        console.log('Works bro movieList', abc);
        res.send(JSON.stringify(abc));
         

    });

});
 
});

module.exports = router;
