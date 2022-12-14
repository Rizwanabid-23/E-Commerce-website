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

  constructor(private service:AdminApiServiceService, private ap:AppComponent) { }
  registeredSellers:any;
  registeredBuyers:any;
  monthlyRevenue:any;
  annualRevenue:any;
  addCategoryModal:any;
  addSubCategoryModal:any;
  addBrandModal:any;
  categories:any;


  ngOnInit(): void {
    this.getRegisteredSellers();
    this.getRegisteredBuyers();
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

  getRegisteredSellers()
  {

  }

  getRegisteredBuyers()
  {

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




}
