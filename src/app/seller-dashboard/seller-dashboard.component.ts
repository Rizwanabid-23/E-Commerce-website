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
  showMsg:any;
  allEntriesRight:any;

  ngOnInit(): void {
    this.sellerName = this.ap.loginSellerName;
    this.getProductData();
    this.pushLocalDataInVariablesOnLoad();
    // this.getSaleData();
    this.getAnnualSale();
    this.getAnnualExpense();
    // this.getAnnualProfit();
    // this.getMonthlyProfit();
    // this.getBuyerData();
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
        this.prdData = 0;
      }
      else
      {
        this.prdData = res.data;
      }
    })
  }

  getAnnualExpense()
  {
    let expenseOfYear = null;
    this.service.annualExpense(localStorage.getItem('sellerLoginId')).subscribe((res)=>{
      expenseOfYear = res.data;
      if(expenseOfYear[0].ExenseOfYear == null)
      {
        this.annualExpense = 0;
      }
      else
      {
        this.annualExpense = expenseOfYear[0].ExenseOfYear;
      }
    })
  }

  getAnnualSale()
  {
    let salOfYear = null;
    this.service.annualSale(localStorage.getItem('sellerLoginId')).subscribe((res)=>{
      salOfYear = res.data;
      if(salOfYear[0].SaleOfYear == null)
      {
        this.annualSale = 0;
      }
      else
      {
        this.annualSale = salOfYear[0].SaleOfYear;
      }
    })
  }
  getAnnualProfit()
  {
    this.service.annualProfit(localStorage.getItem('sellerLoginId')).subscribe((res)=>{
      this.annualProfit = res.data;
      if(this.annualProfit[0].annualProfit == null)
      {
        this.annualProfit = 0;
      }
      else
      {
        this.annualProfit = this.annualProfit[0].annualProfit;
      }
    })
  }

  getBuyerData()
  {
    this.service.getBuyerData(localStorage.getItem('sellerLoginId')).subscribe((res)=>{
      if(res.data == null)
      {
        this.annualProfit = 0;
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
      this.monthlyProfit = res.data;
      if(this.monthlyProfit[0].monthlyProfit == null)
      {
        this.monthlyProfit = 0;
      }
      else
      {
        this.monthlyProfit = this.monthlyProfit[0].monthlyProfit;
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

  // For add Stock code Start from here 
  ////////////////////////////////////
  ////////////////////////////////////
  addStockForm = new FormGroup({
    'prdId': new FormControl('', Validators.required),
    'prdQuantity': new FormControl('', Validators.required),
    'prdBuyPrice': new FormControl('', Validators.required),
    'prdSellPrice': new FormControl('', Validators.required),
    'prdDiscount': new FormControl('', Validators.required)
  })

  async saveProductStock()
  {
    this.allEntriesRight = true;
    if(this.addStockForm.value.prdSellPrice < this.addStockForm.value.prdBuyPrice)
    {
      this.allEntriesRight = false;
      this.showMsg = 'Sell Price Should be Greater than Buying Price';
    }
    else if((parseInt(this.addStockForm.value.prdDiscount) < 0) || (parseInt(this.addStockForm.value.prdDiscount) > 99))
    {
      this.allEntriesRight = false;
      this.showMsg = 'Discount should between 1 and 99';
    }
    else if((parseInt(this.addStockForm.value.prdQuantity) <= 0) || (parseInt(this.addStockForm.value.prdQuantity) > 99))
    {
      this.allEntriesRight = false;
      this.showMsg = 'Quantity should between 1 and 99';
    }
    if(this.allEntriesRight)
    {
      let data = {
        "prdBuyPrice":this.addStockForm.value.prdBuyPrice,
        "prdSellPrice":this.addStockForm.value.prdSellPrice,
        "prdDiscountPercentage":this.addStockForm.value.prdDiscount,
        "quantity":this.addStockForm.value.prdQuantity
      }
      let response = null;
      await this.service.insertProductStock(data ,this.addStockForm.value.prdId).subscribe(res => {
        response = res.data;
        if(response != null)
        {
          this.updateRecent(response, this.addStockForm.value.prdId)
        }
      });
    }
  }

  async updateRecent(insertStockId, insertedPrdId) {
    let response = null;
    let data = {
      "pId":insertedPrdId,
      "pStockId": insertStockId
    }
    await this.service.updateRecentAddedStock(data).subscribe(res => {
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
  // For add Stock codeEnds Start from here 
  ////////////////////////////////////
  ////////////////////////////////////


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

  deleteProduct(prdId)
  {
    let response = null;
    let data =
    {
      'prdId': prdId,
    }
    this.service.deleteSelectedProduct(data).subscribe(res => {
      response = res.data;
      if(response != null)
      {
        this.ap.showTextInMessageModal = "Successfully Deleted";
        this.ap.navigateOnNextPage = "SellerDashboard";
        this.ap.goMessageModalPage();
      }
    });
  }

  updateProduct(prdId)
  {
    this.ap.navigateOnNextPage = "SellerDashboard";
    console.log("selected ",prdId , localStorage.getItem('sellerLoginId'));
  }

}
