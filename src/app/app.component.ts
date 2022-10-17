import { Component, HostListener, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject }  from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ecommerce-website';
  public appOpen = true;
  public buyerLogin = false;
  public sellerLogin = false;


}


