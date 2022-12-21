import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private service: APIService, private ap:AppComponent) { }

  showMsg: any;
  readData: any;
  signUpButton:Boolean = false;
  accountCreated:Boolean = false;
  verificationCodeSended = false;
  getCodeButtonProperty:Boolean = false;
  verificationCodeGenerated: any;
  uLogin:Boolean;
  verificationCodeVaildTime:any;
  signUpButtonText = "Sign Up";
  verificationCodeButtonText = "Get Code";
  verificationTime = 0;
  intervalId:any;
  ngOnInit(): void { 
    this.signUpButtonText = "Sign Up";
    this.verificationCodeButtonText = "Get Code";
    this.verificationCodeVaildTime = 120;
  } 

  // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
  
  setVerificationValidTime()
  {
    let intervalId = setInterval (() => {
      this.verificationCodeVaildTime = this.verificationCodeVaildTime-1;
      if(this.verificationCodeVaildTime <=0)
      {
        clearInterval(intervalId);
      }
    }, 1000);
  }
  signUpForm = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
    'fullname': new FormControl('', Validators.required),
    'verificationCode': new FormControl('', Validators.required)

  })

  sendVerificationCode(){
    let response = null;
    this.verificationCodeButtonText = "Get Code ...";
    this.getCodeButtonProperty = true;
    this.verificationCodeGenerated = Math.floor(100000 + Math.random() * 900000);
    this.service.sendVerificationCode(this.signUpForm.value, this.verificationCodeGenerated).subscribe((res) => {
      response = res.data;
      if(response != null)
      {
        console.log(this.verificationCodeGenerated);
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
  async checkDetailValidSignUpForm(){
    console.log("Form  ", parseInt(this.signUpForm.value.verificationCode));
    console.log("generated  ", parseInt(this.verificationCodeGenerated));
    if(parseInt(this.signUpForm.value.verificationCode) == parseInt(this.verificationCodeGenerated)){
      await this.service.checkValidSignUpUser(this.signUpForm.value).subscribe(res => {
        this.readData = res.data;
        if (this.readData == null){
          this.submitSignUpForm();
        }
        else{
          this.showMsg = 'Account With This Email Id Already Exist';
        }
  
      });
    }
    else
    {
      this.showMsg = 'Enter right verification code';
    }

  }

  // This function will submit form
  submitSignUpForm() {

    this.service.insertUserData(this.signUpForm.value).subscribe((res) => {
      this.readData = res.data;
        this.ap.appOpen = false;
        this.ap.sellerLogin = false;
        this.ap.buyerLogin = true;
        this.ap.loginBuyerId = this.readData;
        sessionStorage.setItem('buyerLoginId',this.ap.loginBuyerId.toString());
        // this.ap.loginBuyerName = this.signUpForm.value.fullname;
        this.ap.goHomePage();
        this.signUpForm.reset();
    });

  }
  openSignInPage()
  {
    this.ap.goBuyerSignInPage();
  }
}
