import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { APIService } from '../api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-edit-account-details',
  templateUrl: './edit-account-details.component.html',
  styleUrls: ['./edit-account-details.component.css'],
})
export class EditAccountDetailsComponent implements OnInit {
  readData: any;
  fullName : string
  email : string
  password : string
  constructor(
    private service: APIService,
    private router: Router,
    private ap: AppComponent
  ) {}


  ngOnInit(): void {
    // console.log(sessionStorage.getItem('loginBuyerId'));
    this.service.getSingleBuyerUserData(sessionStorage.getItem('loginBuyerId')).subscribe((res) => {
      this.readData = res.data;
    });
  }

  editAccountDetails()
  {
    var Row = document.getElementById("details");
    var Cells = Row.getElementsByTagName("td");
    var id = Row.getElementsByTagName('th');
    // console.log(id[0].innerText,Cells[0].innerText,Cells[1].innerText,Cells[2].innerText,Cells[3].innerText)
    var data = 
    {
      id : id[0].innerText,
      fullname : Cells[0].innerText,
      email : Cells[1].innerText,
      password : Cells[2].innerText
    }
    this.service.editBuyerUserDetails(data).subscribe((res) =>{
      this.service.getSingleBuyerUserData(sessionStorage.getItem('loginBuyerId')).subscribe((res) => {
        this.readData = res.data;
      });
    });
  }
}
