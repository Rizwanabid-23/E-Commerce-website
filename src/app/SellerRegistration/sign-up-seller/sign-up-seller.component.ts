import { Component, OnInit } from '@angular/core';
import { ApisellerregistrationService } from '../apisellerregistration.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-sign-up-seller',
  templateUrl: './sign-up-seller.component.html',
  styleUrls: ['./sign-up-seller.component.css']
})
export class SignUpSellerComponent implements OnInit {

  constructor(private service:ApisellerregistrationService, private ap:AppComponent) { }

  showMsg:any;
  readData:any;
  accountCreated:Boolean = false;
  verificationCodeSended:Boolean = false;
  getCodeButtonProperty:Boolean = false;
  signUpButton:Boolean = false;
  verificationCodeGenerated: any;
  verificationCodeButtonText = "Get Code";
  verificationCodeVaildTime = 120;
  uLogin:Boolean;
  ngOnInit(): void {
    this.verificationCodeVaildTime = 120;
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
    'verificationCode': new FormControl('', Validators.required),
  })

  setVerificationValidTime()
  {
    let intervalId = setInterval (() => {
      this.verificationCodeVaildTime = this.verificationCodeVaildTime-1;
      if(this.verificationCodeVaildTime <=0)
      {
        this.verificationCodeVaildTime = null;
        clearInterval(intervalId);
      }
    }, 1000);
  }
  sendVerificationCode(){
    let response = null;
    this.verificationCodeButtonText = "Get Code ...";
    this.getCodeButtonProperty = true;
    this.verificationCodeGenerated = Math.floor(100000 + Math.random() * 900000);
    this.service.sendVerificationCode(this.sellerSignUpForm.value, this.verificationCodeGenerated).subscribe((res) => {
      response = res.data;
      if(response != null)
      {
        this.verificationCodeButtonText = "Resend It";
        this.setVerificationValidTime();
        this.verificationCodeSended = true;
        this.signUpButton = true;
      }
      else
      {
        this.showMsg = 'Enter Email in right format';
        this.getCodeButtonProperty = false;
      }

    });
  }

    // This function check that if account with this email id is already exist then show message 
  // that 'Account With This Email Id Already Exist' other wise create account.
  async checkValidUserDetail(){
    await this.service.checkValidSellerSignUp(this.sellerSignUpForm.value).subscribe(res => {
      this.readData = res.data;
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
    if(this.verificationCodeGenerated == this.sellerSignUpForm.value.verificationCode)
    {
      this.service.insertSellerData(this.sellerSignUpForm.value).subscribe((res) => {
        this.readData = res.data;
        this.ap.appOpen = true;
        this.ap.sellerLogin = false;
        this.ap.buyerLogin = false;
        this.ap.loginSellerId = this.readData;
        this.ap.goSellerSignInPage();
        this.sellerSignUpForm.reset();
      });
    }
    else
    {
      this.showMsg = 'Enter right verification code or resend it';
    }
  }

  openSignInSellerPage()
  {
    this.ap.goSellerSignInPage();
  }
  openSellerDashBoardPage()
  {
    this.ap.goSellerDashboardPage();
  }

}
