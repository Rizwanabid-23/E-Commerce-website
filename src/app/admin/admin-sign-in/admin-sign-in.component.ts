import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AdminApiServiceService } from '../admin-api-service.service';

@Component({
  selector: 'app-admin-sign-in',
  templateUrl: './admin-sign-in.component.html',
  styleUrls: ['./admin-sign-in.component.css']
})
export class AdminSignInComponent implements OnInit {

  constructor(private ap:AppComponent, private router:Router, private service:AdminApiServiceService) { }

  showMsg:any;
  readData:any;
  ngOnInit(): void {
    this.ap.buyerLogin = false;
    this.ap.appOpen = false;
    this.ap.adminSignInOpen = true;
    this.router.events.subscribe((val:any)=>{
      this.ap.goNavbar();
    })
    
  }
  signInForm = new FormGroup({
    'email':new FormControl('',Validators.required),
    'password':new FormControl('',Validators.required),
  })

  // This function check email id from and password from server and check that user is right or not
  checkSignInFormData(){
    let rData = null;
    this.service.checkValidSignInUser(this.signInForm.value).subscribe(res =>{
      rData = res.data;
      if (rData == null){
        this.showMsg = 'Enter Right Email Id And Password';
      }
      else
      {
        console.log("admin  ", rData[0].FullName);
        this.ap.adminName = rData[0].FullName;
        this.ap.saveAdmin();
        this.router.navigate(['adminDashboard']);
        this.signInForm.reset();
      }

    });
  }



}
