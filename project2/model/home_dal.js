var mysql = require('mysql');
var db = require('./db_connection');

var connection = mysql.createConnection(db.config);


exports.getAll = function(callback){
    var query = 'select * from Users';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};


