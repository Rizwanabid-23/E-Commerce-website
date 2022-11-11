import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AddToCartProduct } from '../AddToCartProduct';
import { ProductApiService } from '../Services/product-api.service';

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

  deliveryFee = 120;
  totalSelectedItems = 0;
  totaPricePerProduct = 0;
  totalPriceOFBill = 0;
  copyProducts =  [];
  localProducts:string;
  ngOnInit(): void {
    this.pushInArrayOnLoad();
    this.getSelectedProductData();
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
      this.addToCartProduct.forEach((items) =>
      {
        var element = document.getElementById("productheckBox"+items['prdId']+"") as HTMLInputElement;
        element.checked = true;
        items['isCheckBoxChecked'] = true;
      });
    }
    else
    {
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
  }

  copyInCopyProducts()
  {
    this.copyProducts = [];
    this.addToCartProduct.forEach((items) =>
    {
      this.copyProducts.push(items);
    });
  }
  copyInAddToCart()
  {
    this.addToCartProduct = [];
    this.copyProducts.forEach((items) =>
    {
      this.addToCartProduct.push(items);
    });
    localStorage.setItem("addToCartProducts", JSON.stringify(this.addToCartProduct));
    this.copyProducts = [];
  }
  deleteProduct() // This delete items which are checked.
  {
    this.copyInCopyProducts();
    this.addToCartProduct.forEach((items) =>
    {
      if(items['isCheckBoxChecked'])
      {
        const index = this.copyProducts.indexOf(items);
        console.log("index ",index);
        this.copyProducts.splice(index,1);
      }
    });
    this.copyInAddToCart();
    this.calculateBill();
  }



}
