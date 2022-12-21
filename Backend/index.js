const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
const nodemailer = require("nodemailer");
const details = require("./details.json");
const fileUpload = require("./fileUpload");
const { escape } = require("querystring");
const { get } = require("http");

app.use(cors({ origin: "*" }));
app.use(cors());
app.use(bodyparser.json());
app.use("/uploads/images", express.static(path.join("uploads", "images")));

const port = 3000;
let mailsend = false;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//declare mysql variable

// Create Mysql connection

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecommercedb",
  port: "3306",
});

con.connect((err) => {
  if (err) {
    console.log(err, "Data Base Not Connected");
  } else {
    console.log("Data Base Connected");
  }
});

//Host
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Ecommerce<h1>");
});

app.get("/getCategories", (req, res) => {
  let getQuery = 'Select * From lookup Where Category = "ProductCategory"';
  con.query(getQuery, (err, result) => {
    if (err) {
      res.send("Error");
    } else {
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

app.get("/getSubCategories", (req, res) => {
  let getQuery =
    "SELECT * FROM `product_category` ORDER BY `product_category`.`Sub_Category` ASC";
  // let getQuery = "SELECT Distinct Id, Sub_Category FROM product_category Left Join product ON product_category.Id=product.Category_Id And product.Quantity >=1  ORDER BY product_category.Sub_Category ASC";
  con.query(getQuery, (err, result) => {
    if (err) {
      res.send({
        message: "Not Get",
        data: null,
      });
    } else {
      res.send({
        message: "Found Data",
        data: result,
      });
    }
  });
});

app.get("/getProductBrands", (req, res) => {
  let getQuery =
    "SELECT * FROM `product_brand` ORDER BY `product_brand`.`Brand` ASC";
  con.query(getQuery, (err, result) => {
    if (err) {
      res.send({
        message: "Not Get",
        data: null,
      });
    } else {
      res.send({
        message: "Found Data",
        data: result,
      });
    }
  });
});

//This will get user data
app.get("/buyerUser", (req, res) => {
  let getQuery = "Select * From buyer_user";
  con.query(getQuery, (err, result) => {
    if (err) {
      console.log("Error");
      res.send("Error");
    } else {
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

//This will get buyer user order data
app.get("/buyerUserOrders/:Id", (req, res) => {
  let getQuery = `Select * From buyer_user_orders where buyer_user_id = ${req.params.Id}`;
  con.query(getQuery, (err, result) => {
    if (err) {
      console.log("Error");
      res.send("Error");
    } else {
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

// This will delete buyer user order data
app.delete("/buyerUserOrdersDelete", (req, res) => {
  let orderId = req.body.userData.Id;
  let getQuery = `Delete From buyer_user_orders where OrderId = ${orderId} and Buyer_User_Id = ${req.body.userData.Buyer_User_Id}`;
  con.query(getQuery, (err, result) => {
    if (err) {
      res.send("Error");
    } else {
      res.send({
        message: "Order Deleted!",
        // data:result
      });
    }
  });
});

// This will check that sign in user already exist or not
app.post("/buyerUserSignInValid", (req, res) => {
  let check_buyer_email = req.body.email;
  let check_buyer_pin = req.body.password;
  let getQuery =
    "Select Id,FullName From buyer_user WHERE Email = '" +
    check_buyer_email +
    "' And Password = '" +
    check_buyer_pin +
    "'";
  con.query(getQuery, (err, userResult) => {
    if (userResult.length > 0) {
      res.send({
        message: "Data",
        data: userResult,
      });
    } else {
      res.send({
        message: "Data",
        data: null,
      });
    }
  });
});

app.post("/sendVerificationCode/:code", (req, res) => {
  try {
    let user = req.body;
    let verificationCode = req.params.code;
    console.log("mamamam ", user);
    console.log("vfvfvvfvfvf ", verificationCode);

    // let verificationCode = Math.floor(100000 + Math.random() * 900000);
    sendMail(user, verificationCode, (info) => {
      if (mailsend) {
        res.send({ data: "sended" });
      } else {
        res.send({ data: null });
      }
    });
  } catch {
    res.send({ data: null });
  }
});

async function sendMail(user, code, callback) {
  try {
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
      html:
        "<b>Thank You For Joininng Us. Use this '" +
        code +
        "' OTP against '" +
        user.email +
        "' to create account</b> ", // html body
    };
    let info = await transporter.sendMail(mailOptions);
    mailsend = true;
    callback(info);
  } catch {
    mailsend = false;
    callback();
  }
}

// This will check that same email id with new creating account exist or not
app.post("/buyerUserSignUpValid", (req, res) => {
  let check_buyer_email = req.body.email;
  let getQuery =
    "Select Id From buyer_user WHERE Email = '" + check_buyer_email + "'";
  con.query(getQuery, (err, userResult) => {
    // console.log("userresult", userResult);
    if (userResult.length == 0) {
      res.send({
        message: "Null",
        data: null,
      });

      console.log("null");
    } else {
      res.send({
        message: "Data",
        data: userResult,
      });
    }
  });
});

app.post("/buyerUser", (req, res) => {
  let buyer_email = req.body.email;
  let buyer_pin = req.body.password;
  let buyer_fName = req.body.fullname;
  let postQuery ="INSERT INTO buyer_user (`FullName`, `Email`, `Password`, `JoiningDate`) VALUES ('"+buyer_fName+"', '"+buyer_email+"', '"+buyer_pin +"', CURRENT_DATE() )";
  con.query(postQuery, (err, result) => {
    if (err) {
      res.send({
        message: "Data Inserted",
        data: null,
      });
    } else {
      res.send({
        message: "Data Inserted",
        data: result.insertId,
      });
    }
  });
});

app.get("/getLoginSellerName/:Id", (req, res) => {
  let id = req.params.Id;
  // id = id.replaceAll('"', '');
  console.log("id", id);
  let getQuery = `Select * From seller_user WHERE Id = ${req.params.Id}`;
  con.query(getQuery, (err, result) => {
    if (err) {
      console.log("Error");
      res.send("Error");
    } else {
      res.send({
        message: "Data",
        data: result[0].FirstName + " " + result[0].LastName,
      });
    }
  });
});

/*For Seller Registration code start from here*/
/*------------------------------------------- */
/*------------------------------------------- */
// This will check that same email id with new creating account exist or not
app.post("/sellerSignUpUserValid", (req, res) => {
  let email = req.body.email;
  let getQuery = "Select Id From seller_user WHERE Email = '" + email + "'";
  con.query(getQuery, (err, result) => {
    if (result.length > 0) {
      res.send({
        message: "Data",
        data: result[0].Id,
      });
    } else {
      res.send({
        message: "Data",
        data: null,
      });
    }
  });
});

// This function will insert data into seller_user table
app.post("/insertSellerUser", (req, res) => {
  const dateObj = new Date();
  console.log("ddd ", dateObj);
  // let date = ("0" + dateObj.getDate()).slice(-2); // current date
  // let month = ("0" + (dateObj.getMonth() + 1)).slice(-2); // current month
  // let year = dateObj.getFullYear(); // current year
  // currentDate = year + ":" + month + ":" + date;

  let fName = req.body.fName;
  let lName = req.body.lName;
  let email = req.body.email;
  let phoneNo = req.body.phoneNo;
  let cnicNo = req.body.cnicNo;
  let city = req.body.city;
  let address = req.body.address;
  let password = req.body.password;

  let postQuery =
    "INSERT INTO seller_user (FirstName, LastName, Email, PhoneNo, CnicNo, City, Address, Password, JoiningDate) VALUES ('" +
    fName +
    "', '" +
    lName +
    "', '" +
    email +
    "', '" +
    phoneNo +
    "', '" +
    cnicNo +
    "', '" +
    city +
    "', '" +
    address +
    "', '" +
    password +
    "',+  CURRENT_DATE)";
  con.query(postQuery, (err, result) => {
    res.send({
      message: "Data Inserted",
      data: result.insertId,
    });
    console.log(result.insertId);
  });
});

// This will check that sign in user is valid or not not
app.post("/sellerSignInUserValid", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log("dsdss dds ", email);
  let getQuery =
    "Select Id From seller_user WHERE Email = '" +
    email +
    "' And Password = '" +
    password +
    "' ";
  con.query(getQuery, (err, result) => {
    if (result.length > 0) {
      res.send({
        message: "Data",
        data: result[0].Id,
      });
    } else {
      res.send({
        message: "Null",
        data: null,
      });
    }
  });
});
/*For Seller Registration code ends      here*/
/*------------------------------------------- */
/*------------------------------------------- */

/*   For  Product  code  start  from  here   */
/*------------------------------------------ */
/*------------------------------------------ */
app.get("/getProduct", (req, res) => {
  let getQuery =
    "Select product.Id, product.Name, product.Picture, product_stock.SellPrice, product_stock.Discount,  product.Description From product,product_stock Where product_stock.Product_Id = product.Id And product_stock.Quantity >=1 And product.Status = 1 AND product_stock.Id = (SELECT MAX(product_stock.Id) As StockId FROM product_stock WHERE product_stock.Product_Id = product.Id )";
  con.query(getQuery, (err, result) => {
    if (err) {
      console.log("Error");

      res.send({
        data: null,
      });
    } else {
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

app.get("/getProductByCategory/:id", (req, res) => {
  id = req.params.id;
  id = id.replaceAll('"', "");
  let getQuery =
    "Select product.Id, product.Name, product.Picture, product_stock.SellPrice, product_stock.Discount,  product.Description From product,product_stock Where product_stock.Product_Id = product.Id And product_stock.Quantity >=1 And product.Status = 1 And product_stock.Id = (SELECT MAX(product_stock.Id) As StockId FROM product_stock WHERE product_stock.Product_Id = product.Id ) And Category_Id = '" +
    id +
    "'";
  con.query(getQuery, (err, result) => {
    if (err) {
      console.log("Error");
      res.send({
        data: null,
      });
    } else {
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

app.get("/getSellerProduct/:Id", (req, res) => {
  let sId = req.params.Id;
  let getQuery ="Select product.Id, product.Name, product.Picture, product_stock.SellPrice, product_stock.BuyPrice, product_stock.Quantity, product_stock.AddStock As AddStockDate, product_stock.Discount, product.Description, (SELECT SUM(((ps.SellPrice-(ps.SellPrice*ps.Discount/100))-(ps.BuyPrice))*(ps.TotalQuantityForSale-ps.Quantity)) From product_stock ps WHERE ps.Product_Id = product.Id) As Profit From product,product_stock Where product_stock.Product_Id = product.Id And product.Status = 1 And product_stock.Id = (SELECT MAX(product_stock.Id) As StockId FROM product_stock WHERE product_stock.Product_Id = product.Id ) And product.Seller_Id = '"+sId+"'";
  con.query(getQuery, (err, result) => {
    if (err) {
      res.send({
        data: null,
      });
    } else {
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

app.get("/getSaleData/:Id", (req, res) => {
  let getQuery = `Select B.Name as productName,A.pid as productID,A.qty as quantity,A.stime as saleTime,A.percentage from (Select productID as pid,sellerID as sid,quantity as qty,saleTime as stime,quantity/(select sum(quantity) from sold_products where sold_products.sellerID='${req.params.Id}')*100 as percentage from sold_products where sellerID='${req.params.Id}' GROUP by productID,sellerID,quantity,saleTime) as A join product as B where A.pid=B.Id`;
  con.query(getQuery, (err, result) => {
    if (err) {
      res.send({
        data: null,
      });
    } else {
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

app.get("/getBuyerData/:Id", (req, res) => {
  let getQuery = ``;
  con.query(getQuery, (err, result) => {
    if (err) {
      res.send({
        data: null,
      });
    } else {
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

app.get("/getTotalExpense/:Id", (req, res) => {
  let sellerId = req.params.Id;
  let getQuery ="SELECT SUM((ps.BuyPrice*ps.AllTimeQuantity)) As ExenseOfYear FROM product p, product_stock ps WHERE p.Id = ps.Product_Id And   p.Seller_Id = '"+sellerId+"'";
  con.query(getQuery, (err, result) => {
    if (err) {
      res.send({
        data: null,
      });
    } else {
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

app.get("/getTotalSale/:sellerID", (req, res) => {
  let sellerId = req.params.sellerID;
  let getQuery ="SELECT SUM(( ps.SellPrice-(ps.SellPrice*ps.Discount/100))*(od.Quantity)) As SaleOfYear FROM `order` o JOIN orderdetail od ON o.Id = od.Order_Id JOIN product p ON p.Seller_Id = '"+sellerId+"' AND p.Id = od.Product_Id JOIN product_stock ps ON ps.Id = od.ProductStock_Id";
  con.query(getQuery, (err, result) => {
    if (err) {
      res.send({
        data: null,
      });
    } else {
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

app.get("/getTotalProfit/:sellerID", (req, res) => {
  let sellerId = req.params.sellerID;
  let getQuery ="SELECT SUM( ((ps.SellPrice-(ps.SellPrice*ps.Discount/100))-(ps.BuyPrice))*od.Quantity ) As Profit FROM `order` o JOIN orderdetail od ON o.Id = od.Order_Id JOIN product p ON p.Seller_Id = '"+sellerId+"' AND p.Id = od.Product_Id JOIN product_stock ps ON ps.Id = od.ProductStock_Id";
  con.query(getQuery, (err, result) => {
    if (err) {
      res.send({
        data: null,
      });
    } else {
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

app.get("/getTotalProductSold/:sellerID", (req, res) => {
  let sellerId = req.params.sellerID;
  let getQuery = "SELECT SUM(ps.TotalQuantityForSale-ps.Quantity) As SoldQuantity FROM product p, product_stock ps WHERE p.Id = ps.Product_Id AND p.Seller_Id = '"+sellerId+"'";
  con.query(getQuery, (err, result) => {
    if (err) {
      res.send({
        data: null,
      });
    } else {
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

app.get("/getTotalProductremaining/:sellerID", (req, res) => {
  let sellerId = req.params.sellerID;
  let getQuery = "SELECT SUM(ps.Quantity) As ReamainingQuantity FROM product p, product_stock ps WHERE p.Id = ps.Product_Id AND p.Status = 1 And p.Seller_Id = '"+sellerId+"'";
  con.query(getQuery, (err, result) => {
    if (err) {
      res.send({
        data: null,
      });
    } else {
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

app.get("/getAnnualProfit/:sellID", (req, res) => {
  let getQuery = `select SUM(B.d) as annualProfit from (SELECT A.productID,(A.quantity*P.SellPrice)-((P.SellPrice*P.Discount)/100)*A.quantity as d from (SELECT OD.Quantity as quantity,OD.Product_Id productID from ecommercedb.order O join orderdetail OD on O.Id=OD.Order_Id where year(O.ShippedDate)=year(CURRENT_DATE) ) as A join product P on A.productID=P.Id where P.Seller_Id='${req.params.sellID}') as B`;
  con.query(getQuery, (err, result) => {
    if (err) {
      console.log("error annual profit", result);
      res.send({
        data: null,
      });
    } else {
      console.log("regular annual profit", result);
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

// For seller dashboard calculate stastics
//  by input date start from here---------
// ---------------------------------------
app.post("/getExpenseByDate/:Id", (req, res) => {
  let sellerId = req.params.Id;
  let sDate = req.body.startDate;
  let eDate = req.body.endDate;
  sDate = new Date(sDate);
  eDate = new Date(eDate);
  let date = ("0" + sDate.getDate()).slice(-2); // current date
  let month = ("0" + (sDate.getMonth() + 1)).slice(-2); // current month
  let year = sDate.getFullYear(); // current year
  stDate = year + ":" + month + ":" + date;

  date = ("0" + eDate.getDate()).slice(-2); // current date
  month = ("0" + (eDate.getMonth() + 1)).slice(-2); // current month
  year = eDate.getFullYear(); // current year
  enDate = year + ":" + month + ":" + date;
  let getQuery ="SELECT SUM((ps.BuyPrice*ps.AllTimeQuantity)) As ExenseOfYear FROM product p, product_stock ps WHERE p.Id = ps.Product_Id And ps.AddStock >= '"+stDate+"'   AND  ps.AddStock <= '"+enDate+"' And p.Seller_Id = '"+sellerId+"'";
  con.query(getQuery, (err, result) => {
    if (err) {
      res.send({
        data: null,
      });
    } else {
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

app.post("/getSaleByDate/:Id", (req, res) => {
  let sellerId = req.params.Id;
  let sDate = req.body.startDate;
  let eDate = req.body.endDate;
  sDate = new Date(sDate);
  eDate = new Date(eDate);
  let date = ("0" + sDate.getDate()).slice(-2); // current date
  let month = ("0" + (sDate.getMonth() + 1)).slice(-2); // current month
  let year = sDate.getFullYear(); // current year
  stDate = year + ":" + month + ":" + date;

  date = ("0" + eDate.getDate()).slice(-2); // current date
  month = ("0" + (eDate.getMonth() + 1)).slice(-2); // current month
  year = eDate.getFullYear(); // current year
  enDate = year + ":" + month + ":" + date;

  let getQuery ="SELECT SUM(( ps.SellPrice-(ps.SellPrice*ps.Discount/100))*(od.Quantity)) As SaleOfYear FROM `order` o JOIN orderdetail od ON o.Date >= '"+stDate +"'And o.Date <= '" +enDate +"' And o.Id = od.Order_Id JOIN product p ON p.Seller_Id = '"+sellerId+"' AND p.Id = od.Product_Id JOIN product_stock ps ON ps.Id = od.ProductStock_Id";
  con.query(getQuery, (err, result) => {
    if (err) {
      res.send({
        data: null,
      });
    } else {
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

app.post("/getProfitByDate/:Id", (req, res) => {
  let sellerId = req.params.Id;
  let sDate = req.body.startDate;
  let eDate = req.body.endDate;
  sDate = new Date(sDate);
  eDate = new Date(eDate);
  let date = ("0" + sDate.getDate()).slice(-2); // current date
  let month = ("0" + (sDate.getMonth() + 1)).slice(-2); // current month
  let year = sDate.getFullYear(); // current year
  stDate = year + ":" + month + ":" + date;

  date = ("0" + eDate.getDate()).slice(-2); // current date
  month = ("0" + (eDate.getMonth() + 1)).slice(-2); // current month
  year = eDate.getFullYear(); // current year
  enDate = year + ":" + month + ":" + date;

  let getQuery ="SELECT SUM( ((ps.SellPrice-(ps.SellPrice*ps.Discount/100))-(ps.BuyPrice))*od.Quantity ) As Profit FROM `order` o JOIN orderdetail od ON  o.Date >= '"+stDate +"'And o.Date <= '" +enDate +"' And o.Id = od.Order_Id JOIN product p ON p.Seller_Id = '"+sellerId+"' AND p.Id = od.Product_Id JOIN product_stock ps ON ps.Id = od.ProductStock_Id";
  con.query(getQuery, (err, result) => {
    if (err) {
      res.send({
        data: null,
      });
    } else {
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

app.post("/getProductSoldByDate/:Id", (req, res) => {
  let sellerId = req.params.Id;
  let sDate = req.body.startDate;
  let eDate = req.body.endDate;
  sDate = new Date(sDate);
  eDate = new Date(eDate);
  let date = ("0" + sDate.getDate()).slice(-2); // current date
  let month = ("0" + (sDate.getMonth() + 1)).slice(-2); // current month
  let year = sDate.getFullYear(); // current year
  stDate = year + ":" + month + ":" + date;

  date = ("0" + eDate.getDate()).slice(-2); // current date
  month = ("0" + (eDate.getMonth() + 1)).slice(-2); // current month
  year = eDate.getFullYear(); // current year
  enDate = year + ":" + month + ":" + date;

  let getQuery =
    "SELECT SUM(od.Quantity) As SoldQuantity FROM orderdetail od Join product p ON od.Product_Id = p.Id AND p.Seller_Id = '" +
    sellerId +
    "' JOIN `order` o On o.Id = od.Order_Id AND o.Date >= '" +
    stDate +
    "' And o.Date <= '" +
    enDate +
    "'";
  con.query(getQuery, (err, result) => {
    if (err) {
      res.send({
        data: null,
      });
    } else {
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

app.post("/getProductRemainingByDate/:Id", (req, res) => {
  let sellerId = req.params.Id;
  let sDate = req.body.startDate;
  let eDate = req.body.endDate;
  sDate = new Date(sDate);
  eDate = new Date(eDate);
  let date = ("0" + sDate.getDate()).slice(-2); // current date
  let month = ("0" + (sDate.getMonth() + 1)).slice(-2); // current month
  let year = sDate.getFullYear(); // current year
  stDate = year + ":" + month + ":" + date;

  date = ("0" + eDate.getDate()).slice(-2); // current date
  month = ("0" + (eDate.getMonth() + 1)).slice(-2); // current month
  year = eDate.getFullYear(); // current year
  enDate = year + ":" + month + ":" + date;

  let getQuery =
    "SELECT SUM(( ps.SellPrice-(ps.SellPrice*ps.Discount/100))*(od.Quantity)) As SaleOfYear FROM `order` o JOIN orderdetail od ON o.Date >= '" +
    stDate +
    "' And o.Date <= '" +
    enDate +
    "' And o.Id = od.Order_Id JOIN product p ON p.Seller_Id = '" +
    sellerId +
    "' AND p.Id = od.Product_Id JOIN product_stock ps ON ps.Id = od.ProductStock_Id";
  con.query(getQuery, (err, result) => {
    if (err) {
      res.send({
        data: null,
      });
    } else {
      console.log("ssssssssssssssssssss ", result);
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

// For seller dashboard calculate stastics
//  by input date ends  from here---------
// ---------------------------------------

app.get("/getSelectedProduct/:Id", (req, res) => {
  let id = req.params.Id;
  let getQuery =
    "SELECT prdBrand.Br As Brand, prdBrand.Id As Id, prdBrand.Sellprice As SellPrice, prdBrand.Description As Description, prdBrand.Discount As Discount, prdBrand.Quantity As Quantity, prdBrand.Name As Name, prdBrand.Picture As Picture, seller_user.FirstName As FName, seller_user.LastName As LName, seller_user.City As SellerCity, prdBrand.StockId As StockId FROM (SELECT product_brand.Brand As Br, Pr.Id As Id, Pr.SellPrice As SellPrice, Pr.Description As  Description, Pr.Discount As Discount, Pr.Quantity As Quantity, Pr.Name As Name, Pr.Picture As  Picture, Pr.Seller_Id As SellerId, Pr.StockId FROM (    Select product.Id , product.Brand_Id, product_stock.SellPrice, product.Description,  product_stock.Discount, product_stock.Quantity, product.Name, product.Picture, product.Seller_Id, product_stock.Id As StockId From product,product_stock Where product_stock.Product_Id = product.Id And product.Id = '" +
    id +
    "' And product_stock.Id = (SELECT MAX(product_stock.Id) FROM product_stock WHERE product_stock.Product_Id = '" +
    id +
    "' ) ) As Pr, product_brand WHERE Pr.Brand_Id = product_brand.Id) As prdBrand, seller_user WHERE prdBrand.SellerId = seller_user.Id";
  con.query(getQuery, (err, result) => {
    if (err) {
      res.send("Error");
    } else {
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

app.get("/getProductQuantity/:Id", (req, res) => {
  let id = req.params.Id;
  id = id.replaceAll('"', "");
  let getQuery =
    "SELECT Quantity FROM product_stock WHERE product_stock.Id = ( SELECT MAX(Id) FROM product_stock WHERE product_stock.Product_Id = '" +
    id +
    "')";
  con.query(getQuery, (err, result) => {
    if (err) {
      console.log("Error");
      res.send("Error");
    } else {
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

app.get("/getProductName/:Id", (req, res) => {
  let id = req.params.Id;
  id = id.replaceAll('"', "");
  let getQuery = "SELECT Name FROM `product` WHERE Id = '" + id + "'";
  con.query(getQuery, (err, result) => {
    if (err) {
      console.log("Error");
      res.send("Error");
    } else {
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

app.get("/getProductBrandName/:Id", (req, res) => {
  let id = req.params.Id;
  id = id.replaceAll('"', "");
  let getQuery =
    "SELECT Brand FROM `product`, product_brand WHERE product.Id = '" +
    id +
    "' AND product_brand.Id = product.Brand_Id";
  con.query(getQuery, (err, result) => {
    if (err) {
      console.log("Error");
      res.send("Error");
    } else {
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

app.get("/getProductPrice/:Id", (req, res) => {
  let id = req.params.Id;
  id = id.replaceAll('"', "");
  let getQuery =
    "SELECT Brand FROM `product`, product_brand WHERE product.Id = '" +
    id +
    "' AND product_brand.Id = product.Brand_Id";
  con.query(getQuery, (err, result) => {
    if (err) {
      res.send("Error");
    } else {
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

/*------------------------------------------ */
/*------------------------------------------ */
/*   For  Buyer Deliver Address starts here  */
app.post("/saveBuyerAddress/:buyerId", (req, res) => {
  let buyer_Address_Name = req.body.fullName;
  let buyer_Address_Phone = req.body.phoneNo;
  let buyer_Address_Colony = req.body.colSubLocLan;
  let buyer_Address_NickName = req.body.nickName;
  let buyer_Address_Province = req.body.province;
  let buyer_Address_City = req.body.city;
  let buyer_Address_Building = req.body.buiHouFloStr;
  let buyer_Id = req.params.buyerId;

  let postQuery = `INSERT INTO buyer_address (FullName, PhoneNo, Buildin_House_Street_Floor, Colony_Submark_Locality_Landmark,Province,City,Buyer_User_Id,NickName) VALUES ('Null','${buyer_Address_Phone}','${buyer_Address_Building}','${buyer_Address_Colony}','${buyer_Address_Province}','${buyer_Address_City}',${buyer_Id},'${buyer_Address_NickName}')`;
  con.query(postQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        message: "Data Inserted",
        data: result.insertId,
      });
    }
  });
});

app.get("/getBuyerAddress/:buyerId", (req, res) => {
  let buyer_Id = req.params.buyerId;
  let postQuery =
    "SELECT * FROM buyer_address WHERE Buyer_User_Id = '" +
    buyer_Id +
    "' And Status = 1";
  con.query(postQuery, (err, result) => {
    if (err) {
      res.send({
        message: "Data Inserted",
        data: null,
      });
    } else {
      if (result.length == 0) {
        res.send({
          message: "Not Get",
          data: null,
        });
      } else {
        res.send({
          message: "get data",
          data: result,
        });
      }
    }
  });
});
/*------------------------------------------ */
// For seller Dashbard code start from here
//        ////////////////////////////////////

app.post("/addProductValid", (req, res) => {
  let pname = req.body.pname;
  let postQuery = "SELECT Name from product WHERE Name='" + pname + "' ";
  con.query(postQuery, (err, result) => {
    if (err) {
      res.send({
        message: "Erro Found",
        data: null,
      });
    } else {
      if (result.length != 0) {
        res.send({
          message: "Duplicate Name",
          data: result,
        });
      } else {
        res.send({
          message: "Not Found Same Name Product",
          data: null,
        });
      }
    }
  });
});

app.post("/addProduct", fileUpload.single("image"), (req, res) => {
  // let dateObj = new Date();
  // let date = ("0" + dateObj.getDate()).slice(-2); // current date
  // let month = ("0" + (dateObj.getMonth() + 1)).slice(-2); // current month
  // let year = dateObj.getFullYear(); // current year
  // currentDate = year + ":" + month + ":" + date;
  let picture_Path = req.file.path;
  picture_Path = escape(picture_Path);
  picture_Path = picture_Path.replace("%5C", "\\\\");
  picture_Path = picture_Path.replace("%5C", "\\\\");
  let p_Name = req.body.prdName;
  let p_Description = req.body.prdDescription;
  let seller_Id = req.body.prdSellerId;
  let category_Id = req.body.prdCategoryId;
  let brand_Id = req.body.prdBrandId;
  let postQuery =
    "INSERT INTO `product` (`Name`, `Description`, `Status`, `Picture`, `Seller_Id`, `Category_Id`, `Brand_Id`) VALUES ('" +
    p_Name +
    "','" +
    p_Description +
    "',1,'" +
    picture_Path +
    "','" +
    seller_Id +
    "','" +
    category_Id +
    "','" +
    brand_Id +
    "')";
  con.query(postQuery, (err, result) => {
    if (err) {
      res.send({
        message: "Data Not Inserted",
        data: null,
      });
    } else {
      res.send({
        message: "Data Inserted",
        data: result.insertId,
      });
    }
  });
});

app.post("/addProductStock/:pId", (req, res) => {
  let prd_Id = req.params.pId;
  let p_BuyPrice = req.body.prdBuyPrice;
  let p_SellPrice = req.body.prdSellPrice;
  let p_Discount = req.body.prdDiscountPercentage;
  let quantity = req.body.quantity;
  let postQuery ="INSERT INTO `product_stock` (`BuyPrice`, `SellPrice`, `Discount`, `Quantity`, `AllTimeQuantity`, `AddStock`, `TotalQuantityForSale`, `Product_Id`) VALUES ('"+p_BuyPrice+"', '"+p_SellPrice+"', '"+p_Discount+"','"+quantity+"', '"+quantity+"', CURRENT_DATE, '"+quantity+"', '"+prd_Id+"')";
  con.query(postQuery, (err, result) => {
    if (err) {
      console.log("ereeeee   ",err)
      res.send({
        message: "Data Not Inserted",
        data: null,
      });
    } else {
      res.send({
        message: "Data Inserted",
        data: result.insertId,
      });
    }
  });
});

app.post("/updateRecentaddStock", (req, res) => {
  let newId = req.body.pStockId;
  let newPrdId = req.body.pId;
  let postQuery ="UPDATE `product_stock`  JOIN  ( Select product_stock.Quantity As Qty,  '"+newId+"' As InsertNewId FROM product_stock Where product_stock.Id = ( SELECT MAX(Id) FROM product_stock WHERE product_stock.Product_Id = '"+newPrdId+"' And product_stock.Id NOT IN(  SELECT MAX(Id) FROM product_stock WHERE product_stock.Product_Id = '"+newPrdId+"'  ) ) )  previous ON previous.InsertNewId = product_stock.Id SET Quantity = Quantity+(previous.Qty) , TotalQuantityForSale = TotalQuantityForSale+ (previous.Qty) WHERE product_stock.Id = '"+newId+"'";
  con.query(postQuery, (err, result) => {
    if (err) {
      res.send({
        message: "Data Not updated",
        data: null,
      });
    } else {
      res.send({
        message: "Data Updated",
        data: result,
      });
    }
  });
});

app.post("/deleteSelectedProduct", (req, res) => {
  let deletePrdId = req.body.prdId;
  console.log("del id ", deletePrdId);
  let postQuery =
    "UPDATE `product` SET Status = 0 WHERE Id = '" + deletePrdId + "'";
  con.query(postQuery, (err, result) => {
    if (err) {
      res.send({
        message: "Data Not updated",
        data: null,
      });
    } else {
      res.send({
        message: "Data Updated",
        data: result,
      });
    }
  });
});

/*------------------------------------------ */
// For seller Dashbard code endssss      here
//        ////////////////////////////////////

app.post("/resetBuyerPassword", (req, res) => {
  let email = req.body.email;
  let getQuery = `Select Id from buyer_user where Email = '${email}'`;
  con.query(getQuery, (err, result) => {
    if (!result) {
      res.send({
        data: null,
      });
    } else {
      res.send({
        data: result,
      });
    }
    if (err) {
      res.send("Error");
    }
  });
});

app.post("/updateBuyerPassword", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let getQuery = `Update buyer_user SET Password = '${password}' where Email = '${email}'`;
  con.query(getQuery, (err, result) => {
    // if(result.length == 0){
    //     res.send({
    //         data:null
    //     })
    // }
    if (err) {
      // console.log("Error");
      res.send("Error");
    } else {
      // console.log(result)
      res.send({
        message: "Password Updated",
        // data:result
      });
    }
  });
});

app.get("/getSingleUserData/:Id", (req, res) => {
  let id = req.params.Id;
  let getQuery = `Select * from buyer_user where Id = '${id}'`;
  con.query(getQuery, (err, result) => {
    if (err) {
      res.send("Error");
    } else {
      res.send({
        data: result,
      });
    }
  });
});

app.get("/addressBook/:Id", (req, res) => {
  let id = req.params.Id;
  // console.log(id)
  let getQuery = `Select * from buyer_address where Buyer_User_Id = ${id} AND Status = 1`;
  con.query(getQuery, (err, result) => {
    if (err) {
      // console.log("Error");
      res.send("Error");
    } else {
      // console.log(result)
      res.send({
        data: result,
      });
    }
  });
});

app.post("/editBuyerUserData", (req, res) => {
  let id = req.body.id;
  let name = req.body.fullname;
  let email = req.body.email;
  let password = req.body.password;
  let getQuery = `Update buyer_user SET FullName = '${name}', Email = '${email}', Password = '${password}' where Id = '${id}'`;
  con.query(getQuery, (err, result) => {
    if (err) {
      res.send("Error");
    } else {
      res.send({
        message: "Account Details Updated",
      });
    }
  });
});

app.post("/editBuyerUserAddressData", (req, res) => {
  let id = req.body.Id;
  let fullName = req.body.FullName;
  let phoneNo = req.body.PhoneNo;
  let building_house_street_floor = req.body.Building_House_Street_Floor;
  let colony_submark_locality_landmark =
    req.body.Colony_Submark_Locality_Landmark;
  let province = req.body.Province;
  let city = req.body.City;
  let nickName = req.body.NickName;
  let buyer_user_id = req.body.Buyer_User_Id;
  let getQuery = `Update buyer_address SET FullName = '${fullName}', PhoneNo = '${phoneNo}', Buildin_House_Street_Floor = '${building_house_street_floor}', Colony_Submark_Locality_Landmark = '${colony_submark_locality_landmark}' , Province = '${province}', City = '${city}',Buyer_User_Id = ${buyer_user_id}, NickName = '${nickName}' where Id = ${id}`;
  con.query(getQuery, (err, result) => {
    if (err) {
      // console.log("Error");
      res.send("Error");
    } else {
      // console.log(result)
      res.send({
        message: "Address Details Updated",
        // data: result,
      });
    }
  });
});

app.post("/deleteBuyerUserAddressData", (req, res) => {
  let buyer_address_id = req.body.Id;
  let buyer_user_id = req.body.Buyer_User_Id;
  let getQuery = `Update buyer_address SET Status = ${0} where Id = ${buyer_address_id} AND Buyer_User_Id = ${buyer_user_id}`;
  con.query(getQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        message: "Address Details Deleted",
      });
    }
  });
});

app.get("/myReturns/:Id", (req, res) => {
  let getQuery = `SELECT R2.Name AS ProductName,product_stock.SellPrice AS ProductPrice,R2.Quantity AS ProductQuantity,product_stock.SellPrice-(((product_stock.Discount)/(100)*product_stock.SellPrice)) AS ProductPriceAfterDiscount,R2.Date AS Date, R2.ShippedDate, (((product_stock.SellPrice-(((product_stock.Discount)/(100))*product_stock.SellPrice))*(R2.Quantity))+120) AS TotalBill FROM (SELECT product.Name,product.Id,R1.Date,R1.ShippedDate,R1.Quantity FROM (SELECT orderdetail.Product_Id,MAX(orderdetail.Order_Id),O.Buyer_Id,O.Date,O.ShippedDate,orderdetail.Quantity FROM ecommercedb.order AS O JOIN orderdetail ON orderdetail.Order_Id = O.Id AND O.Buyer_Id = ${req.params.Id}) AS R1 JOIN product ON product.Id = R1.Product_Id) AS R2 JOIN product_stock ON product_stock.Product_Id = R2.Id`;
  con.query(getQuery, (err, result) => {
    if (err) {
      res.send("Error");
    } else {
      res.send({
        data: result,
      });
    }
  });
});

app.get("/trackOrder/:Id", (req, res) => {
  let id = req.params.Id;
  // console.log('hello')
  // console.log(id)
  let getQuery = `Select * from buyer_user_orders where Buyer_User_Id = ${id}`;
  con.query(getQuery, (err, result) => {
    if (err) {
      // console.log("Error");
      res.send("Error");
    } else {
      // console.log(result)
      res.send({
        data: result,
      });
    }
  });
});

/*------------------------------------------ */
/*------------------------------------------ */
/*      For  Order code  Start From here     */
app.post("/saveOrder", (req, res) => {
  let buyer_Address_Id = req.body.addressId;
  let buyer_Id = req.body.buyerId;
  let postQuery =
    "INSERT INTO `order` (`Date`, `ShippedDate`, `RequiredDate`, `Buyer_Id`, `BuyerAddress_Id`) VALUES (CURRENT_DATE, CURRENT_DATE, CURRENT_DATE+7, '" +
    buyer_Id +
    "', '" +
    buyer_Address_Id +
    "')";
  con.query(postQuery, (err, result) => {
    if (err) {
      res.send({
        message: "Data Not Inserted",
        data: null,
      });
    } else {
      res.send({
        message: "Data Inserted",
        data: result.insertId,
      });
    }
  });
});

app.post("/saveOrderDetail", (req, res) => {
  let counter = 0;
  let orderId;
  let prdId;
  let prdStockID;
  let quantity;
  let postQuery;
  let allData = req.body;
  let queryExecuted;
  allData.forEach((items) => {
    // ForEach Loop
    orderId = items["orderId"];
    prdId = items["selectedPrdId"];
    quantity = items["selectedPrdQuantity"];
    prdStockId = items["selectedPrdStockId"];
    console.log("arrr ", orderId, prdStockId, items["selectedPrdStockId"])

    postQuery ="INSERT INTO `orderdetail` (`Quantity`, `Order_Id`, `Product_Id`, `ProductStock_Id`) VALUES ('" +quantity+"','"+orderId+"','"+prdId+"','"+prdStockId+"')";
    con.query(postQuery, (err, result) => {
      if (err) {
        res.send({
          message: "Data Not Inserted",
          data: null,
        });
      } else {
        counter = counter + 1;
        if (counter == allData.length) {
          res.send({
            message: "Data Inserted",
            data: result,
          });
        }
      }
    });
  }); // ForEach Loop
});
/*------------------------------------------ */
/*------------------------------------------ */
/*      For  Order code ends From here       */

/*------------------------------------------ */
/*------------------------------------------ */
/*      For  Admin code  Start From here     */


app.post("/adminSignInValid", (req, res) => {
  let check_admin_email = req.body.email;
  let check_admin_pin = req.body.password;
  let getQuery = "SELECT * FROM `admin` WHERE Email = '"+check_admin_email+"' AND Password = '"+check_admin_pin+"'";
  con.query(getQuery, (err, userResult) => {
    if(err)
    {
      console.log("eeeerrrrr  ",err);
    }
    if(userResult.length == 0) 
    {
      res.send
      ({
        message: "Data",
        data: null,
      });
    } 
    else 
    {
      res.send
      ({
        message: "Data",
        data: userResult,
      });
    }
  });
});


app.get("/getTotalSeller", (req, res) => {
  let getQuery = "SELECT Count(Id) As TotalSeller FROM `seller_user`";
  con.query(getQuery, (err, result) => {
    if (err) 
    {
      res.send({
        data: null,
      });
    } 
    else
    {
      res.send({
        data: result,
      });
    }
  });
});

app.post("/getSellerByDate", (req, res) => {
  let sDate = req.body.startDate;
  let eDate = req.body.endDate;
  sDate = new Date(sDate);
  eDate = new Date(eDate);
  let date = ("0" + sDate.getDate()).slice(-2); // current date
  let month = ("0" + (sDate.getMonth() + 1)).slice(-2); // current month
  let year = sDate.getFullYear(); // current year
  stDate = year + ":" + month + ":" + date;


  date = ("0" + eDate.getDate()).slice(-2); // current date
  month = ("0" + (eDate.getMonth() + 1)).slice(-2); // current month
  year = eDate.getFullYear(); // current year
  enDate = year + ":" + month + ":" + date;
  let getQuery ="SELECT Count(Id) As TotalSeller FROM `seller_user` WHERE JoiningDate >= '"+stDate+"' AND JoiningDate <= '"+enDate+"'";
  con.query(getQuery, (err, result) => {
    if(err) 
    {
      res.send
      ({
        data: null,
      });
    } 
    else 
    {
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});


app.get("/getTotalBuyer", (req, res) => {
  let getQuery = "SELECT Count(Id) As TotalBuyer FROM `buyer_user`";
  con.query(getQuery, (err, result) => {
    if (err) 
    {
      res.send({
        data: null,
      });
    } 
    else
    {
      res.send({
        data: result,
      });
    }
  });
});


app.post("/getBuyerByDate", (req, res) => {
  let sDate = req.body.startDate;
  let eDate = req.body.endDate;
  sDate = new Date(sDate);
  eDate = new Date(eDate);
  let date = ("0" + sDate.getDate()).slice(-2); // current date
  let month = ("0" + (sDate.getMonth() + 1)).slice(-2); // current month
  let year = sDate.getFullYear(); // current year
  stDate = year + ":" + month + ":" + date;

  date = ("0" + eDate.getDate()).slice(-2); // current date
  month = ("0" + (eDate.getMonth() + 1)).slice(-2); // current month
  year = eDate.getFullYear(); // current year
  enDate = year + ":" + month + ":" + date;
  let getQuery ="SELECT Count(Id) As TotalBuyer FROM `buyer_user` WHERE JoiningDate >= '"+stDate+"' AND JoiningDate <= '"+enDate+"'";
  con.query(getQuery, (err, result) => {
    if(err) 
    {
      res.send
      ({
        data: null,
      });
    } 
    else 
    {
      res.send({
        message: "Data",
        data: result,
      });
    }
  });
});

app.get("/getSellerData", (req, res) => {
  let getQuery = "SELECT `Id`, `FirstName`, `LastName`, `Email`, `PhoneNo`, `CnicNo`, `City`, `Address`, `Password`, `JoiningDate` FROM `seller_user`";
  con.query(getQuery, (err, result) => {
    if (err) 
    {
      res.send
      ({
        data: null,
      });
    } 
    else
    {
      res.send
      ({
        data: result,
      });
    }
  });
});

app.get("/getBuyerData", (req, res) => {
  let getQuery = "SELECT `Id`, `FullName`, `Email`, `Password`, `JoiningDate` FROM `buyer_user`";
  con.query(getQuery, (err, result) => {
    if (err) 
    {
      res.send
      ({
        data: null,
      });
    } 
    else
    {
      res.send
      ({
        data: result,
      });
    }
  });
});

app.post('/checkValidCategory', (req, res) => {
  let category = req.body.categoryName;
  let postQuery = "SELECT Id FROM `lookup` Where Name = '"+category+"' And Category = 'ProductCategory'";
  con.query(postQuery, (err, result) =>{
    if (err)
    {
      res.send
      ({
          message:'Data Not Inserted',
          data:null
      })
    }
    if(result.length == 0)
    {
      res.send
      ({
        message:'Data Inserted',
        data:null
    })
    }
    else
    {
      res.send
      ({
          message:'Data Inserted',
          data:result
      })
    }
  })
})


app.post('/saveCategory', (req, res) => {

  let category = req.body.categoryName;
  let postQuery = "INSERT INTO `lookup` (`Category`, `Name`) VALUES ('ProductCategory', '"+category+"')";
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

app.post('/checkValidSubCategory', (req, res) => {
  let subCategory = req.body.subCategoryName;
  let postQuery = "SELECT Id FROM `product_category` Where `Sub_Category` = '"+subCategory+"'";
  con.query(postQuery, (err, result) =>{
    if (err)
    {
      res.send
      ({
          message:'Data Not Inserted',
          data:null
      })
    }
    if(result.length == 0)
    {
      res.send
      ({
        message:'Data Inserted',
        data:null
    })
    }
    else
    {
      res.send
      ({
          message:'Data Inserted',
          data:result
      })
    }
  })
})

app.post('/saveSubCategory', (req, res) => {
  let subCategory = req.body.subCategoryName;
  let categoryId = req.body.categoryId;
  let postQuery = "INSERT INTO `product_category` (`Sub_Category`, `Categor_Id`) VALUES ('"+subCategory+"', '"+categoryId+"')";
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





app.post('/checkValidBrand', (req, res) => {
  let brand = req.body.brandName;
  let postQuery = "SELECT Id FROM `product_brand` Where `Brand` = '"+brand+"'";
  con.query(postQuery, (err, result) =>{
      if (err)
      {
        res.send
        ({
            message:'Data Not Inserted',
            data:null
        })
      }
      if(result.length == 0)
      {
        res.send
        ({
          message:'Data Inserted',
          data:null
      })
      }
      else
      {
        res.send
        ({
            message:'Data Inserted',
            data:result
        })
      }
  })
})



app.post('/saveBrand', (req, res) => {

  let brand = req.body.brandName;
  let postQuery = "INSERT INTO `product_brand` (`Brand`) VALUES ('"+brand+"')";
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

/*------------------------------------------ */
/*------------------------------------------ */
/*      For  Admin code ends From here       */
