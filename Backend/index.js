const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');
const e = require('cors');

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
        else{
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
    let getQuery = "Select Id From buyer_user WHERE Email = '"+check_buyer_email+"' And Password = '"+check_buyer_pin+"'";
    con.query(getQuery, (err, userResult) =>{
        if (userResult.length > 0){
            res.send({
                message:'Data',
                data:userResult[0].Id
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
    let getQuery = "Select Id From buyer_user WHERE Email = '"+check_buyer_email+"'";
    con.query(getQuery, (err, userResult) =>{
        if(userResult != null){
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
        else{
            res.send({
                message:'Data Inserted',
                data:result.insertId
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
    let getQuery = "Select Id From seller_user WHERE Email = '"+email+"'";
    con.query(getQuery, (err, result) =>{
        if (result != null){
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
    let dateObj = new Date();
    let date = ("0" + dateObj.getDate()).slice(-2); // current date
    let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);  // current month
    let year = dateObj.getFullYear(); // current year
    currentDate = year+":"+month+":"+date;

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
        res.send({
            message:'Data Inserted',
            data:result.insertId
        })
        console.log(result.insertId)

    })
})

// This will check that sign in user is valid or not not
app.post('/sellerSignInUserValid', (req, res) => {

    let email = req.body.email;
    let password = req.body.password;
    let getQuery = "Select Id From seller_user WHERE Email = '"+email+"' And Password = '"+password+"' ";
    con.query(getQuery, (err, result) =>{
        if (result.length > 0){
            res.send({
                message:'Data',
                data:result[0].Id
            });
            
        }
        else{
            res.send({
                message:'Null',
                data:null
            });
        }    
    })
})

/*For Seller Registration code ends      here*/
/*------------------------------------------- */
/*------------------------------------------- */



/*   For  Product  code  start  from  here   */
/*------------------------------------------ */
/*------------------------------------------ */
app.get('/getProduct', (req, res) => {
    console.log("In get Product");
    let getQuery = 'Select * From product';
    con.query(getQuery, (err, result) =>{
        if (err){
            console.log("Error");
            res.send('Error')
        }
        else{
            res.send({
                message:'Data',
                data:result
            });
        }

    })
})

app.get('/getProduct/:Id', (req, res) => {
    let id = req.params.Id;
    let getQuery = "SELECT prdBrand.Br As Brand, prdBrand.Id As Id, prdBrand.Sellprice As SellPrice, prdBrand.Description As Description, prdBrand.Discount As Discount, prdBrand.Quantity As Quantity, prdBrand.Name As Name, prdBrand.Picture As Picture, seller_user.FirstName As FName, seller_user.LastName As LName, seller_user.City As SellerCity FROM (SELECT product_brand.Brand As Br, Pr.Id As Id, Pr.SellPrice As SellPrice, Pr.Description As  Description, Pr.Discount As Discount, Pr.Quantity As Quantity, Pr.Name As Name, 		  Pr.Picture As       Picture, Pr.Seller_Id As SellerId FROM (SELECT Id, Brand_Id, SellPrice, Description, Discount, Quantity, Name, Picture, Seller_Id FROM product WHERE Id = '"+id+"') As Pr, product_brand WHERE Pr.Brand_Id = product_brand.Id) As prdBrand, seller_user WHERE prdBrand.SellerId = seller_user.Id ";
    con.query(getQuery, (err, result) =>{
        if (err){
            console.log("Error");
            res.send('Error')
        }
        else{
            res.send({
                message:'Data',
                data:result
            });
        }

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




/*------------------------------------------ */
/*------------------------------------------ */
/*   For  Product  code  ends  from  here    */
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
