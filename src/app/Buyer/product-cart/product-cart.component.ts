import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AddToCartProduct } from '../AddToCartProduct';
import { ProductApiService } from '../Services/product-api.service';
declare var window:any;

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

  addToCartProduct:AddToCartProduct[];
  constructor(private ap:AppComponent, private router:Router, private service:ProductApiService) { 
    this.addToCartProduct = [];
    this.copyProducts =  [];
  }

  readData:any;

  showMessage:any;
  deliveryFee = 120;
  totalSelectedItems = 0;
  totaPricePerProduct = 0;
  totalPriceOFBill = 0;
  buyerDeliverAddresses:any;
  copyProducts =  [];
  alreadyAddressExists:any;
  localProducts:string;
  deliveryAddressModal:any;
  confirmationModal:any;
  recentLoginBuyerId:any;
  placeOrderButtonPropertyDisable:any;
  abc = true;
  ngOnInit(): void {
    this.alreadyAddressExists = false;
    this.placeOrderButtonPropertyDisable = true;
    this.pushInArrayOnLoad();
    if(this.ap.productCartPageOpenThroughAddToCartBtn)
    {
      this.getSelectedProductData();
    }
    
    this.deliveryAddressModal = new window.bootstrap.Modal(
      document.getElementById("deliveryModal")
    );
    this.confirmationModal = new window.bootstrap.Modal(
      document.getElementById("confirmationModal")
    );
    this.getBuyerAddress();

  }

  pushInArrayOnLoad(){ // This will load items in array from localstorage that are already selected by user
    this.localProducts = localStorage.getItem("addToCartProducts");
    if(this.localProducts == null)
    {
      this.addToCartProduct = [];
    }
    else
    {
      this.addToCartProduct = JSON.parse(this.localProducts);
    }
    this.addToCartProduct.forEach((items) =>
    {
      items['prdQuantity'] = 1;
      items['isCheckBoxChecked'] = false;
    });
    this.recentLoginBuyerId = parseInt(sessionStorage.getItem('buyerLoginId')); // Get Login Buyer Id
  }

  getSelectedProductData() // This function will get data against selected product 
  {
    let isPrdAlreadyExist = false;
    this.service.getProductData(this.ap.clickedProductPictureId).subscribe((res) =>{
      this.readData = res.data;
      let product = {
        prdId:this.readData[0].Id,
        prdName:this.readData[0].Name,
        prdBrandName:this.readData[0].Brand,
        prdTotalPrice:this.readData[0].SellPrice,
        prdDiscount:this.readData[0].Discount,
        prdDiscountedPrice:this.calculatediscountedPrice(this.readData[0].SellPrice, this.readData[0].Discount),
        prdImage:this.readData[0].Picture,
        prdQuantity:1,
        isCheckBoxChecked:false
      }
      this.addToCartProduct.forEach((items) =>
      {
        if (items['prdId'] == this.readData[0].Id)
        {
          isPrdAlreadyExist = true;
        }
      });
      if (!isPrdAlreadyExist){
        this.addToCartProduct.push(product);
        localStorage.setItem("addToCartProducts", JSON.stringify(this.addToCartProduct));
      }
    })
  }
  getSelectedProductQuantityOnPlus(id) // This function will get data against selected product 
  {
    let quantity = 0;
    this.service.getProductQuantity(id).subscribe((res) =>{
      this.readData = res.data;
      quantity =  this.readData[0].Quantity;
      this.addToCartProduct.forEach((items) =>
      {
        if (id == items['prdId']){
          if(items['prdQuantity'] < quantity){
            items['prdQuantity'] = items['prdQuantity']+1;
          }
        }
      });
      this.calculateBill();
    })
  }

  clickOnMinusSign(id) // This will minus one quantity if quantity is greater than one 
  {
    this.addToCartProduct.forEach((items) =>
    {
      if (id == items['prdId']){
        if(items['prdQuantity'] > 1){
          items['prdQuantity'] = items['prdQuantity']-1;
        }
      }
    });
    this.calculateBill();
  }

  calculatePrdPrice(quantity, price){ //This will calculate Product Price by multiplying quantity
    return quantity*price;
  }

  calculatediscountedPrice(price, discount){ // This will calculate price by applying discount
    return price - (price*discount)/100;
  }

  calculateBill() // This will calculate total quantity, total price and total of bill
  {
    this.totalSelectedItems = 0;
    this.totaPricePerProduct = 0;
    this.totalPriceOFBill = 0;
    let perPrdPrice = 0;
    this.addToCartProduct.forEach((items) =>
    {
      if (items['isCheckBoxChecked']){
        this.totalSelectedItems = this.totalSelectedItems+items['prdQuantity'];
        perPrdPrice = this.calculatePrdPrice(items['prdQuantity'], items['prdDiscountedPrice']);
        this.totaPricePerProduct = this.totaPricePerProduct+perPrdPrice;
        this.totalPriceOFBill = this.totaPricePerProduct+this.deliveryFee;
      }
    });
  }
  clickOnSelectAllCheckBox() // If checkbox is already checked than checkbox will be uncheck and vice versa.
                            // This will also check or uncheck all checkboxes.
  {
    var element = document.getElementById("selectAllCheckBox") as HTMLInputElement;
    var isChecked = element.checked;
    if(isChecked)
    {
      if(this.alreadyAddressExists)
      {
        this.placeOrderButtonPropertyDisable = false;
      }
      this.addToCartProduct.forEach((items) =>
      {
        var element = document.getElementById("productheckBox"+items['prdId']+"") as HTMLInputElement;
        element.checked = true;
        items['isCheckBoxChecked'] = true;
      });
    }
    else
    {
      this.placeOrderButtonPropertyDisable = true;
      this.addToCartProduct.forEach((items) =>
      {
        var element = document.getElementById("productheckBox"+items['prdId']+"") as HTMLInputElement;
        element.checked = false;
        items['isCheckBoxChecked'] = false;
      });
    }

    this.calculateBill();
  }

  clickOnCheckBox(id, quantity, price) // If checkbox will be checked checkbox will be unchecked and vice versa.
  {
    var element = document.getElementById("productheckBox"+id+"") as HTMLInputElement;
    var isChecked = element.checked;
    this.addToCartProduct.forEach((items) =>
    {
      if (id == items['prdId']){
        items['isCheckBoxChecked'] = isChecked;
      }
    });
    this.calculateBill();
    if(this.isAnyProductCheckBoxSelected())
    {
      this.placeOrderButtonPropertyDisable = true;
    }
    else
    {
      if(this.alreadyAddressExists)
      {
        this.placeOrderButtonPropertyDisable = false;
      }
    }

  }

  // This will check if any product check box is selected will return false otherwise true
  isAnyProductCheckBoxSelected():Boolean
  {
    let productSelected = false;
    this.addToCartProduct.forEach((items) =>
    {
      if (items['isCheckBoxChecked']){
        productSelected = true;
        return false;
      }
    });
    if(!productSelected)
    {
      return true;
    }
   
  }

  copyInCopyProducts()
  {
    this.copyProducts = [];
    this.addToCartProduct.forEach((items) =>
    {
      this.copyProducts.push(items);
    });
  }

  deleteProduct() // This delete items which are checked.
  {
    this.copyInCopyProducts();
    this.copyProducts.forEach((items) =>
    {
      if(items['isCheckBoxChecked'])
      {
        const index = this.addToCartProduct.indexOf(items);
        this.addToCartProduct.splice(index,1);
      }
    });
    localStorage.setItem("addToCartProducts", JSON.stringify(this.addToCartProduct));
    this.calculateBill();
  }

  // Code For Modal Start From Here
  // ------------------------------
  // ------------------------------
  // ------------------------------
  

  
  cities = [
    "Ahmadpur East",
    "Ahmed Nager Chatha",
    "Ali Khan Abad",
    "Alipur",
    "Arifwala",
    "Attock",
    "Bhera",
    "Bhalwal",
    "Bahawalnagar",
    "Bahawalpur",
    "Bhakkar",
    "Burewala",
    "Chenab Nagar",
    "Chillianwala",
    "Choa Saidanshah",
    "Chakwal",
    "Chak Jhumra",
    "Chichawatni",
    "Chiniot",
    "Chishtian",
    "Chunian",
    "Dajkot",
    "Daska",
    "Davispur",
    "Darya Khan",
    "Dera Ghazi Khan",
    "Dhaular",
    "Dina",
    "Dinga",
    "Dhudial Chakwal",
    "Dipalpur",
    "Faisalabad",
    "Fateh Jang",
    "Ghakhar Mandi",
    "Gojra",
    "Gujranwala",
    "Gujrat",
    "Gujar Khan",
    "Harappa",
    "Hafizabad",
    "Haroonabad",
    "Hasilpur",
    "Haveli Lakha",
    "Islamabad",
    "Jalalpur Jattan",
    "Jampur",
    "Jaranwala",
    "Jhang",
    "Jhelum",
    "Jauharabad",
    "Kallar Syedan",
    "Kalabagh",
    "Karor Lal Esan",
    "Karachi",
    "Kasur",
    "Kamalia",
    "Kāmoke",
    "Khanewal",
    "Khanpur",
    "Khanqah Sharif",
    "Kharian",
    "Khushab",
    "Kot Adu",
    "Lahore",
    "Lalamusa",
    "Layyah",
    "Lawa Chakwal",
    "Liaquat Pur",
    "Lodhran",
    "Malakwal",
    "Mamoori",
    "Mailsi",
    "Mandi Bahauddin",
    "Mian Channu",
    "Mianwali",
    "Miani",
    "Multan",
    "Murree",
    "Muridke",
    "Mianwali Bangla",
    "Muzaffargarh",
    "Narowal",
    "Nankana Sahib",
    "Okara",
    "Pakpattan",
    "Pattoki",
    "Pindi Bhattian",
    "Pind Dadan Khan",
    "Pir Mahal",
    "Qaimpur",
    "Qila Didar Singh",
    "Raiwind",
    "Rajanpur",
    "Rahim Yar Khan",
    "Rawalpindi",
    "Renala Khurd",
    "Sadiqabad",
    "Sagri",
    "Sahiwal",
    "Sambrial",
    "Samundri",
    "Sangla Hill",
    "Sarai Alamgir",
    "Sargodha",
    "Shakargarh",
    "Sheikhupura",
    "Shujaabad",
    "Sialkot",
    "Sohawa",
    "Soianwala",
    "Siranwali",
    "Tandlianwala",
    "Talagang",
    "Taxila",
    "Toba Tek Singh",
    "Vehari",
    "Wah Cantonment",
    "Wazirabad",
    "Yazman",
    "Zafarwal"
  ]
  
  buyerAddressForm = new FormGroup({
    'fullName':new FormControl('',Validators.required),
    'phoneNo':new FormControl('',Validators.required),
    'colSubLocLan':new FormControl('',Validators.required),
    'province':new FormControl('',Validators.required),
    'city':new FormControl('',Validators.required),
    'buiHouFloStr':new FormControl('',Validators.required),
    'nickName':new FormControl('',Validators.required),
  })
  openAddAddressModal()
  {
    this.deliveryAddressModal.show();
  }
  closeAddAddressModal()
  {
    this.deliveryAddressModal.hide();
  }
  saveBuyerAddress()
  {
    // console.log(this.buyerAddressForm.value);
    this.service.insertBuyerAddress(sessionStorage.getItem('buyerLoginId'),this.buyerAddressForm.value).subscribe((res) => {
      this.readData = res.data;
      // console.log(this.readData);
      this.deliveryAddressModal.hide();
      this.buyerAddressForm.reset();
      this.getBuyerAddress();
      
    });
  }
  // This will get buyer delivery addresses
  getBuyerAddress()
  {
    this.service.getBuyerAddress(this.recentLoginBuyerId).subscribe((res) => {
      this.readData = res.data;
      if(this.readData != null)
      {
        this.alreadyAddressExists = true;
        this.buyerDeliverAddresses = this.readData;
      }
    });
  }


  // Proceed Order Start froms Here
  openConfirmationModal()
  {
    this.confirmationModal.show();
  }
  // closeConfirmationModal()
  // {
  
  // }
  ordered(time)
  {
    setTimeout (() => {
      this.closeConfirmationModal()
    }, time);
  }
  closeConfirmationModal()
  {
    this.confirmationModal.hide();
    this.ap.goHomePage();
  }

  buyerOrderForm = new FormGroup({
    'addressId':new FormControl('',Validators.required),
    // 'pricePerProduct':new FormControl('',Validators.required),
    // 'deliveryFees':new FormControl('',Validators.required),
    // 'priceOfBill':new FormControl('',Validators.required),
  })

//  This will save buyer order
  saveBuyerOrder()
  {
    this.service.insertOrder(this.recentLoginBuyerId,this.buyerOrderForm.value).subscribe((res) => {
      this.readData = res.data;
      // console.log(this.readData)
      this.saveBuyerOrderDetail(this.readData);
    });
  }

// This will save buyer order details
  saveBuyerOrderDetail(orderId)
  {
    let response;
    let selectedProducts = [];
    this.addToCartProduct.forEach((items) =>
    {
      var element = document.getElementById("productheckBox"+items['prdId']+"") as HTMLInputElement;
      var qty = document.getElementById("productSelectedQty"+items['prdId']+"").innerHTML;

      if(element.checked)
      {
        let orderedProduct = {
          orderId:parseInt(orderId),
          selectedPrdId:parseInt(items['prdId']),
          selectedPrdQuantity:parseInt(qty),
        }

        selectedProducts.push(orderedProduct);
      }
    });
    
    this.service.insertOrderDetails(selectedProducts).subscribe((res) => {
      response = res.data;
      if(response != null)
      {
        this.showMessage = "Order Deliver Started";
        this.openConfirmationModal();
        this.removeOrderedProduct();
        this.ordered(1000);
      }
      else
      {
        this.showMessage = "Order Not Deliver";
        this.openConfirmationModal();
        this.ordered(1500);
      }

    });
  }

  removeOrderedProduct() // This wil remove product from add to cart page which is ordered by buyer
  {
    this.copyInCopyProducts();
    this.copyProducts.forEach((items) =>
    {
      if(items['isCheckBoxChecked'])
      {
        const index = this.addToCartProduct.indexOf(items);
        this.addToCartProduct.splice(index,1);
      }
    });
    localStorage.setItem("addToCartProducts", JSON.stringify(this.addToCartProduct));
  }

}
