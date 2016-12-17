var express = require('express');
var router = express.Router();
var home_dal = require('../model/home_dal');


//Home view where choosing the user to view info about.
router.get('/all', function(req, res){
    home_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.render('home/homeViewUsers', {'result':result});
        }
    });
});

module.exports = router;