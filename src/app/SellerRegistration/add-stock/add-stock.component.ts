import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {
  showMsg: any;
  readData: any;
  accountCreated:Boolean = false;
  uLogin:Boolean;
  constructor(private service: APIService, private router: Router, private ap: AppComponent) { }
  ngOnInit(): void {

  }

  pstockForm = new FormGroup({
    'pname': new FormControl('', Validators.required),
    'description': new FormControl('', Validators.required),
    'sellerid': new FormControl('', Validators.required),
    'brandid': new FormControl('', Validators.required),
    'categoryid': new FormControl('', Validators.required),
    'pimage': new FormControl('', Validators.required)

  })
  async checkProduct(){
    this.service.checkProductStock(this.pstockForm.value).subscribe(res => {
      this.readData = res.data;
      console.log(this.readData);
      if (this.readData == null) {
        this.addProductStock();
        console.log("line36");
      }
      else {
        this.showMsg = 'This Product Already Exist';
      }

    });

  }


  addProductStock() {
    console.log("function");
    this.service.insertProductStock(this.pstockForm.value).subscribe((res) => {

    });
    this.ap.appOpen = false;
    this.ap.sellerLogin = false;
    this.ap.buyerLogin = true;

    this.router.navigate(['/SellerDashboard']);
    this.pstockForm.reset();
  }
}
