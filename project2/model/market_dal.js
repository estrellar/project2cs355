var mysql = require('mysql');
var db = require('./db_connection');

var connection = mysql.createConnection(db.config);

exports.getMarkets = function(callback){
    var query = 'select * from StockMarkets'
    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.getById = function(Id, callback){
    var query = 'select * from sm_view where smid = ?';
    var queryData = [Id];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};