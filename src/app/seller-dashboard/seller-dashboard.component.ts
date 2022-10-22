import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css'],

})
export class SellerDashboardComponent implements OnInit {

  constructor(private ap:AppComponent) { }

  sellerName:any;
  ngOnInit(): void {
    this.sellerName = this.ap.loginSellerName;
  }

}
