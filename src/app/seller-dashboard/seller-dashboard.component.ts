import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { GlobalData } from '../App/navbar/GlobalData';
import { ProductApiService } from '../Buyer/Services/product-api.service';


@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css'],

})
export class SellerDashboardComponent implements OnInit {

  constructor(private ap:AppComponent, private service:ProductApiService) { }

  sellerName:any;
  prdData:any;
  saleData:any


  ngOnInit(): void {
    this.sellerName = this.ap.loginSellerName;
    this.getProductData();
    this.pushLocalDataInVariablesOnLoad();
    this.getSaleData();
  }
  pushLocalDataInVariablesOnLoad(){ // This will load items in array from localstorage that are already selected by user
    this.ap.loginSellerId = parseInt(localStorage.getItem('sellerLoginId'));
    this.ap.loginSellerName = localStorage.getItem('sellerLoginName');
    this.sellerName = this.ap.loginSellerName;
    if(this.ap.loginSellerId > 0)
    {
      this.ap.buyerLogin = false;
      this.ap.appOpen = false;
      this.ap.sellerLogin = true;
    }

  }

  // This function will get all product categories data
  getProductData(){
    this.service.getSellerProductData().subscribe((res) =>{
      this.prdData = res.data;
      console.log(this.prdData)
    })
  }

  getSaleData()
  {
    this.service.getAllSaleData().subscribe((res)=>{
      this.saleData=res.data;
      console.log(this.saleData);
    })
  }
  

}
