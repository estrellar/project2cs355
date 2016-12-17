var express = require('express');
var router = express.Router();
var market_dal = require('../model/market_dal');

router.get('/markets', function(req, res){
    market_dal.getMarkets(function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.render('market/markets', {'result':result});
        }
    });
});

router.get('/market/', function(req, res){
    if(req.query.Id == null){
        res.send("Dont know wat market chu talkin bout");
    }
    else{
        market_dal.getById(req.query.Id, function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.render('market/market', {'result':result});
            }
        });
    }
});


module.exports = router;