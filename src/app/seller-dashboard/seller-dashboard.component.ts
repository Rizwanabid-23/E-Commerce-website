import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { ProductApiService } from '../Buyer/Services/product-api.service';
declare var window:any;


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
  annualSale:any
  annualExpense:any
  annualProfit:any
  monthlyProfit:any
  addStockModal:any;


  ngOnInit(): void {
    this.sellerName = this.ap.loginSellerName;
    this.getProductData();
    this.pushLocalDataInVariablesOnLoad();
    this.getSaleData();
    this.getAnnualSale();
    this.getAnnualExpense();
    this.getAnnualProfit();
    this.getMonthlyProfit();
    this.addStockModal = new window.bootstrap.Modal(
      document.getElementById("addStockModal")
    );
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
deleteProduct(pid:any,sid:any)
{
  console.log("prod id:",pid,"Sell id:",sid);

}
  // This function will get all product categories data
  getProductData(){
    this.service.getSellerProductData(localStorage.getItem('sellerLoginId')).subscribe((res) =>{
      this.prdData = res.data;
      console.log("prd data: ",this.prdData);
    })
  }

  getAnnualExpense()
  {
    this.service.annualExpense(localStorage.getItem('sellerLoginId')).subscribe((res)=>{
      this.annualExpense=res.data;
      // console.log("annual expense:",this.annualExpense);
    })
  }

  getAnnualProfit()
  {
    this.service.annualProfit(localStorage.getItem('sellerLoginId')).subscribe((res)=>{
      this.annualProfit=res.data;
      // console.log("annual profit:",this.annualProfit);
    })
  }

  getMonthlyProfit()
  {
    this.service.monthlyProfit(localStorage.getItem('sellerLoginId')).subscribe((res)=>{
      this.monthlyProfit=res.data;
      // console.log("monthly profit:",this.monthlyProfit);
    })
  }

  getAnnualSale()
  {

    this.service.annualSale(localStorage.getItem('sellerLoginId')).subscribe((res)=>{
      this.annualSale=res.data;
      // console.log("annual sale:",this.annualSale);
    })
  }
  getSaleData()
  {
    this.service.getAllSaleData(localStorage.getItem('sellerLoginId')).subscribe((res)=>{
      this.saleData=res.data;
      console.log("sale data:",this.saleData);
    })
  }

  openAddStockModal()
  {
    this.addStockModal.show();
  }
  closeAddStockModal()
  {
    this.addStockModal.hide();
  }

  openAddStockPage()
  {
    this.ap.goAddStockPagePage();
  }

  addStockForm = new FormGroup({
    'prdId': new FormControl('', Validators.required),
    'prdQuantity': new FormControl('', Validators.required)
  })
  saveProductStock()
  {

  }
  

}
