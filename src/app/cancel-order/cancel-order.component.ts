import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.css'],
})
export class CancelOrderComponent implements OnInit {
  readData: any;
  showMsg: string;

  constructor(
    private service: APIService,
    private router: Router,
    private ap: AppComponent
  ) {}

  ngOnInit(): void {
    this.service.getBuyerUserOrdersData(sessionStorage.getItem('loginBuyerId')).subscribe((res) => {
      this.readData = res.data;
    });
  }

  cancelOrder(us:any) {
    // console.log(id);
      this.service.deleteBuyerUserOrdersData(us).subscribe((res) => {
        this.service.getBuyerUserOrdersData(sessionStorage.getItem('loginBuyerId')).subscribe((res) => {
          this.readData = res.data;
        });
    });
  }
}
