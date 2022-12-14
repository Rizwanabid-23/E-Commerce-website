import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }
registeredSellers:any
registeredBuyers:any
monthlyRevenue:any
annualRevenue:any
  ngOnInit(): void {
    this.getRegisteredSellers();
    this.getRegisteredBuyers();
    this.getMonthlyRevenue();
    this.getAnnualRevenue();
  }

  getRegisteredSellers()
  {

  }

  getRegisteredBuyers()
  {

  }

  getMonthlyRevenue()
  {

  }

  getAnnualRevenue()
  {
    
  }

}
