var mysql = require('mysql');
var db = require('./db_connection');

var connection = mysql.createConnection(db.config);

exports.getById = function(Username, callback){
    var query = 'select * from Users where Username= ?';
    var queryData = [Username];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.getTransactions = function(Username, callback){
    var query = 'select * from history_view where Buyer = ? or Seller = ?';
    var queryData = [Username, Username];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'insert into Users (Username, Email, FirstName, LastName, Pass)' +
        ' values (?, ?, ? , ?, ?)';

    var queryData = [params.Username, params.Email, params.FirstName, params.LastName, params.Pass];
    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

exports.validateUser = function (params, callback){
    var query = 'select validateUser ( ? ) as boolval';
    var queryData = [params.Username];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.getBuyable = function(callback){
    var query = 'select Companies.Name as CName, S.Id as Sid, S.Name as SName, sum(total) as Total from Stocks S join ' +
        '(select S.Id as id, C.Volume as total from Companies C join Stocks S ' +
        ' on C.Id = S.CompanyId union ' +
        ' select negs.StockId  as id, negs.negval as total from negs ' +
        ' ) q on q.id = S.Id' +
        ' join Companies on Companies.Id = S.CompanyId ' +
        ' group by S.Name ';
    connection.query(query, function(err, result){
        callback(err, result);
    });

};

exports.transact = function(params, callback){
    var query = 'Insert into Owners (Username, StockId, Qty) value (?, ? ,?)';
    var queryData = [params.UName, params.StockId, params.Qty];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

