import { Component, OnInit } from '@angular/core';
import { ProductApiService } from '../Services/product-api.service';
import { AppComponent } from 'src/app/app.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import { GlobalData } from 'src/app/App/navbar/GlobalData';

@Component({
  selector: 'app-prod-and-seller-description',
  templateUrl: './prod-and-seller-description.component.html',
  styleUrls: ['./prod-and-seller-description.component.css']
})
export class ProdAndSellerDescriptionComponent implements OnInit {

  constructor(private service:ProductApiService, private ap:AppComponent, private router:Router) { }

  readData:any;
  brandName:any;
  totalPrice:any;
  description:any;
  discount:any;
  quantity:any;
  prdName:any;
  sellerName:any;
  sellerCity:any;
  discountedPrice:any;
  prdImage:any;
  isBuyerLogin:Boolean;
  clickedProduct:any;
  ngOnInit(): void {
    this.manageLocalStorage();
    this.getSelectedProductData();
    this.isBuyerLogin = this.ap.buyerLogin;
    this.ap.productCartPageOpenThroughAddToCartBtn = false;
  }

  manageLocalStorage()
  {
    this.clickedProduct = parseInt(sessionStorage.getItem('clickedPrdInPrdndSellerDescrip'));
    console.log("clicccc ", this.clickedProduct);
  }

  public getSelectedProductData() // This function will get data against selected product 
  {
    this.service.getProductData(this.clickedProduct).subscribe((res) =>{
      this.readData = res.data;
      this.brandName = this.readData[0].Brand;
      this.totalPrice = this.readData[0].SellPrice;
      this.description = this.readData[0].Description;
      this.discount = this.readData[0].Discount;
      this.quantity = this.readData[0].Quantity;
      this.prdName = this.readData[0].Name;
      this.sellerName = this.readData[0].FName+" "+this.readData[0].LName;
      this.sellerCity = this.readData[0].SellerCity;
      this.discountedPrice = this.calculatediscountedPrice(this.totalPrice, this.discount);
      this.prdImage = this.readData[0].Picture;
      console.log("Image clickeddd  ",this.prdImage);

    })
  }

  calculatediscountedPrice(price, discountPercentage){
    return price - (price*discountPercentage/100)
  }
  addToCart()
  {
    this.ap.productCartPageOpenThroughAddToCartBtn = true;
    this.ap.goProductCartPage();
  }


}

