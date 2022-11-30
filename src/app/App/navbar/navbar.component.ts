import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { GlobalData } from './GlobalData';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private router:Router, private ap:AppComponent) { }

  isAppOpen:any;
  isBuyerLogin:any;
  ngOnInit(): void {
    this.pushLocalDataInVariablesOnLoad();
    console.log("Buyer  ", this.isBuyerLogin);
  }

  pushLocalDataInVariablesOnLoad(){ // This will load state of buyer login in variables from localstorage
    this.ap.loginBuyerId = parseInt(localStorage.getItem('buyerLoginId'));
    console.log("Login   ", this.ap.loginBuyerId);
    if(this.ap.loginBuyerId > 0)
    {
      this.ap.buyerLogin = true;
      this.ap.appOpen = false;
    }
    this.isAppOpen = this.ap.appOpen;
    this.isBuyerLogin = this.ap.buyerLogin;
  }


}
