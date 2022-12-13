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
    this.verificationCodeVaildTime = 10;
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
    this.verificationCodeButtonText = "Get Code ...";
    this.getCodeButtonProperty = true;
    let formData = new FormData(); //This will send signup data
    this.verificationCodeGenerated = Math.floor(100000 + Math.random() * 900000);
    let verificationCode = this.verificationCodeGenerated.toString();
    let email = this.signUpForm.value.email;
    formData.append('verificationCode', (verificationCode));
    formData.append('email', email);
    this.service.sendVerificationCode(formData).subscribe((res) => {
      this.verificationCodeGenerated = res.data;
      if(this.verificationCodeGenerated != null)
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
        this.ap.goHomePage();
        this.signUpForm.reset();
    });

  }
  openSignInPage()
  {
    this.ap.goBuyerSignInPage();
  }
}
