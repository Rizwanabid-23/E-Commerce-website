import { AbstractType, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { ProductApiService } from '../Buyer/Services/product-api.service';
declare var window: any;

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css'],
})
export class SellerDashboardComponent implements OnInit {
  constructor(private ap: AppComponent, private service: ProductApiService) {}

  sellerName: any;
  prdData: any;
  saleData: any;
  selectedPrdInUpdatedModal: any;
  readData: any;
  monthlyProfit: any;
  addStockModal: any;
  buyerData: any;
  confirmationMessageModal: any;
  updateProductModal: any;
  showMessage: any;
  selectedProductForDelete: any;
  showMsg: any;
  showMsgInDashboard: any;
  showMsgInUpdateProductModal: any;
  allEntriesRight: any;
  startDate: any;
  endDate: any;

  expense: any;
  expenseBoxInHtml: any;
  expenseBoxText: any;

  sale: any;
  saleBoxInHtml: any;
  saleBoxText: any;

  profit: any;
  profitBoxInHtml: any;
  profitBoxText: any;

  soldProductQty: any;
  soldProductQtyText: any;

  remainingProductQty: any;
  remainingProductQtyText: any;

  ngOnInit(): void {
    this.onLoadHtmlPage();
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
      document.getElementById('addStockModal')
    );
    this.confirmationMessageModal = new window.bootstrap.Modal(
      document.getElementById('showMessageModal')
    );
    this.updateProductModal = new window.bootstrap.Modal(
      document.getElementById('updateProductModal')
    );
  }

  pushLocalDataInVariablesOnLoad() {
    // This will load items in array from sessionStorage that are already selected by user
    this.ap.loginSellerId = parseInt(sessionStorage.getItem('sellerLoginId'));
    this.ap.loginSellerName = sessionStorage.getItem('sellerLoginName');
    this.sellerName = this.ap.loginSellerName;
    if (this.ap.loginSellerId > 0) {
      this.ap.buyerLogin = false;
      this.ap.appOpen = false;
      this.ap.sellerLogin = true;
    }
  }

  onLoadHtmlPage() { // This will load text on html page while uploading
    let date = new Date();
    // let year = date.getFullYear(); // current year
    this.expenseBoxInHtml = true;
    this.expenseBoxText = 'Total Expense Uptil now';
    this.saleBoxInHtml = true;
    this.saleBoxText = 'Total Sale Uptil now';
    this.profitBoxInHtml = true;
    this.profitBoxText = 'Total Profit Uptil now';
    this.soldProductQtyText = 'Total Product Quantity Sold Uptil Now';
    this.remainingProductQtyText = 'Product Quantity Remaining in Stock';
  }
  logOut() {
    sessionStorage.removeItem('sellerLoginId');
    this.ap.goSellerSignInPage();
  }
  //  Using with date calculating stastics start from here
  // ----------------------------------------------------
  // ----------------------------------------------------
  dateForm = new FormGroup({
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
  });

  getSelectedDate() {
    this.showMsgInDashboard = '';
    let currentDate = new Date();
    let start = new Date(this.dateForm.value.startDate);
    let end = new Date(this.dateForm.value.endDate);
    let selectedDate = {
      startDate: start,
      endDate: end,
    };
    if (
      this.dateForm.value.startDate < this.dateForm.value.endDate &&
      end <= currentDate
    ) {
      this.getExpenseByDate(selectedDate);
      this.getSaleByDate(selectedDate);
      this.getProfitByDate(selectedDate);
      this.getProductSoldByDate(selectedDate);
    } else {
      this.showMsgInDashboard =
        'Start date should be less than end date and end date should be less than or equal to current date';
    }
  }

  async getExpenseByDate(dates) {
    let expenseOfYear = null;
    this.expenseBoxInHtml = false;
    await this.service
      .expenseByDate(dates, sessionStorage.getItem('sellerLoginId'))
      .subscribe((res) => {
        expenseOfYear = res.data;
        this.expenseBoxInHtml = true;
        if (expenseOfYear[0].ExenseOfYear == null) {
          this.expense = 0;
        } else {
          this.expense = expenseOfYear[0].ExenseOfYear;
        }
        let sdate = dates.startDate;
        let date = ('0' + sdate.getDate()).slice(-2); // current date
        let month = ('0' + (sdate.getMonth() + 1)).slice(-2); // current month
        let year = sdate.getFullYear(); // current year
        sdate = date + '-' + year + '-' + month;
        let edate = dates.endDate;
        date = ('0' + edate.getDate()).slice(-2); // current date
        month = ('0' + (edate.getMonth() + 1)).slice(-2); // current month
        year = edate.getFullYear(); // current year
        edate = date + '-' + year + '-' + month;
        this.expenseBoxText = 'Expense from ' + sdate + ' to ' + edate;
      });
  }

  async getSaleByDate(dates) {
    let salOfYear = null;
    this.saleBoxInHtml = false;
    await this.service
      .saleByDate(dates, sessionStorage.getItem('sellerLoginId'))
      .subscribe((res) => {
        salOfYear = res.data;
        this.saleBoxInHtml = true;
        if (salOfYear[0].SaleOfYear == null) {
          this.sale = 0;
        } else {
          this.sale = salOfYear[0].SaleOfYear;
        }
        let sdate = dates.startDate;
        let date = ('0' + sdate.getDate()).slice(-2); // current date
        let month = ('0' + (sdate.getMonth() + 1)).slice(-2); // current month
        let year = sdate.getFullYear(); // current year
        sdate = date + '-' + year + '-' + month;
        let edate = dates.endDate;
        date = ('0' + edate.getDate()).slice(-2); // current date
        month = ('0' + (edate.getMonth() + 1)).slice(-2); // current month
        year = edate.getFullYear(); // current year
        edate = date + '-' + year + '-' + month;
        this.saleBoxText = 'Sale from ' + sdate + ' to ' + edate;
      });
  }

  async getProfitByDate(dates) {
    let profit = null;
    this.saleBoxInHtml = false;
    await this.service
      .profitByDate(dates, sessionStorage.getItem('sellerLoginId'))
      .subscribe((res) => {
        profit = res.data;
        this.saleBoxInHtml = true;
        if (profit[0].Profit == null) {
          this.profit = 0;
        } else {
          this.profit = profit[0].Profit;
        }
        let sdate = dates.startDate;
        let date = ('0' + sdate.getDate()).slice(-2); // current date
        let month = ('0' + (sdate.getMonth() + 1)).slice(-2); // current month
        let year = sdate.getFullYear(); // current year
        sdate = date + '-' + year + '-' + month;
        let edate = dates.endDate;
        date = ('0' + edate.getDate()).slice(-2); // current date
        month = ('0' + (edate.getMonth() + 1)).slice(-2); // current month
        year = edate.getFullYear(); // current year
        edate = date + '-' + year + '-' + month;
        this.profitBoxText = 'Profit from ' + sdate + ' to ' + edate;
      });
  }

  getProductSoldByDate(dates) {
    let product = null;
    this.service
      .productSoldByDate(dates, sessionStorage.getItem('sellerLoginId'))
      .subscribe((res) => {
        product = res.data;
        if (product[0].SoldQuantity == null) {
          this.soldProductQty = 0;
        } else {
          this.soldProductQty = product[0].SoldQuantity;
        }
        let sdate = dates.startDate;
        let date = ('0' + sdate.getDate()).slice(-2); // current date
        let month = ('0' + (sdate.getMonth() + 1)).slice(-2); // current month
        let year = sdate.getFullYear(); // current year
        sdate = date + '-' + year + '-' + month;
        let edate = dates.endDate;
        date = ('0' + edate.getDate()).slice(-2); // current date
        month = ('0' + (edate.getMonth() + 1)).slice(-2); // current month
        year = edate.getFullYear(); // current year
        edate = date + '-' + year + '-' + month;
        this.soldProductQtyText =
          'Sold Products from ' + sdate + ' to ' + edate;
        this.dateForm.reset();
      });
  }

  // getProductRemainingByDate(dates)
  // {
  //   let product = null;
  //   this.service.productRemainingByDate(dates, sessionStorage.getItem('sellerLoginId')).subscribe((res)=>{
  //     product = res.data;
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
  getProductData() {
    this.service
      .getSellerProductData(sessionStorage.getItem('sellerLoginId'))
      .subscribe((res) => {
        if (res.data == null) {
          this.prdData = 0;
        } else {
          this.prdData = res.data;
        }
      });
  }

  getTotalExpense() {
    let expenseOfYear = null;
    this.service
      .totalExpense(sessionStorage.getItem('sellerLoginId'))
      .subscribe((res) => {
        expenseOfYear = res.data;
        if (expenseOfYear[0].ExenseOfYear == null) {
          this.expense = 0;
        } else {
          this.expense = expenseOfYear[0].ExenseOfYear;
        }
      });
  }

  getTotalSale() {
    let salOfYear = null;
    this.service
      .totalSale(sessionStorage.getItem('sellerLoginId'))
      .subscribe((res) => {
        salOfYear = res.data;
        if (salOfYear[0].SaleOfYear == null) {
          this.sale = 0;
        } else {
          this.sale = salOfYear[0].SaleOfYear;
        }
      });
  }

  getTotalProfit() {
    let profit = null;
    this.service
      .totalProfit(sessionStorage.getItem('sellerLoginId'))
      .subscribe((res) => {
        profit = res.data;
        if (profit[0].Profit == null) {
          this.profit = 0;
        } else {
          this.profit = profit[0].Profit;
        }
      });
  }

  getTotalProductSold() {
    let product = null;
    this.service
      .totalProductSold(sessionStorage.getItem('sellerLoginId'))
      .subscribe((res) => {
        product = res.data;
        if (product[0].SoldQuantity == null) {
          this.soldProductQty = 0;
        } else {
          this.soldProductQty = product[0].SoldQuantity;
        }
      });
  }

  getTotalProductRemaining() {
    let product = null;
    this.service
      .totalProductremaining(sessionStorage.getItem('sellerLoginId'))
      .subscribe((res) => {
        product = res.data;
        if (product[0].ReamainingQuantity == null) {
          this.remainingProductQty = 0;
        } else {
          this.remainingProductQty = product[0].ReamainingQuantity;
        }
      });
  }

  getBuyerData() {
    this.service
      .getBuyerData(sessionStorage.getItem('sellerLoginId'))
      .subscribe((res) => {
        if (res.data == null) {
          this.profit = 0;
        } else {
          this.profit = res.data;
        }
      });
  }

  openAddStockModal() {
    this.addStockModal.show();
  }
  closeAddStockModal() {
    this.addStockModal.hide();
  }

  openAddStockPage() {
    this.ap.goAddStockPagePage();
  }

  // For add Stock code Start from here
  ////////////////////////////////////
  ////////////////////////////////////
  addStockForm = new FormGroup({
    prdId: new FormControl('', Validators.required),
    prdQuantity: new FormControl('', Validators.required),
    prdBuyPrice: new FormControl('', Validators.required),
    prdSellPrice: new FormControl('', Validators.required),
    prdDiscount: new FormControl('', Validators.required),
  });

  async saveProductStock() {
    this.allEntriesRight = true;
    if (
      this.addStockForm.value.prdSellPrice < this.addStockForm.value.prdBuyPrice
    ) {
      this.allEntriesRight = false;
      this.showMsg = 'Sell Price Should be Greater than Buying Price';
    } else if (
      parseInt(this.addStockForm.value.prdDiscount) < 0 ||
      parseInt(this.addStockForm.value.prdDiscount) > 99
    ) {
      this.allEntriesRight = false;
      this.showMsg = 'Discount should between 1 and 99';
    } else if (
      parseInt(this.addStockForm.value.prdQuantity) <= 0 ||
      parseInt(this.addStockForm.value.prdQuantity) > 99
    ) {
      this.allEntriesRight = false;
      this.showMsg = 'Quantity should between 1 and 99';
    }
    if (this.allEntriesRight) {
      let data = {
        prdBuyPrice: this.addStockForm.value.prdBuyPrice,
        prdSellPrice: this.addStockForm.value.prdSellPrice,
        prdDiscountPercentage: this.addStockForm.value.prdDiscount,
        quantity: this.addStockForm.value.prdQuantity,
      };
      let response = null;
      await this.service
        .insertProductStock(data, this.addStockForm.value.prdId)
        .subscribe((res) => {
          response = res.data;
          if (response != null) {
            this.updateRecent(response, this.addStockForm.value.prdId);
          }
        });
    }
  }

  async updateRecent(insertStockId, insertedPrdId) {
    let response = null;
    let data = {
      pId: insertedPrdId,
      pStockId: insertStockId,
    };
    await this.service.updateRecentAddedStock(data).subscribe((res) => {
      response = res.data;
      if (response != null) {
        this.closeAddStockModal();
        this.ap.showTextInMessageModal = 'Stock Successfully Saved';
        this.ap.navigateOnNextPage = 'SellerDashboard';
        this.ap.goMessageModalPage();
        this.addStockForm.reset();
      }
    });
  }
  // For add Stock codeEnds Start from here
  ////////////////////////////////////
  ////////////////////////////////////
  getMonthlyProfit() {
    this.service
      .monthlyProfit(sessionStorage.getItem('sellerLoginId'))
      .subscribe((res) => {
        this.monthlyProfit = res.data;
        if (this.monthlyProfit[0].monthlyProfit == null) {
          this.monthlyProfit = 0;
        } else {
          this.monthlyProfit = this.monthlyProfit[0].monthlyProfit;
        }
      });
  }

  getSaleData() {
    this.service
      .getAllSaleData(sessionStorage.getItem('sellerLoginId'))
      .subscribe((res) => {
        this.saleData = res.data;
      });
  }

  // cliclOnCancelButtonInModal()
  // {
  //   this.closeConfimationMessageModal();
  // }

  // clickOnOkButtonInModal()
  // {
  //   let response = null;
  //   let formData = new FormData()
  //   formData.append('prdId', this.selectedProductForDelete);
  //   formData.append('sellerId', sessionStorage.getItem('sellerLoginId'));
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

  deleteProduct(prdId) {
    if (confirm('Are you sure to delete it?')) {
      let response = null;
      let data = {
        prdId: prdId,
      };
      this.service.deleteSelectedProduct(data).subscribe((res) => {
        response = res.data;
        if (response != null) {
          this.ap.showTextInMessageModal = 'Successfully Deleted';
          this.ap.navigateOnNextPage = 'SellerDashboard';
          this.ap.goMessageModalPage();
        }
      });
    }
  }

  // For update product start from here
  ////////////////////////////////////
  ////////////////////////////////////
  openUpdateProductModal(selectedPrdId) {
    this.selectedPrdInUpdatedModal = selectedPrdId;
    this.updateProductModal.show();
  }
  closeUpdateProductModal() {
    this.updateProductModal.hide();
  }

  addUpdateProductForm = new FormGroup({
    prdUpdatedName: new FormControl('', Validators.required),
    updatedDdescription: new FormControl('', Validators.required),
  });

  // For add Stock codeEnds Start from here
  ////////////////////////////////////
  ////////////////////////////////////
  async checkProduct() {
    this.showMsgInUpdateProductModal = '';
    this.allEntriesRight = true;
    await this.service
      .checkProductStock(this.addUpdateProductForm.value)
      .subscribe((res) => {
        this.readData = res.data;
        if (this.readData == null) {
          this.updateProduct();
        } else {
          this.showMsgInUpdateProductModal =
            'Same name Product Already Exist in Stock';
        }
      });
  }
  async updateProduct() {
    let response = null;
    await this.service
      .updateSelectedProduct(
        this.selectedPrdInUpdatedModal,
        this.addUpdateProductForm.value
      )
      .subscribe((res) => {
        response = res.data;
        if (response != null) {
          this.closeUpdateProductModal();
          this.ap.showTextInMessageModal = 'Product Successfully Update';
          this.ap.navigateOnNextPage = 'SellerDashboard';
          this.ap.goMessageModalPage();
          this.addUpdateProductForm.reset();
        }
      });
  }
}
