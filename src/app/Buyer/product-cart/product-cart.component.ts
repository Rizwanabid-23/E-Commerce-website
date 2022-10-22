import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

  constructor(private ap:AppComponent, private router:Router) { }

  allTotalPrice = 0;
  selectQuantity:any;
  selectedPrdQuantity = 0;
  deliveryFee = 120;
  lbrandName:any;
  ltotalPrice:any;
  ldescription:any;
  ldiscount:any;
  totalQuantity:any;
  lprdName:any;
  lsellerName:any;
  lsellerCity:any;
  ldiscountedPrice:any;
  prdsTotalPrice:any;
  ngOnInit(): void {
    this.onLoadShow();
  }

  onLoadShow()
  {
    this.selectQuantity = 1;
    this.lbrandName = this.ap.brandName;
    this.ltotalPrice = this.ap.totalPrice;
    this.ldescription = this.ap.description;
    this.ldiscount = this.ap.discount;
    this.totalQuantity = this.ap.quantity;
    this.lprdName = this.ap.prdName;
    this.lsellerName = this.ap.sellerName;
    this.lsellerCity = this.ap.sellerCity;
    this.ldiscountedPrice = this.ap.discountedPrice;
    this.calculatePrdPrice();
    this.calculateTotalPrice();
  }

  clickOnPlusSign()
  {
    if(this.selectQuantity < this.totalQuantity){
      this.selectQuantity = this.selectQuantity+1;
      this.calculatePrdPrice();
      this.calculateTotalPrice();
    }
  }

  clickOnMinusSign()
  {
    if(this.selectQuantity > 1){
      this.selectQuantity = this.selectQuantity-1;
      this.calculatePrdPrice();
      this.calculateTotalPrice();
    }
  }

  calculatePrdPrice(){
    this.prdsTotalPrice = this.selectQuantity*this.ldiscountedPrice;
  }
  calculateTotalPrice(){
    this.allTotalPrice = (this.selectQuantity*this.ldiscountedPrice)+this.deliveryFee;
  }

}
