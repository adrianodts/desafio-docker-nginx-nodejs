const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

const mysql = require('mysql');
const con = mysql.createConnection(config);

con.connect(function(err) {
    if (err) throw err;

    //Creates table if it doesn't exists
    var sql = "create table if not exists people (id int not null auto_increment primary key, name VARCHAR(255))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table people created");
    });

    //Creates new record 
    var sqlInsert = `insert into people(name) values('Adriano')`;
    con.query(sqlInsert, (err, result) => {
        if (err) throw err;
        console.log("Record inserted successfully");
    });
    con.end();
});

app.get('/', function(req, res){
    
    var dados = [];
    var msg = `Full Cycle Rocks!`;

    var con = mysql.createConnection(config);

    con.connect(function(err) {
        var sqlQuery = 'select * from people';
        con.query(sqlQuery, (err, rows, fields) => {
            if (err) throw err;

            rows.forEach(function(row) {                
                dados.push(row.name);
            });
            
            res.render('index', {
                'msg': msg,
                'dados': dados
            });            
        });
        con.end();
    });
});

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

app.listen(port, () => {
    console.log('running on port '+ port);
})