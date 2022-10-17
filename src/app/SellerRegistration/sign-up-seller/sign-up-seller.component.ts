import { Component, OnInit } from '@angular/core';
import { ApisellerregistrationService } from '../apisellerregistration.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-sign-up-seller',
  templateUrl: './sign-up-seller.component.html',
  styleUrls: ['./sign-up-seller.component.css']
})
export class SignUpSellerComponent implements OnInit {

  constructor(private service:ApisellerregistrationService, private router:Router, private ap:AppComponent) { }

  showMsg:any;
  readData:any;
  accountCreated:Boolean = false;
  uLogin:Boolean;
  ngOnInit(): void {
  }
  sellerSignUpForm = new FormGroup({

    'fName': new FormControl('', Validators.required),
    'lName': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required),
    'phoneNo': new FormControl('', Validators.required),
    'cnicNo': new FormControl('', Validators.required),
    'city': new FormControl('', Validators.required),
    'address': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),

  })

    // This function check that if account with this email id is already exist then show message 
  // that 'Account With This Email Id Already Exist' other wise create account.
  async checkValidUserDetail(){
    await this.service.checkValidSellerSignUp(this.sellerSignUpForm.value).subscribe(res => {
      this.readData = res.data;
      console.log(this.readData);
      if (this.readData == null){
        this.submitSellerSignUpForm();
      }
      else{
        this.showMsg = 'Account With This Email Id Already Exist';
      }

    });

  }

  // This function will submit form
  submitSellerSignUpForm() {
    this.service.insertSellerData(this.sellerSignUpForm.value).subscribe((res) => {

    });
    this.ap.appOpen = false;
    this.ap.sellerLogin = true;
    this.ap.buyerLogin = false;
    this.router.navigate(['/SellerDashboard']);
    this.sellerSignUpForm.reset();
  }  




}
