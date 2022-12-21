import { Component, HostListener, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject }  from '@angular/core';
import { GlobalData } from './App/navbar/GlobalData';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router:Router) { }

  title = 'ecommerce-website';
  // // globalVariables
  public appOpen = true; // This will true when app will open
  public buyerLogin = false; // This will true when buyer will login
  public adminSignInOpen = false;
  public sellerLogin = false; // This will true when seller will login
  public adminLogin=false;
  public buyerLoginThroughAddToCart = false;
  public loginBuyerId = -10; // This will store login buyer Id
  public loginBuyerName = "Any";
  public loginSellerId = -10; // This will store login seller Id
  public loginSellerName = "Any";
  public adminName = "Any";
  public clickedProductPictureId = -10;
  public productCartPageOpenThroughAddToCartBtn = false;
  public showTextInMessageModal = '';
  public navigateOnNextPage = '';
  public openMessageModal = false;
  public showSimpleMessageModal = false;
  public showConfirmationModal = false;
  public clickOnOkButtonInMessageModal = false;
  public clickOnCancelButtonInMessageModal = false;


  // ----------------------------------------//
  // ----------------------------------------//
  // Routing For Page Start from here       //
  // This will open admin page
  public goAdminDashboardPage()
  {
    this.router.navigate(['adminDashboard']);
  }
   // This will open Seller Dashboard Page
  public goSellerDashboardPage()
  {
    this.router.navigate(['SellerDashboard']);
  }
 // This will open home page
  public goHomePage()
  {
    this.router.navigate(['']);
  }
  //This will open Navbar
  public goNavbar()
  {
    this.router.navigate[('navbar')]
  }
  // This wiil open buyer sign in page
  public goBuyerSignInPage()
  {
    this.router.navigate(['SignIn']);
  }
  // This will open buyer sign up page
  public goBuyerSignUpPage()
  {
    this.router.navigate(['SignUp']);
  }
  // This will open seller sign in page
  public goSellerSignInPage()
  {
    this.router.navigate(['SignInSeller']);
    
  }
  // This will open seller sign up page
  public goSellerSignUpPage()
  {
    this.router.navigate(['SignUpSeller']);
  }
  // This will open add stock page
  public goAddStockPagePage()
  {
    this.router.navigate(['addStock']);
  }
  // This will open product and seller detail page
  public goProductAndSellerDetailPage()
  {
    this.router.navigate(['productAndSellerDetails']);
  }
  // This will open product cart page
  public goProductCartPage()
  {
    if(sessionStorage.getItem('buyerLoginId') == null)
    {
      this.buyerLoginThroughAddToCart = true;
      this.router.navigate(['/SignIn']);
    }
    else{
      this.router.navigate(['/productCart']);
    }
  }
  // This will Open Customer Support Page
  public goCustomerPage()
  {
    this.router.navigate(['customerSupport']);
  }
  // This will open reset password page
  public goResetPasswordPage()
  {
    this.router.navigate(['resetPassword']);
  }
  // This will open cancel order page
  public goCancelOrderPage()
  {
    this.router.navigate(['cancelOrder']);
  }
  // This will open edit account detail page
  public goEditAccountDetailPage()
  {
    this.router.navigate(['editAccountDetails']);
  }
  // This will open Address book page
  public goAddressBookPage()
  {
    this.router.navigate(['addressBook']);
  }
  // This will open my return page
  public goMyReturnPage()
  {
    this.router.navigate(['myReturns']);
  }
  // This will open track order page
  public goTrackOrderPage()
  {
    this.router.navigate(['trackOrder']);
  }
  // This will message modal page
  public goMessageModalPage()
  {
    this.router.navigate(['ShowMessageModal']);
  }
  // ----------------------------------------//
  // ----------------------------------------//
  //      Routing For Page ends from here    //


  // ----------------------------------------//
  // ----------------------------------------//
  //   Manage Local Storage start from here  //

  // This will save Login Buyer Id
  public saveRecentLoginBuyerId()
  {
    sessionStorage.setItem('buyerLoginId',this.loginBuyerId.toString());
  }
  public getRecentLoginBuyerId()
  {
    if(sessionStorage.getItem('buyerLoginId') == null)
    {
      return this.loginBuyerId = null;
    }
    else{
      return this.loginBuyerId = parseInt(sessionStorage.getItem('buyerLoginId'));
    }
  }
  // This will save recentLoginSellerid
  public saveRecentLoginSellerId()
  {
    sessionStorage.setItem('sellerLoginId',this.loginSellerId.toString());
  }  
    // This will save recentLoginSellerid
  public saveRecentLoginSellerName()
  {
    sessionStorage.setItem('sellerLoginName', this.loginSellerName.toString());
  }

  public saveClickPrdPictureIdForAddToCart()
  {
    sessionStorage.setItem('clickedPrdInPrdndSellerDescrip',this.clickedProductPictureId.toString());
  }
  public saveClickPrdPictureIdForProductCart()
  {
    sessionStorage.setItem('clickedPrdInPrdCart',this.clickedProductPictureId.toString());
  }

  // This will save admin in sessionStorage
  public saveAdmin()
  {
    sessionStorage.setItem('adminLogin',this.adminName.toString());
  }

  // ----------------------------------------//
  // ----------------------------------------//
  //    Manage Local Storage ends  here     //


}


