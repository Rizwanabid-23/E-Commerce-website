import { Component, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private router:Router, private ap:AppComponent) {

   }
  buyerName:any;
  isAppOpen:any;
  isBuyerLogin:any;
  adminSignIn:any;
  ngOnInit(): void {
    this.router.events.subscribe((val:any)=>{
      this.pushLocalDataInVariablesOnLoad();
    })
  }

  pushLocalDataInVariablesOnLoad()
  { // This will load state of buyer login in variables from localstorage
    if(sessionStorage.getItem('buyerLoginId') == null)
    {
      this.ap.buyerLogin = false;
      this.ap.appOpen = true;
      this.isAppOpen = this.ap.appOpen;
      this.isBuyerLogin = this.ap.buyerLogin;
      this.adminSignIn = false;
      // console.log(this.ap.loginBuyerName);
    }
    else{
      this.buyerName = sessionStorage.getItem('buyerLoginName');
      // console.log(this.buyerName);
      this.ap.buyerLogin = true;
      this.ap.appOpen = false;
      this.isAppOpen = this.ap.appOpen;
      this.isBuyerLogin = this.ap.buyerLogin;
      this.adminSignIn = false;
    }
    this.ap. goNavbar();
  }
  openProductCartPage()
  {
    this.ap.goProductCartPage();
  }

  logOut()
  {
    sessionStorage.removeItem('buyerLoginId');
    this.ap.goBuyerSignInPage();
  }
}
