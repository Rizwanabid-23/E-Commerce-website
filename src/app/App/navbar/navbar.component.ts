import { Component, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';
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
  isBuyerLogin;
  ngOnInit(): void {
    this.pushLocalDataInVariablesOnLoad();
  }

  pushLocalDataInVariablesOnLoad()
  { // This will load state of buyer login in variables from localstorage
    console.log(localStorage.getItem('buyerLoginId'), "dddssss");
    if(localStorage.getItem('buyerLoginId') == null)
    {
      this.ap.buyerLogin = false;
      this.ap.appOpen = true;
      this.isAppOpen = true;
      this.isBuyerLogin = false;
    }
    else{
      this.ap.buyerLogin = true;
      this.ap.appOpen = false;
      this.isAppOpen = false;
      this.isBuyerLogin = true;
    }
  }
  openProductCartPage()
  {
    this.ap.goProductCartPage();
  }


}
