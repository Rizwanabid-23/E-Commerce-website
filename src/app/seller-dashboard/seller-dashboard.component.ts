import { AbstractType, Component, OnInit } from '@angular/core';
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

  monthlyProfit:any
  addStockModal:any;
  buyerData:any
  confirmationMessageModal:any;
  showMessage:any;
  selectedProductForDelete:any;
  showMsg:any;
  showMsgInDashboard:any;
  allEntriesRight:any;
  startDate:any;
  endDate:any;

  expense:any
  expenseBoxInHtml:any;
  expenseBoxText:any;

  sale:any
  saleBoxInHtml:any;
  saleBoxText:any;

  profit:any
  profitBoxInHtml:any;
  profitBoxText:any;

  soldProductQty:any;
  soldProductQtyText:any;

  remainingProductQty:any;
  remainingProductQtyText:any;

  ngOnInit(): void {
    this.onLoadHtmlPage()
    this.pushLocalDataInVariablesOnLoad();
    this.getProductData();
    this.getTotalExpense();
    this.getTotalSale();
    this.getTotalProfit();
    this.getTotalProductSold();
    this.getTotalProductRemaining();
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

  onLoadHtmlPage() // This will load text on html page while uploading
  {
    let date = new Date();
    // let year = date.getFullYear(); // current year
    this.expenseBoxInHtml = true;
    this.expenseBoxText = 'Total Expense Uptil now';
    this.saleBoxInHtml = true;
    this.saleBoxText = 'Total Sale Uptil now';
    this.profitBoxInHtml = true;
    this.profitBoxText = 'Total Profit Uptil now';
    this.soldProductQtyText = 'Total Product Quantity Sold Uptil Now';
    this.remainingProductQtyText  = 'Product Quantity Remaining in Stock';

  }

  //  Using with date calculating stastics start from here
  // ----------------------------------------------------
  // ----------------------------------------------------
  dateForm = new FormGroup({
    'startDate': new FormControl('', Validators.required),
    'endDate': new FormControl('', Validators.required)
  })

  getSelectedDate()
  {
    this.showMsgInDashboard = '';
    let currentDate = new Date()
    let start = new Date(this.dateForm.value.startDate);
    let end = new Date(this.dateForm.value.endDate);
    let selectedDate = 
    {
      startDate:start,
      endDate:end
    }
    if( (this.dateForm.value.startDate < this.dateForm.value.endDate) && ( end<=currentDate))
    {
      this.getExpenseByDate(selectedDate);
      this.getSaleByDate(selectedDate);
      this.getProductSoldByDate(selectedDate);
    }
    else{
      this.showMsgInDashboard = 'Start date should be less than end date and end date should be less than or equal to current date';
    }
  }


  async getExpenseByDate(dates)
  {
    let expenseOfYear = null;
    this.expenseBoxInHtml = false;
    await this.service.expenseByDate(dates, localStorage.getItem('sellerLoginId')).subscribe((res)=>{
      expenseOfYear = res.data;
      this.expenseBoxInHtml = true;
      if(expenseOfYear[0].ExenseOfYear == null)
      {
        this.expense = 0;
      }
      else
      {
        this.expense = expenseOfYear[0].ExenseOfYear;
      }
      let sdate = dates.startDate;
      let date = ("0" + sdate.getDate()).slice(-2); // current date
      let month = ("0" + (sdate.getMonth() + 1)).slice(-2); // current month
      let year = sdate.getFullYear(); // current year
      sdate = year + ":" + month + ":" + date;
      let edate = dates.endDate;
      date = ("0" + edate.getDate()).slice(-2); // current date
      month = ("0" + (edate.getMonth() + 1)).slice(-2); // current month
      year = edate.getFullYear(); // current year
      edate = year + ":" + month + ":" + date;
      this.expenseBoxText = 'Expense from '+sdate+' to '+edate;
    })
  }

  async getSaleByDate(dates)
  {
    let salOfYear = null;
    this.saleBoxInHtml = false;
    await this.service.saleByDate(dates, localStorage.getItem('sellerLoginId')).subscribe((res)=>{
      salOfYear = res.data;
      this.saleBoxInHtml = true;
      if(salOfYear[0].SaleOfYear == null)
      {
        this.sale = 0;
      }
      else
      {
        this.sale = salOfYear[0].SaleOfYear;
      }
      let sdate = dates.startDate;
      let date = ("0" + sdate.getDate()).slice(-2); // current date
      let month = ("0" + (sdate.getMonth() + 1)).slice(-2); // current month
      let year = sdate.getFullYear(); // current year
      sdate = year + ":" + month + ":" + date;
      let edate = dates.endDate;
      date = ("0" + edate.getDate()).slice(-2); // current date
      month = ("0" + (edate.getMonth() + 1)).slice(-2); // current month
      year = edate.getFullYear(); // current year
      edate = year + ":" + month + ":" + date;
      this.saleBoxText = 'Sale from '+sdate+' to '+edate;
      this.getProfitByDate(sdate, edate);
    })
  }

  getProfitByDate(sDate, eDate)
  {
    this.profit = this.sale-this.expense;
    this.profitBoxText = 'Profit from '+sDate+' to '+eDate;
  }

  getProductSoldByDate(dates)
  {
    let product = null;
    this.service.productSoldByDate(dates, localStorage.getItem('sellerLoginId')).subscribe((res)=>{
      product = res.data;
      console.log("sold datetete ", product);
      if(product[0].SoldQuantity == null)
      {
        this.soldProductQty = 0;
      }
      else
      {
        this.soldProductQty = product[0].SoldQuantity;
      }
      let sdate = dates.startDate;
      let date = ("0" + sdate.getDate()).slice(-2); // current date
      let month = ("0" + (sdate.getMonth() + 1)).slice(-2); // current month
      let year = sdate.getFullYear(); // current year
      sdate = year + ":" + month + ":" + date;
      let edate = dates.endDate;
      date = ("0" + edate.getDate()).slice(-2); // current date
      month = ("0" + (edate.getMonth() + 1)).slice(-2); // current month
      year = edate.getFullYear(); // current year
      edate = year + ":" + month + ":" + date;
      this.soldProductQtyText = 'Sold Products from '+sdate+' to '+edate;
      this.getProfitByDate(sdate, edate);
      this.dateForm.reset();
    })
  }

  // getProductRemainingByDate(dates)
  // {
  //   let product = null;
  //   this.service.productRemainingByDate(dates, localStorage.getItem('sellerLoginId')).subscribe((res)=>{
  //     product = res.data;
  //     console.log("remememem ", product);
  //     if(product[0].ReamainingQuantity == null)
  //     {
  //       this.remainingProductQty = 0;
  //     }
  //     else
  //     {
  //       this.remainingProductQty = product[0].ReamainingQuantity;
  //     }
  //   })
  // }



  //  Using with date calculating stastics end  from here
  // ----------------------------------------------------
  // ----------------------------------------------------


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

  getTotalExpense()
  {
    let expenseOfYear = null;
    this.service.totalExpense(localStorage.getItem('sellerLoginId')).subscribe((res)=>{
      expenseOfYear = res.data;
      if(expenseOfYear[0].ExenseOfYear == null)
      {
        this.expense = 0;
      }
      else
      {
        this.expense = expenseOfYear[0].ExenseOfYear;
      }
    })
  }

  getTotalSale()
  {
    let salOfYear = null;
    this.service.totalSale(localStorage.getItem('sellerLoginId')).subscribe((res)=>{
      salOfYear = res.data;
      if(salOfYear[0].SaleOfYear == null)
      {
        this.sale = 0;
      }
      else
      {
        this.sale = salOfYear[0].SaleOfYear;
      }
      this.getTotalProfit();
    })
  }

  getTotalProfit()
  {
    console.log("salalal ",this.sale);
    this.profit = this.sale-this.expense;
  }


  getTotalProductSold()
  {
    let product = null;
    this.service.totalProductSold(localStorage.getItem('sellerLoginId')).subscribe((res)=>{
      product = res.data;
      if(product[0].SoldQuantity == null)
      {
        this.soldProductQty = 0;
      }
      else
      {
        this.soldProductQty = product[0].SoldQuantity;
      }
    })
  }

  getTotalProductRemaining()
  {
    let product = null;
    this.service.totalProductremaining(localStorage.getItem('sellerLoginId')).subscribe((res)=>{
      product = res.data;
      console.log("remememem ", product);
      if(product[0].ReamainingQuantity == null)
      {
        this.remainingProductQty = 0;
      }
      else
      {
        this.remainingProductQty = product[0].ReamainingQuantity;
      }
    })
  }




  

  getBuyerData()
  {
    this.service.getBuyerData(localStorage.getItem('sellerLoginId')).subscribe((res)=>{
      if(res.data == null)
      {
        this.profit = 0;
      }
      else
      {
        this.profit = res.data;
      }
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
