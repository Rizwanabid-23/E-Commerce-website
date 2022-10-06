//declare mysql variable
var mysql = require('mysql');

// Create Mysql connection

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'expresspractice',
    port:'3306',

})

con.connect(err=>{
    if(err)
    {
        console.log(err,'Data Base Not Connected');
    }
    console.log('Data Base Connected');

})
