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
  buyerData:any
  confirmationMessageModal:any;
  showMessage:any;
  selectedProductForDelete:any;


  ngOnInit(): void {
    this.sellerName = this.ap.loginSellerName;
    this.getProductData();
    this.pushLocalDataInVariablesOnLoad();
    this.getSaleData();
    this.getAnnualSale();
    this.getAnnualExpense();
    this.getAnnualProfit();
    this.getMonthlyProfit();
    this.getBuyerData();
    this.addStockModal = new window.bootstrap.Modal(
      document.getElementById("addStockModal")
    );
    this.confirmationMessageModal = new window.bootstrap.Modal(
      document.getElementById("showMessageModal")
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

  // This function will get all product categories data
  getProductData(){
    this.service.getSellerProductData(localStorage.getItem('sellerLoginId')).subscribe((res) =>{
      if(res.data == null)
      {
        this.prdData = null;
      }
      else
      {
        this.prdData = res.data;
      }
    })
  }

  getAnnualExpense()
  {
    this.service.annualExpense(localStorage.getItem('sellerLoginId')).subscribe((res)=>{
      if(res.data == null)
      {
        this.annualExpense = null;
      }
      else
      {
        this.annualExpense = res.data;
      }
    })
  }

  getAnnualProfit()
  {
    this.service.annualProfit(localStorage.getItem('sellerLoginId')).subscribe((res)=>{
      if(res.data == null)
      {
        this.annualProfit = null;
      }
      else
      {
        this.annualProfit = res.data;
      }
    })
  }

  getBuyerData()
  {
    this.service.getBuyerData(localStorage.getItem('sellerLoginId')).subscribe((res)=>{
      if(res.data == null)
      {
        this.annualProfit = null;
      }
      else
      {
        this.annualProfit = res.data;
      }
    })
  }

  getMonthlyProfit()
  {
    this.service.monthlyProfit(localStorage.getItem('sellerLoginId')).subscribe((res)=>{
      if(res.data == null)
      {
        this.monthlyProfit = null;
      }
      else
      {
        this.monthlyProfit = res.data;
      }
    })
  }

  getAnnualSale()
  {

    console.log('annual');
    this.service.annualSale(localStorage.getItem('sellerLoginId')).subscribe((res)=>{
      if(res.data == null)
      {
        this.annualSale = null;
      }
      else
      {
        this.annualSale = res.data;
      }
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

  async saveProductStock()
  {
    let response = null;
    await this.service.saveProductStock(this.addStockForm.value ,localStorage.getItem('sellerLoginId')).subscribe(res => {
      response = res.data;
      if(response != null)
      {
        this.closeAddStockModal();
        this.ap.showTextInMessageModal = "Stock Successfully Saved";
        this.ap.navigateOnNextPage = "SellerDashboard";
        this.ap.goMessageModalPage();
        this.addStockForm.reset();
      }
    });
  }


  // cliclOnCancelButtonInModal()
  // {
  //   console.log("cliclOnCancelButton");
  //   this.closeConfimationMessageModal();
  // }

  // clickOnOkButtonInModal()
  // {
  //   console.log("clickOnOkButton");
  //   let response = null;
  //   let formData = new FormData()
  //   formData.append('prdId', this.selectedProductForDelete);
  //   formData.append('sellerId', localStorage.getItem('sellerLoginId'));
  //   this.service.deleteSelectedProduct(formData).subscribe(res => {
  //     response = res.data;
  //     if(response != null)
  //     {
  //       this.ap.showTextInMessageModal = "Successfully Deleted";
  //       this.ap.navigateOnNextPage = "SellerDashboard";
  //       this.ap.goMessageModalPage();
  //       this.addStockForm.reset();
  //     }
  //   });
  //   this.closeConfimationMessageModal();
  // }

  // openConfimationMessageModal()
  // {
  //   this.confirmationMessageModal.show();
  // }
  // closeConfimationMessageModal()
  // {
  //   this.confirmationMessageModal.hide();
  // }

  deleteProduct(prdId, qty, prdName)
  {
        console.log("clickOnOkButton");
        let response = null;
        let formData = new FormData()
        formData.append('prdId', this.selectedProductForDelete);
        formData.append('sellerId', localStorage.getItem('sellerLoginId'));
        this.service.deleteSelectedProduct(formData).subscribe(res => {
          response = res.data;
          if(response != null)
          {
            this.ap.showTextInMessageModal = "Successfully Deleted";
            this.ap.navigateOnNextPage = "SellerDashboard";
            this.ap.goMessageModalPage();
            this.addStockForm.reset();
          }
        });
    console.log("selected ",prdId , localStorage.getItem('sellerLoginId'));
  }

  updateProduct(prdId)
  {
    this.ap.navigateOnNextPage = "SellerDashboard";
    console.log("selected ",prdId , localStorage.getItem('sellerLoginId'));
  }

}
