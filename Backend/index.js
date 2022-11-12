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

app.get('/getLoginSellerName/:Id', (req, res) => {
    let id = req.params.Id;
    let getQuery = "Select FirstName,LastName From seller_user WHERE Email = '"+id+"'";
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


/*For Seller Registration code start from here*/
/*------------------------------------------- */
/*------------------------------------------- */


// This will check that same email id with new creating account exist or not
app.post('/sellerSignUpUserValid', (req, res) => {

    let email = req.body.email;
    let getQuery = "Select Id From seller_user WHERE Email = '"+email+"'";
    con.query(getQuery, (err, result) =>{
        if (result.length > 0){
            res.send({
                message:'Data',
                data:result[0].Id
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
    console.log("dsdss dds ",email);
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
    let getQuery = 'Select Id, Name, Picture, SellPrice, Discount, Description From product';
    con.query(getQuery, (err, result) =>{
        if (err){
            console.log("Error");
            res.send({
                data:null
            })
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
    id = id.replaceAll('"', '')
    let getQuery = "SELECT prdBrand.Br As Brand, prdBrand.Id As Id, prdBrand.Sellprice As SellPrice, prdBrand.Description As Description, prdBrand.Discount As Discount, prdBrand.Quantity As Quantity, prdBrand.Name As Name, prdBrand.Picture As Picture, seller_user.FirstName As FName, seller_user.LastName As LName, seller_user.City As SellerCity FROM (SELECT product_brand.Brand As Br, Pr.Id As Id, Pr.SellPrice As SellPrice, Pr.Description As  Description, Pr.Discount As Discount, Pr.Quantity As Quantity, Pr.Name As Name, Pr.Picture As  Picture, Pr.Seller_Id As SellerId FROM (SELECT Id, Brand_Id, SellPrice, Description, Discount, Quantity, Name, Picture, Seller_Id FROM product WHERE Id = '"+id+"') As Pr, product_brand WHERE Pr.Brand_Id = product_brand.Id) As prdBrand, seller_user WHERE prdBrand.SellerId = seller_user.Id ";
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

app.get('/getProductQuantity/:Id', (req, res) => {
    let id = req.params.Id;
    id = id.replaceAll('"', '');
    let getQuery = "SELECT Quantity FROM `product` WHERE Id = '"+id+"'";
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

app.get('/getProductName/:Id', (req, res) => {
    let id = req.params.Id;
    id = id.replaceAll('"', '');
    let getQuery = "SELECT Name FROM `product` WHERE Id = '"+id+"'";
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

app.get('/getProductBrandName/:Id', (req, res) => {
    let id = req.params.Id;
    id = id.replaceAll('"', '');
    let getQuery = "SELECT Brand FROM `product`, product_brand WHERE product.Id = '"+id+"' AND product_brand.Id = product.Brand_Id";
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
app.get('/getProductPrice/:Id', (req, res) => {
    let id = req.params.Id;
    id = id.replaceAll('"', '');
    let getQuery = "SELECT Brand FROM `product`, product_brand WHERE product.Id = '"+id+"' AND product_brand.Id = product.Brand_Id";
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


app.post('/addProductValid', (req, res) => {

    let pname=req.body.pname;
    let postQuery = "SELECT Name from product WHERE Name='"+pname+"' ";
    con.query(postQuery, (err, result) =>{
        if (result==null)
        {
            res.send({
                message:'Data not Inserted',
                // data:result[0].Id
                data:result.insertId

            })
        }
        else{
            res.send({
                message:'Data Inserted',
                data:null,
                
            })
        }
        if(err)
        {
            console.log("err",err);
        }

        console.log("insert");
    })
})

/*------------------------------------------ */
/*------------------------------------------ */
/*   For  Buyer Deliver Address starts here  */


/*------------------------------------------ */
/*------------------------------------------ */
/*   For  Buyer Deliver Address ends here   */
app.post('/saveBuyerAddress', (req, res) => {
    let buyer_Address_Name = req.body.fullName;
    let buyer_Address_Phone = req.body.phoneNo;
    let buyer_Address_Colony = req.body.colSubLocLan;
    let buyer_Address_NickName = req.body.nickName;
    let buyer_Address_Province = req.body.province;
    let buyer_Address_City = req.body.city;
    let buyer_Address_Building = req.body.buiHouFloStr;
    console.log("In index");
    let postQuery = "INSERT INTO buyer_Address (FullName, PhoneNo, Buildin_House_Street_Floor, Colony_Submark_Locality_Landmark, Province, City, Buyer_User_Id, NickName) VALUES ('"+buyer_Address_Name+"', '"+buyer_Address_Phone+"', '"+buyer_Address_Building+"', '"+buyer_Address_Colony+"', '"+buyer_Address_Province+"', '"+buyer_Address_City+"', '1', '"+buyer_Address_NickName+"')";
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




/*------------------------------------------ */
/*------------------------------------------ */
/*   For  Product  code  ends  from  here    */
app.post('/addProduct', (req, res) => {

    var file = req.files.pimage;
    // var img_name=file.name;

    console.log("addProduct in index.js");
    if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" || file.mimetype=="image/jpg" ){
                                
        file.mv('public/images/upload_images/'+file.name, function(err) {});
    }

    let pname=req.body.pname;
    let pdescription=req.body.description;
    let pimage=req.body.pimage;
    // let pimage="assets/p1.jpg";
    let sellerid=req.body.sellerid;
    let categoryid=req.body.categoryid;
    let brandid=req.body.brandid;

    let buyPrice=req.body.buyPrice;
    buyPrice=String(buyPrice);
    let sellPrice=req.body.sellPrice;
    sellPrice=String(sellPrice);
    let discount=req.body.discount;
    discount=String(discount);
    let quantity="0";
    let stockDate=new Date();
    console.log("date:",stockDate);  //C:\fakepath\p2.jpg
    

    let postQuery = "INSERT INTO product (Name, Description,BuyPrice,SellPrice,Discount,Quantity,AddStockDate ,Picture,Seller_Id,Category_Id,Brand_Id) VALUES ('"+pname+"', '"+pdescription+"','"+buyPrice+"','"+sellPrice+"','"+discount+"','"+quantity+"','"+stockDate+"', '"+pimage+"','"+sellerid+"','"+categoryid+"','"+brandid+"')";
    con.query(postQuery, (err, result) =>{
        if (err){
            res.send({
                message:'Data Inserted',
                data:null
            })
            // console.log(result.insertId);
            
        }
    })
})
    
