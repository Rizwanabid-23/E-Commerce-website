import { Component, HostListener, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject }  from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ecommerce-website';
  // globalVariables
  public appOpen = true; // This will true when app will open
  public buyerLogin = false; // This will true when buyer will login
  public sellerLogin = false; // This will true when seller will login
  public loginBuyerId = -10; // This will store login buyer Id
  public loginSellerId = -10; // This will store login seller Id
  public loginSellerName = "Any"; 
  public clickedProductPictureId = -10;


  public readData:any;
  public brandName:any;
  public totalPrice:any;
  public description:any;
  public discount:any;
  public quantity:any;
  public prdName:any;
  public sellerName:any;
  public sellerCity:any;
  public discountedPrice:any;
  public prdImage:any;

}


