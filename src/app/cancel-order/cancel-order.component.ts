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
    this.service.getBuyerUserOrdersData().subscribe((res) => {
      this.readData = res.data;
      if (this.readData == null) {
        this.showMsg = '0 results found';
      } else {
        // console.log(this.readData);
      }
    });
  }

  cancelOrder(id: number) {
    // console.log(id);
      this.service.deleteBuyerUserOrdersData(id).subscribe((res) => {
      this.readData = res.data;
      // console.log(res);
      if (this.readData == null) {
        this.showMsg = 'No data to show';
      } else {
        // console.log(this.readData);
      }
    });
    // this..reset();
  }
}
