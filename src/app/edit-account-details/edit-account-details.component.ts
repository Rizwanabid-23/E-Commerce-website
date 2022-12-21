import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { APIService } from '../api.service';
import { AppComponent } from '../app.component';
declare var window: any;

@Component({
  selector: 'app-edit-account-details',
  templateUrl: './edit-account-details.component.html',
  styleUrls: ['./edit-account-details.component.css'],
})
export class EditAccountDetailsComponent implements OnInit {
  readData: any;
  editAccountDetail: any;
  AccountDetail= false;
  constructor(
    private service: APIService,
    private router: Router,
    private ap: AppComponent
  ) {}

  editAccount = new FormGroup({
    'fullName': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    // console.log(sessionStorage.getItem('buyerLoginId'));
    this.service.getSingleBuyerUserData(sessionStorage.getItem('buyerLoginId')).subscribe((res) => {
      this.readData = res.data;
      console.log(this.readData);
      this.AccountDetail =true;
    });
    this.editAccountDetail = new window.bootstrap.Modal(
      document.getElementById("editAccountDetailModalId")
    );
  }

  closeEditAccountDetailModal(){
    this.editAccountDetail.hide()
  }
  
  openEditAccountDetailModal()
  {
    this.editAccountDetail.show();
    this.editAccount.setValue({
      'fullName': this.readData[0].FullName,
      'email': this.readData[0].Email,
      'password': this.readData[0].Password,
    })
  }

  saveEditAccountDetails()
  {
    // console.log(this.readData[0].Id,this.editAccount.value.fullName,this.editAccount.value.email,this.editAccount.value.password)
    // var Row = document.getElementById("details");
    // var Cells = Row.getElementsByTagName("td");
    // var id = Row.getElementsByTagName('th');
    // console.log(id[0].innerText,Cells[0].innerText,Cells[1].innerText,Cells[2].innerText,Cells[3].innerText)
    var data = 
    {
      id : this.readData[0].Id,
      fullname : this.editAccount.value.fullName,
      email : this.editAccount.value.email,
      password : this.editAccount.value.password,
    }
    this.service.editBuyerUserDetails(data).subscribe((res) =>{
      // this.service.getSingleBuyerUserData(sessionStorage.getItem('loginBuyerId')).subscribe((res) => {
      // this.readData = res.data;
      // });
      this.ngOnInit();
    });
    this.editAccountDetail.hide();
  }
}
