import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-my-returns',
  templateUrl: './my-returns.component.html',
  styleUrls: ['./my-returns.component.css']
})
export class MyReturnsComponent implements OnInit {
  readData: any;

  constructor(private service: APIService,
    private router: Router,
    private ap: AppComponent) { }

  ngOnInit(): void {
    this.service.getBuyerUserReturnData(sessionStorage.getItem('buyerLoginId')).subscribe((res) => {
      this.readData = res.data;
      // console.log(this.readData,'hello');
    });
  }

}
