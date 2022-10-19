const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');
const e = require('cors');
// const { Component } = require('@angular/core');

app.use(cors());
app.use(bodyparser.json());

const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)

})


  //declare mysql variable


  // Create Mysql connection
  
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ecommercedb',
    port:'3306',

})

con.connect(err=>{
    if(err)
    {
        console.log(err,'Data Base Not Connected');
    }
    console.log('Data Base Connected');

})


//This will get user data
app.get('/buyerUser', (req, res) => {
    let getQuery = 'Select * From buyer_user';
    con.query(getQuery, (err, result) =>{
        if (err){
            console.log("Error");
            res.send('Error')
        }
        if(result.length > 0){
            res.send({
                message:'Data',
                data:result
            });
        }    
    })
})

// This will check that sign in user already exist or not
app.post('/buyerUserSignInValid', (req, res) => {
    let check_buyer_email = req.body.email;
    let check_buyer_pin = req.body.password;
    let getQuery = "Select * From buyer_user WHERE Email = '"+check_buyer_email+"' And Password = '"+check_buyer_pin+"'";
    con.query(getQuery, (err, userResult) =>{
        if (userResult.length > 0){
            res.send({
                message:'Data',
                data:userResult
            });
        }
        else{
            res.send({
                message:'Data',
                data:null

            });
        }    
    })

})

// This will check that same email id with new creating account exist or not
app.post('/buyerUserSignUpValid', (req, res) => {
    let check_buyer_email = req.body.email;
    let getQuery = "Select * From buyer_user WHERE Email = '"+check_buyer_email+"'";
    con.query(getQuery, (err, userResult) =>{
        if (userResult.length > 0){
            res.send({
                message:'Data',
                data:userResult
            });
        }
        else{
            res.send({
                message:'Data',
                data:null
            });
        }    
    })

})


app.post('/buyerUser', (req, res) => {
    let buyer_email = req.body.email;
    let buyer_pin = req.body.password;
    let buyer_fName = req.body.fullname;
    let postQuery = "INSERT INTO buyer_user (Email, Password, FullName) VALUES ('"+buyer_email+"', '"+buyer_pin+"', '"+buyer_fName+"')";
    con.query(postQuery, (err, result) =>{
        if (err){
            res.send({
                message:'Data Inserted',
                data:null
            })
            
        }
    })
})


/*For Seller Registration code start from here*/
/*------------------------------------------- */
/*------------------------------------------- */


// This will check that same email id with new creating account exist or not
app.post('/sellerSignUpUserValid', (req, res) => {

    let email = req.body.email;
    let getQuery = "Select * From seller_user WHERE Email = '"+email+"'";
    con.query(getQuery, (err, result) =>{
        if (result.length > 0){
            res.send({
                message:'Data',
                data:result
            });
        }
        else{
            res.send({
                message:'Data',
                data:null
            });
        }    
    })
})


// This function will insert data into seller_user table
app.post('/insertSellerUser', (req, res) => {
    // current date
    let dateObj = new Date();
    // adjust 0 before single digit date
    let date = ("0" + dateObj.getDate()).slice(-2);
    // current month
    let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    // current year
    let year = dateObj.getFullYear();
    let currentDate = new Date();
    console.log("Date   ", currentDate);

    let fName = req.body.fName;
    let lName = req.body.lName;
    let email = req.body.email;
    let phoneNo = req.body.phoneNo;
    let cnicNo = req.body.cnicNo;
    let city = req.body.city;
    let address = req.body.address;
    let password = req.body.password;

    let postQuery = "INSERT INTO seller_user (FirstName, LastName, Email, PhoneNo, CnicNo, City, Address, Password, JoiningDate) VALUES ('"+fName+"', '"+lName+"', '"+email+"', '"+phoneNo+"', '"+cnicNo+"', '"+city+"', '"+address+"', '"+password+"', '"+currentDate+"')";
    con.query(postQuery, (err, result) =>{
        if (err){
            res.send({
                message:'Data Inser',
                data:null
            })
        }

    })
})

// This will check that sign in user is valid or not not
app.post('/sellerSignInUserValid', (req, res) => {

    let email = req.body.email;
    let password = req.body.password;
    let getQuery = "Select * From seller_user WHERE Email = '"+email+"' And Password = '"+password+"' ";
    con.query(getQuery, (err, result) =>{
        if (result.length > 0){
            res.send({
                message:'Data',
                data:result
            });
            
        }
        else{
            res.send({
                message:'Data',
                data:null
            });
        }    
    })
})




/*For Seller Registration code ends      here*/
/*------------------------------------------- */
/*------------------------------------------- */


app.post('/addProductValid', (req, res) => {

    let pname=req.body.pname;




    let postQuery = "SELECT Id from product WHERE Name='"+pname+"' ";
    con.query(postQuery, (err, result) =>{
        if (result!=null)
        {
            res.send({
                message:'Data Inserted',
                // data:result[0].Id
                data:result.insertId

            })
        }
        else{
            res.send({
                message:'Data Inserted',
                data:null
            })
        }

        console.log("insert",result.length());
    })
})


app.post('/addProduct', (req, res) => {

    let pname=req.body.pname;
    let pdescription=req.body.description;
    let pimage=req.body.pimage;
    let sellerid=req.body.sellerid;
    let categoryid=req.body.categoryid;
    let brandid=req.body.brandid;

    let buyPrice=10;
    let sellPrice=15;
    let discount=5;
    let quantity=7;
    let stockDate='20200502';



    let postQuery = "INSERT INTO product (Name, Description,BuyPrice,SellPrice,Discount,Quantity,AddStockDate ,Picture,Seller_Id,Category_Id,Brand_Id) VALUES ('"+pname+"', '"+pdescription+"','"+buyPrice+"','"+sellPrice+"','"+discount+"','"+quantity+"','"+stockDate+"', '"+pimage+"','"+sellerid+"','"+categoryid+"','"+brandid+"')";
    con.query(postQuery, (err, result) =>{
        if (err){
            res.send({
                message:'Data Inserted',
                data:null
            })
            
        }
    })
})