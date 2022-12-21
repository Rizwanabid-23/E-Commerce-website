import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { AdminApiServiceService } from '../admin-api-service.service';
declare var window:any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  sellerBoxText:any;
  seller:any;

  buyerBoxText:any;
  buyer:any;

  sellerData:any;
  buyerData:any;

  adminName:any;

  monthlyRevenue:any;
  annualRevenue:any;
  addCategoryModal:any;
  addSubCategoryModal:any;
  addBrandModal:any;
  categories:any;
  showMsgInDashboard:any;
  showMsgInCategoryModal:any;
  showMsgInSubCategoryModal:any;
  showMsgInBrandModal:any;


  constructor(private service:AdminApiServiceService, private ap:AppComponent) { }



  ngOnInit(): void {
    this.ap.buyerLogin = false;
    this.ap.appOpen = false;
    this.onLoadInitiateVariable();
    this.getTotalSellers();
    this.getTotalBuyers();
    this.getSellerData();
    this.getBuyerData();
    this.getMonthlyRevenue();
    this.getAnnualRevenue();
    this.addCategoryModal = new window.bootstrap.Modal(
      document.getElementById("addCategoryModalId")
    );
    this.addSubCategoryModal = new window.bootstrap.Modal(
      document.getElementById("addSubCategoryModalId")
    );
    this.addBrandModal = new window.bootstrap.Modal(
      document.getElementById("addBrandModalId")
    );
  }

  onLoadInitiateVariable()
  {
    this.adminName = sessionStorage.getItem('adminLogin');
    this.sellerBoxText = 'Total Registered Sellers'; 
    this.buyerBoxText = 'Total Registered Buyers';
  }
  logOut()
  {
    sessionStorage.removeItem('adminLogin');
    this.ap.goAdminSignInPagePage();
  }
  getTotalSellers()
  {
    let seller = null;
    this.service.totalSeller().subscribe((res)=>{
      seller = res.data;
      if(seller[0].TotalSeller == null)
      {
        this.seller = 0;
      }
      else
      {
        this.seller = seller[0].TotalSeller;
      }
    })
  }

  getTotalBuyers()
  {
    let buyer = null;
    this.service.totalBuyer().subscribe((res)=>{
      buyer = res.data;
      if(buyer[0].TotalBuyer == null)
      {
        this.buyer = 0;
      }
      else
      {
        this.buyer = buyer[0].TotalBuyer;
      }
    })
  }

  getMonthlyRevenue()
  {
    this.service.getCategories().subscribe((res) =>{
      this.categories = res.data;
    })
  }

  getAnnualRevenue()
  {
    
  }

  getCategories()
  {

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
      this.getSellerByDate(selectedDate);
      this.getBuyerByDate(selectedDate);
    }
    else{
      this.showMsgInDashboard = 'Start date should be less than end date and end date should be less than or equal to current date';
    }
  }

  getSellerByDate(dates)
  {
    let seller = null;
    this.service.sellerByDate(dates).subscribe((res)=>{
      seller = res.data;
      if(seller[0].TotalSeller  == null)
      {
        this.seller = 0;
      }
      else
      {
        this.seller = seller[0].TotalSeller ;
      }
      let sdate = dates.startDate;
      let date = ("0" + sdate.getDate()).slice(-2); // current date
      let month = ("0" + (sdate.getMonth() + 1)).slice(-2); // current month
      let year = sdate.getFullYear(); // current year
      sdate = date+ ":" + month + ":" +year;
      let edate = dates.endDate;
      date = ("0" + edate.getDate()).slice(-2); // current date
      month = ("0" + (edate.getMonth() + 1)).slice(-2); // current month
      year = edate.getFullYear(); // current year
      edate =  date+ ":" + month + ":" +year;
      this.sellerBoxText = 'Sellers which registerd between '+sdate+' and '+edate;
    })
  }

  getBuyerByDate(dates)
  {
    let buyer = null;
    this.service.buyerByDate(dates).subscribe((res)=>{
      buyer = res.data;
      if(buyer[0].TotalSeller  == null)
      {
        this.buyer = 0;
      }
      else
      {
        this.buyer = buyer[0].TotalBuyer;
      }
      let sdate = dates.startDate;
      let date = ("0" + sdate.getDate()).slice(-2); // current date
      let month = ("0" + (sdate.getMonth() + 1)).slice(-2); // current month
      let year = sdate.getFullYear(); // current year
      sdate = date+ ":" + month + ":" +year;
      let edate = dates.endDate;
      date = ("0" + edate.getDate()).slice(-2); // current date
      month = ("0" + (edate.getMonth() + 1)).slice(-2); // current month
      year = edate.getFullYear(); // current year
      edate = date+ ":" + month + ":" +year;
      this.buyerBoxText = 'Buyers which registerd between '+sdate+' and '+edate;
      this.dateForm.reset();
    })
  }

  //  Using with date calculating stastics end  from here
  // ----------------------------------------------------
  // ----------------------------------------------------


  // Add category code start from here
  // ---------------------------------
  // ---------------------------------
  addCategoryForm = new FormGroup({
    'categoryName': new FormControl('', Validators.required)
  })

  openAddCategoryModal()
  {
    this.addCategoryModal.show();
  }

  closeAddCategoryModal()
  {
    this.addCategoryModal.hide();
  }

  checkValidCategory()
  {
    this.showMsgInBrandModal = '';
    let response = null;
    this.service.checkValidCategory(this.addCategoryForm.value).subscribe(res => {
      response = res.data;
      if(response == null)
      {
        this.saveCategory()
      }
      else
      {
        this.showMsgInCategoryModal = 'Category with same name already exists';
      }
    });
  }

  saveCategory()
  {
    let response = null;
    this.service.insertCategory(this.addCategoryForm.value).subscribe(res => {
      response = res.data;
      if(response != null)
      {
        this.closeAddCategoryModal();
        this.ap.showTextInMessageModal = "Category Successfully Saved";
        this.ap.navigateOnNextPage = "AdminDashboard";
        this.ap.goMessageModalPage();
        this.addCategoryForm.reset();
      }
    });
  }
  // Add category code ends      here
  // ---------------------------------
  // ---------------------------------


  // Add SubCategory code start from here
  // ------------------------------------
  // ------------------------------------
  addSubCategoryForm = new FormGroup({
    'categoryId': new FormControl('', Validators.required),
    'subCategoryName': new FormControl('', Validators.required)
  })
  openAddSubCategoryModal()
  {
    this.addSubCategoryModal.show();
  }

  closeAddSubCategoryModal()
  {
    this.addSubCategoryModal.hide();
  }

  checkValidSubCategory()
  {
    console.log("inn    ");
    this.showMsgInSubCategoryModal = '';
    let response = null;
    this.service.checkValidSubCategory(this.addSubCategoryForm.value).subscribe(res => {
      response = res.data;
      if(response == null)
      {
        this.saveSubCategory();
      }
      else
      {
        this.showMsgInSubCategoryModal = 'Sub Category with same name already exists';
      }
    });
  }

  saveSubCategory()
  {
    let response = null;
    this.service.insertSubCategory(this.addSubCategoryForm.value).subscribe(res => {
      response = res.data;
      if(response != null)
      {
        this.closeAddSubCategoryModal();
        this.ap.showTextInMessageModal = "Sub Category Successfully Saved";
        this.ap.navigateOnNextPage = "AdminDashboard";
        this.ap.goMessageModalPage();
        this.addCategoryForm.reset();
      }
    });
  }
  // Add SubCategory code ends    here
  // ---------------------------------
  // ---------------------------------

  // Add brands code start from here
  // -------------------------------
  // -------------------------------
  addBrandForm = new FormGroup({
    'brandName': new FormControl('', Validators.required)
  })
  openAddBrandModal()
  {
    this.addBrandModal.show();
  }

  closeAddBrandModal()
  {
    this.addBrandModal.hide();
  }

  checkValidBrand()
  {
    this.showMsgInBrandModal = '';
    let response = null;
    this.service.checkValidBrand(this.addBrandForm.value).subscribe(res => {
      response = res.data;
      if(response == null)
      {
        this.saveBrand()
      }
      else
      {
        this.showMsgInBrandModal = 'Brand with same name already exists';
      }
    });
  }

  saveBrand()
  {
    let response = null;
    this.service.insertBrand(this.addBrandForm.value).subscribe(res => {
      response = res.data;
      if(response != null)
      {
        this.closeAddBrandModal();
        this.ap.showTextInMessageModal = "Brand Successfully Saved";
        this.ap.navigateOnNextPage = "AdminDashboard";
        this.ap.goMessageModalPage();
        this.addBrandForm.reset();
      }
    });
  }
  // Add brand code    ends      here
  // --------------------------------
  // --------------------------------

  getSellerData()
  {
    this.service.getSellerData().subscribe((res) =>{
      this.sellerData = res.data;
    })
  }

  getBuyerData()
  {
    this.service.getBuyerData().subscribe((res) =>{
      this.buyerData = res.data;
    })
  }




}
