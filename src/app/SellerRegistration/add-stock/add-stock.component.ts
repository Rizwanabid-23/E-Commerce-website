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



  addProductStock() {
    
  }
}
