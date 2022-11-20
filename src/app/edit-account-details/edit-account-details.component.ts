import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-edit-account-details',
  templateUrl: './edit-account-details.component.html',
  styleUrls: ['./edit-account-details.component.css'],
})
export class EditAccountDetailsComponent implements OnInit {
  readData: any;

  constructor(
    private service: APIService,
    private router: Router,
    private ap: AppComponent
  ) {}

  ngOnInit(): void {
    // this.service.getUserData().subscribe((res) => {
    //   this.readData = res.data;
    // });
  }

  editAccountDetails(id: number) {
    // this.service.getSingleBuyerUserData(id).subscribe((res) => {
    //   this.readData = res.data;
    // });
  }
}
