const express = require('express');
const path =  require("path")
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const details = require('./details.json');
const fileUpload = require("./fileUpload");
const { escape } = require('querystring');
const { get } = require('http');

app.use(cors({origin: "*"}));
app.use(cors());
app.use(bodyparser.json());
app.use("/uploads/images", express.static(path.join("uploads", "images")));

const port = 3000;
let mailsend = false;

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
    else{
        console.log('Data Base Connected');
    }

})

//Host
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Ecommerce<h1>");
})

app.get('/getCategories', (req, res) => {
    let getQuery = 'Select * From lookup Where Category = "ProductCategory"';
    con.query(getQuery, (err, result) =>{
        if (err){
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

app.get('/getSubCategories', (req, res) => {
    let getQuery = 'SELECT * FROM `product_category` ORDER BY `product_category`.`Sub_Category` ASC';
    // let getQuery = "SELECT Distinct Id, Sub_Category FROM product_category Left Join product ON product_category.Id=product.Category_Id And product.Quantity >=1  ORDER BY product_category.Sub_Category ASC";
    con.query(getQuery, (err, result) =>{
        if (err){
            res.send
            ({
                message:'Not Get',
                data:null
            })
        }
        else{
            res.send
            ({
                message:'Found Data',
                data:result
            });
        }

    })
})

app.get('/getProductBrands', (req, res) => {
    let getQuery = 'SELECT * FROM `product_brand` ORDER BY `product_brand`.`Brand` ASC';
    con.query(getQuery, (err, result) =>{
        if (err){
            res.send
            ({
                message:'Not Get',
                data:null
            })
        }
        else{
            res.send
            ({
                message:'Found Data',
                data:result
            });
        }

    })
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

//This will get buyer user order data
app.get('/buyerUserOrders/:Id', (req, res) => {
    let getQuery = `Select * From buyer_user_orders where buyer_user_id = ${req.params.Id}`;
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

// This will delete buyer user order data
app.delete('/buyerUserOrdersDelete',(req,res) =>{
    let orderId = req.body.userData.Id;
    let getQuery = `Delete From buyer_user_orders where OrderId = ${orderId} and Buyer_User_Id = ${req.body.userData.Buyer_User_Id}`;
    con.query(getQuery, (err, result) =>{
        if (err){
            res.send('Error')
        }
        else{
            res.send({
                message:'Order Deleted!',
                // data:result
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

app.post('/sendVerificationCode/:code', (req, res) => {
    try{
        let user = req.body;
        let verificationCode = req.params.code;
        verificationCode = verificationCode.replaceAll('"', '');
        console.log("mamamam ",user);
        console.log("vfvfvvfvfvf ",verificationCode);
        
        // let verificationCode = Math.floor(100000 + Math.random() * 900000);
        sendMail(user, verificationCode,  info => {
            if(mailsend)
            {
                res.send({data:"sended"});
            }
            else
            {
                res.send({data:null});
            }

        })
    }
    catch
    {
        res.send({data:null});
    }

})

async function sendMail(user , code, callback) {
    try{
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: details.email, // generated ethereal user
                pass: details.password, // generated ethereal password
            },
        });
        // send mail with defined transport object
        let mailOptions = {
            from: '"Ecommerce Website"', // sender address
            to: user.email,
            subject: "Hello", // Subject line
            html: "<b>Thank You For Joininng Us. Use this '"+code+"' OTP against '"+user.email+"' to create account</b> ", // html body
        };
        let info =  await transporter.sendMail(mailOptions);
        mailsend = true;
        callback(info);
    }
    catch
    {
        mailsend = false;
        callback();
    }


}

// This will check that same email id with new creating account exist or not
app.post('/buyerUserSignUpValid', (req, res) => {
    let check_buyer_email = req.body.email;
    let getQuery = "Select Id From buyer_user WHERE Email = '"+check_buyer_email+"'";
    con.query(getQuery, (err, userResult) =>{
        // console.log("userresult", userResult);
        if(userResult.length == 0){
            res.send({

                message:'Null',
                data:null
            });
            
            console.log("null");
        }
        else{
            res.send({
                message:'Data',
                data:userResult
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
    // id = id.replaceAll('"', '');
    console.log("id", id);
    let getQuery = `Select * From seller_user WHERE Id = ${id}`;
    con.query(getQuery, (err, result) =>{
        if (err){
            console.log("Error");
            res.send('Error')
        }
        else{
            res.send({
                message:'Data',
                data:result[0].FirstName+" "+result[0].LastName
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
    let getQuery = 'Select Id, Name, Picture, SellPrice, Discount, Description From product Where Quantity >= 1';
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

app.get('/getProductByCategory/:id', (req, res) => {
    id = req.params.id;
    id = id.replaceAll('"', '');
    let getQuery = "Select Id, Name, Picture, SellPrice, Discount, Description From product Where Quantity >= 1 AND Category_Id = '"+id+"'";
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

app.get('/getSellerProduct/:Id', (req, res) => {
    let getQuery = `Select Id, Name, Picture, SellPrice,BuyPrice,Quantity,AddStockDate, Discount, Description,Seller_Id From product where Seller_Id='${req.params.Id}'`;
    con.query(getQuery, (err, result) =>{
        if (err){
            res.send
            ({
                data:null
            })
        }
        else
        {
            res.send
            ({
                message:'Data',
                data:result
            });
        }
    })
})

app.get('/getSaleData/:Id', (req, res) => {
    let getQuery = `Select B.Name as productName,A.pid as productID,A.qty as quantity,A.stime as saleTime,A.percentage from (Select productID as pid,sellerID as sid,quantity as qty,saleTime as stime,quantity/(select sum(quantity) from sold_products where sold_products.sellerID='${req.params.Id}')*100 as percentage from sold_products where sellerID='${req.params.Id}' GROUP by productID,sellerID,quantity,saleTime) as A join product as B where A.pid=B.Id`;
    con.query(getQuery, (err, result) =>{
        if (err)
        {
            res.send
            ({
                data:null
            })
        }
        else
        {
            res.send
            ({
                message:'Data',
                data:result
            });
        }
    })
})

app.get('/getAnnualExpense/:Id',(req,res)=>{
    // console.log("seller id:",req.params.Id);
    let getQuery='select SUM(A.expense) as expense from (select P.Id,sum(P.BuyPrice)*P.Quantity as expense from product P where P.Seller_Id=Id and year(P.AddStockDate)=year(CURRENT_TIME) group by P.Id) as A'
    con.query(getQuery,(err,result)=>{
        if(err)
        {
            res.send({
                data:null
            })
        }
        else{
            res.send({
                message:'Data',data:result
            });
        }
    })
})

app.get('/getAnnualProfit/:sellID',(req,res)=>{
    // console.log(req.params.sellID)
    let getQuery=`select (select sum(B.sale) from (select A.productID as productID,A.qty*P.SellPrice as sale,A.sid as sellerID from (select productID,SUM(SP.Quantity) qty,SP.sellerID as sid from sold_products SP where year(SP.saleTime)=year(CURRENT_TIME) and SP.sellerID=${req.params.sellID} group by sellerID,productID ) A join product P where A.productID=P.Id) as B)-(select sum(B.buy) from (select A.productID as productID,A.qty*P.BuyPrice as buy,A.sid as sellerID from (select productID,SUM(SP.Quantity) qty,SP.sellerID as sid from sold_products SP where year(SP.saleTime)=year(CURRENT_TIME) and SP.sellerID='${req.params.sellID}' group by sellerID,productID ) A join product P where A.productID=P.Id) as B) as profit`
    con.query(getQuery,(err,result)=>{
        if(err)
        {
            console.log("error annual profit",result)
            res.send({
                data:null
            })
        }
        else{
            console.log("regular annual profit",result)
            res.send({
                message:'Data',data:result
            })
        }
    })
})

app.get('/getMonthlyProfit/:sellID',(req,res)=>{
    let getQuery=`select(select sum(B.sale) from (select A.productID as productID,A.qty*P.SellPrice as sale,A.sid as sellerID from (select productID,SUM(SP.Quantity) qty,SP.sellerID as sid from sold_products SP where month(SP.saleTime)=month(CURRENT_TIME) and SP.sellerID='${req.params.sellID}' group by sellerID,productID ) A join product P where A.productID=P.Id) as B)-(select sum(B.buy) from (select A.productID as productID,A.qty*P.BuyPrice as buy,A.sid as sellerID from (select productID,SUM(SP.Quantity) qty,SP.sellerID as sid from sold_products SP where month(SP.saleTime)=month(CURRENT_TIME) and SP.sellerID='${req.params.sellID}' group by sellerID,productID ) A join product P where A.productID=P.Id) as B) as profit`
    con.query(getQuery,(err,result)=>{
        if(err)
        {
            res.send({
                data:null
            })
        }
        else{
            res.send({
                message:'Data',data:result
            });
        }
    })
})


app.get('/getAnnualSale/:sellerID',(req,res)=>{
    let getQuery=`select sum(B.sale) as sale from (select A.productID as productID,A.qty*P.SellPrice as sale,A.sid as sellerID from (select productID,SUM(SP.Quantity) qty,SP.sellerID as sid from sold_products SP where year(SP.saleTime)=year(CURRENT_TIME) and SP.sellerID='${req.params.sellerID}' group by sellerID,productID ) A join product P where A.productID=P.Id) as B `
    con.query(getQuery,(err,result)=>{
        if(err)
        {
            res.send({
                data:null
            })
        }
        else{
            res.send({
                message:'Data',data:result
            });
        }
    })
})

app.get('/getProduct/:Id', (req, res) => {
    let id = req.params.Id;
    id = id.replaceAll('"', '');
    let getQuery = "SELECT prdBrand.Br As Brand, prdBrand.Id As Id, prdBrand.Sellprice As SellPrice, prdBrand.Description As Description, prdBrand.Discount As Discount, prdBrand.Quantity As Quantity, prdBrand.Name As Name, prdBrand.Picture As Picture, seller_user.FirstName As FName, seller_user.LastName As LName, seller_user.City As SellerCity FROM (SELECT product_brand.Brand As Br, Pr.Id As Id, Pr.SellPrice As SellPrice, Pr.Description As  Description, Pr.Discount As Discount, Pr.Quantity As Quantity, Pr.Name As Name, Pr.Picture As  Picture, Pr.Seller_Id As SellerId FROM (SELECT Id, Brand_Id, SellPrice, Description, Discount, Quantity, Name, Picture, Seller_Id FROM product WHERE Id = '"+id+"') As Pr, product_brand WHERE Pr.Brand_Id = product_brand.Id) As prdBrand, seller_user WHERE prdBrand.SellerId = seller_user.Id ";
    con.query(getQuery, (err, result) =>{
        if (err){
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

/*------------------------------------------ */
/*------------------------------------------ */
/*   For  Buyer Deliver Address starts here  */
app.post('/saveBuyerAddress/:buyerId', (req, res) => {
    let buyer_Address_Name = req.body.fullName;
    let buyer_Address_Phone = req.body.phoneNo;
    let buyer_Address_Colony = req.body.colSubLocLan;
    let buyer_Address_NickName = req.body.nickName;
    let buyer_Address_Province = req.body.province;
    let buyer_Address_City = req.body.city;
    let buyer_Address_Building = req.body.buiHouFloStr;
    let buyer_Id = req.params.buyerId;
    console.log("Bsefor ",  buyer_Id);
    buyer_Id = buyer_Id.replaceAll('"', '');
    console.log("Iddddddddddd ",  buyer_Id);

    let postQuery = "INSERT INTO `buyer_address` (`FullName`, `PhoneNo`, `Buildin_House_Street_Floor`, `Colony_Submark_Locality_Landmark`, `Province`, `City`, `Buyer_User_Id`, `NickName`) VALUES ('"+buyer_Address_Name+"', '"+buyer_Address_Phone+"', '"+buyer_Address_Building+"', '"+buyer_Address_Colony+"', '"+buyer_Address_Province+"', '"+buyer_Address_City+"', '"+buyer_Id+"', '"+buyer_Address_NickName+"')";

    con.query(postQuery, (err, result) =>{
        if (err){
            // console.log("eeeeeeerrrrr");
            res.send({
                message:'Data Inserted',
                data:null
            })
        }
        else{
            // console.log("saaaaaaaaaa");
            res.send({
                message:'Data Inserted',
                data:result.insertId
            })
        }
    })
})


app.get('/getBuyerAddress/:buyerId', (req, res) => {
    let buyer_Id = req.params.buyerId;
    id = buyer_Id.replaceAll('"', '');
    let postQuery = "SELECT * FROM `buyer_address` WHERE Buyer_User_Id = '"+id+"'";
    con.query(postQuery, (err, result) =>{
        if (err){
            res.send({
                message:'Data Inserted',
                data:null
            })
        }
        else{
            if (result.length == 0)
            {
                res.send({
                    message:'Not Get',
                    data:null
                })
            }
            else
            {
                res.send({
                    message:'get data',
                    data:result
                })
            }
        }
    })
})
/*------------------------------------------ */

app.post('/addProductValid', (req, res) => {
    // console.log("addProductValid   ");
    let pname=req.body.pname;
    let postQuery = "SELECT Name from product WHERE Name='"+pname+"' ";
    con.query(postQuery, (err, result) =>{
        if(err)
        {
            res.send
            ({
                message:'Erro Found',
                data:null,
            })
        }
        else{
            if(result.length != 0)
            {
                res.send
                ({
                    message:'Duplicate Name',
                    data:result,
                })
            }
            else
            {
                res.send
                ({
                    message:'Not Found Same Name Product',
                    data:null,
                })
            }
        }
    })
})


app.post('/addProduct', fileUpload.single("image"), (req, res) => {
    let dateObj = new Date();
    let date = ("0" + dateObj.getDate()).slice(-2); // current date
    let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);  // current month
    let year = dateObj.getFullYear(); // current year
    currentDate = year+":"+month+":"+date;
    let picture_Path = req.file.path;
    picture_Path = escape(picture_Path);
    picture_Path = picture_Path.replaceAll("%5C", "\\\\");
    let p_Name=req.body.prdName;
    let p_Description=req.body.prdDescription;
    let seller_Id=req.body.prdSellerId;
    let category_Id=req.body.prdCategoryId;
    let brand_Id=req.body.prdBrandId;
    let p_BuyPrice=req.body.prdBuyPrice;
    let p_SellPrice=req.body.prdSellPrice;
    let p_Discount=req.body.prdDiscountPercentage;
    let p_Quantity=0;
    let postQuery = "INSERT INTO `product` (`Name`, `Description`, `BuyPrice`, `SellPrice`, `Discount`, `Quantity`, `AddStockDate`, `Picture`, `Seller_Id`, `Category_Id`, `Brand_Id`) VALUES ('"+p_Name+"', '"+p_Description+"', '"+p_BuyPrice+"', '"+p_SellPrice+"', '"+p_Discount+"', '"+p_Quantity+"', '"+currentDate+"', '"+picture_Path+"', '"+seller_Id+"', '"+category_Id+"', '"+brand_Id+"')";
    con.query(postQuery, (err, result) =>{
        if (err)
        {
            res.send
            ({
                message:'Data Not Inserted',
                data:null
            })
        }
        else
        {
            res.send
            ({
                message:'Data Inserted',
                data:result.insertId
            })
        }
    })
})

    
app.post('/resetBuyerPassword',(req,res) =>{
    let email = req.body.email;
    // console.log(req.body);
    // console.log(email)
    let getQuery = `Select Id from buyer_user where Email = '${email}'`
    // console.log("hello")
    con.query(getQuery, (err, result) =>{
        console.log(result)
        if(!result){
            res.send({
                data:null
            })
        }
        else{
            // console.log(result)
            res.send({
                data:result
            });
        }
        if (err){
            console.log(err);
            res.send('Error')
            
        }
    })
})

app.post('/updateBuyerPassword',(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let getQuery = `Update buyer_user SET Password = '${password}' where Email = '${email}'`;
    con.query(getQuery, (err, result) =>{
        // if(result.length == 0){
        //     res.send({
        //         data:null
        //     })
        // }
        if (err){
            // console.log("Error");
            res.send('Error')
            
        }
        else{
            // console.log(result)
            res.send({
                message:'Password Updated'
                // data:result
            });
        }
    })
})

app.get('/getSingleUserData/:Id',(req,res)=>{
    // console.log(req.params.Id);
    // console.log('hello');
    let id = req.params.Id;
    let getQuery = `Select * from buyer_user where Id = '${id}'`;
    con.query(getQuery, (err, result) =>{
        if (err){
            // console.log("Error");
            res.send('Error')
            
        }
        else{
            // console.log(result)
            res.send({
                data:result
            });
        }
    })
})

app.get('/addressBook/:Id',(req,res)=>{
    let id = req.params.Id;
    // console.log(id)
    let getQuery = `Select * from buyer_address where Buyer_User_Id = ${id}`;
    con.query(getQuery, (err, result) =>{
        if (err){
            // console.log("Error");
            res.send('Error')
            
        }
        else{
            // console.log(result)
            res.send({
                data:result
            });
        }
    })
})

app.post('/editBuyerUserData',(req,res)=>{
    let id = req.body.id;
    let name = req.body.fullname;
    let email = req.body.email;
    let password = req.body.password;
    // console.log('hello');
    // console.log(req.body.id);
    let getQuery = `Update buyer_user SET FullName = '${name}', Email = '${email}', Password = '${password}' where Id = '${id}'`;
    con.query(getQuery, (err, result) =>{
        if (err){
            // console.log("Error");
            res.send('Error')
            
        }
        else{
            // console.log(result)
            res.send({
                message:'Account Details Updated'
                // data:result
            });
        }
    })
})

app.get('/myReturns/:Id',(req,res)=>{
    
    // let getQuery = `Select * from buyer_user_returns where Buyer_User_Id = ${id}`;
    let getQuery = `SELECT product.Name AS ProductName,R1.Quantity AS ProductQuantity,product.BuyPrice AS ProductBuyPrice,product.SellPrice AS ProductSellPrice,R1.Order_Id AS OrderId FROM (SELECT orderdetail.Quantity,orderdetail.Product_Id,orderdetail.Order_Id FROM orderdetail WHERE orderdetail.Order_Id = (SELECT order.Id FROM ecommercedb.order WHERE Buyer_Id = ${req.params.Id})) AS R1 JOIN product ON product.Id = R1.Product_Id `;
    con.query(getQuery, (err, result) =>{
        if (err){
            // console.log("Error");
            res.send('Error')
        }
        else{
            // console.log(result)
            res.send({
                data:result
            });
        }
    })
})

app.get('/trackOrder/:Id',(req,res)=>{
    let id =  req.params.Id;
    // console.log('hello')
    // console.log(id)
    let getQuery = `Select * from buyer_user_orders where Buyer_User_Id = ${id}`;
    con.query(getQuery, (err, result) =>{
        if (err){
            // console.log("Error");
            res.send('Error')
        }
        else{
            // console.log(result)
            res.send({
                data:result
            });
        }
    })
})

/*------------------------------------------ */
/*------------------------------------------ */
/*      For  Order code  Start From here     */
app.post('/saveOrder/:buyerId', (req, res) => {
    let dateObj = new Date();
    let date = ("0" + dateObj.getDate()).slice(-2); // current date
    let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);  // current month
    let year = dateObj.getFullYear(); // current year
    currentDate = year+":"+month+":"+date;

    dateObj.setDate(dateObj.getDate() + 7);
    date = ("0" + dateObj.getDate()).slice(-2); // current date
    month = ("0" + (dateObj.getMonth() + 1)).slice(-2);  // current month
    year = dateObj.getFullYear(); // current year
    requiredDate = year+":"+month+":"+date;

    let buyer_Address_Id = req.body.addressId;
    let buyer_Id = req.params.buyerId;
    buyer_Id = buyer_Id.replaceAll('"', '');

    let postQuery = "INSERT INTO `order` (`Date`, `ShippedDate`, `RequiredDate`, `Buyer_Id`, `BuyerAddress_Id`) VALUES ('"+currentDate+"', '"+currentDate+"', '"+requiredDate+"', '"+buyer_Id+"', '"+buyer_Address_Id+"')";
    con.query(postQuery, (err, result) =>{
        if (err)
        {
            res.send({
                message:'Data Not Inserted',
                data:null
            })
        }
        else
        {
            res.send({
                message:'Data Inserted',
                data:result.insertId
            })
        }
    })
})

app.post('/saveOrderDetail',(req, res) => {
    let counter = 0;
    let orderId;
    let prdId;
    let quantity;
    let postQuery;
    let allData = req.body;
    let queryExecuted;
    allData.forEach((items) => { // ForEach Loop
        orderId = items['orderId'];
        prdId = items['selectedPrdId'];
        quantity = items['selectedPrdQuantity'];

        postQuery = "INSERT INTO `orderdetail` (`Quantity`, `Order_Id`, `Product_Id`) VALUES ('"+quantity+"', '"+orderId+"', '"+prdId+"')";
        queryExecuted = false;
        con.query(postQuery, (err, result) =>{
            if (err)
            {
                res.send({
                    message:'Data Not Inserted',
                    data:null
                })
            }
            else
            {
                counter = counter+1;
                if(counter == allData.length)
                {
                    res.send({
                        message:'Data Not Inserted',
                        data:result
                    })
                }
                
            }
        })


    });// ForEach Loop

})
/*------------------------------------------ */
/*------------------------------------------ */
/*      For  Order code ends From here       */