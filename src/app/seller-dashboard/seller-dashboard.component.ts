import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ProductApiService } from '../Buyer/Services/product-api.service';


@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css'],

})
export class SellerDashboardComponent implements OnInit {

  constructor(private ap:AppComponent,private service:ProductApiService) { }

  sellerName:any;
  prdData:any;
  saleData:any


  ngOnInit(): void {
    this.sellerName = this.ap.loginSellerName;
    this.getProductData();
    this.getSaleData();
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
