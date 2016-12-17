var express = require('express');
var router = express.Router();
var user_dal = require('../model/user_dal');

//User view to choose to view trasactions or market info.
router.get('/', function(req, res){
    if(req.query.Username == null){
        res.send("Username is missing...Go find it!");
    }
    else{
        user_dal.getById(req.query.Username, function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.render('User/userHome', {'result':result});
            }
        });
    }
});
router.get('/add', function(req, res){
    res.render('User/add');
});

router.get('/insert', function(req, res){
    user_dal.validateUser(req.query.Username, function(err, boolresult){
        if(err){
            res.send(err);
        }
        else {
            if (!boolresult.boolval) {
              user_dal.insert(req.query, function(err, result){
                  if(err){
                      res.send(err);
                  }
                  else{
                      res.render('User/successInsert', {'result':result});
                  }
              });
            }
            else{
                
            }
        }
    });
});

router.get('/history/', function(req, res){
    if(req.query.Username == null){
        res.send("Username is null... Make it not null");
    }
    else{
        user_dal.getTransactions(req.query.Username, function(err, result){
            
            if(err){
                res.send(err);
            }
            else{
                res.render('User/history', {'result':result, 'currUser': req.query.Username});
            }
        });
    }
});

router.get('/markets/', function(req, res){
    user_dal.getMarkets(function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.render('User/markets', {'result':result});
        }
    });
});

router.get('/buy/', function(req, res){
    user_dal.getBuyable(function(err, result){
        if(err) {
            res.send(err);
        }
        else{
            res.render('User/buy', {'result':result, 'currUser':req.query.Username});
        }
    });
});

router.get('/sell', function(req, res){
    res.render('User/sell');
});

router.get('/transact/', function(req, res){
    user_dal.transact(req.query, function(err, trans){
        if(err){
            res.send(err);
        }
        else{
            user_dal.getTransactions(req.query.Username, function(err, result){
                if(err){
                    res.send(err);
                }
                else{
                    res.render('User/history', {'result':result, 'currUser': req.query.Username});
                }
            });
        }
    });
});

module.exports = router;