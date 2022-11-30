import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalData } from '../App/navbar/GlobalData';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private service: APIService, private router:Router, private ap:AppComponent) { }

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
  ngOnInit(): void { 
    // this.service.getUserData().subscribe((res) =>{
    //   console.log('User Data');
    //   this.readData = res.data;
    // })
    this.signUpButtonText = "Sign Up";
    this.verificationCodeButtonText = "Get Code";
    this.verificationCodeVaildTime = 120;
  } 



  // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"

  signUpForm = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
    'fullname': new FormControl('', Validators.required),
    'verificationCode': new FormControl('', Validators.required)

  })

  sendVerificationCode(){
    console.log(this.signUpForm.value.email);
    
    this.verificationCodeButtonText = "Get Code ...";
    this.getCodeButtonProperty = true;
    console.log("Abcc");
    this.service.sendVerificationCode(this.signUpForm.value).subscribe((res) => {
      this.verificationCodeGenerated = res.data;
      if(this.verificationCodeGenerated != null)
      {
        console.log(this.verificationCodeGenerated);
        this.verificationCodeButtonText = "Resend It";
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
    await this.service.checkValidSignUpUser(this.signUpForm.value).subscribe(res => {
      this.readData = res.data;
      console.log(this.readData);
      if (this.readData == null){

        this.submitSignUpForm();
      }
      else{
        this.showMsg = 'Account With This Email Id Already Exist';
      }

    });

  }

  // This function will submit form
  submitSignUpForm() {
    if(this.verificationCodeGenerated == this.signUpForm.value.verificationCode)
    {
      this.service.insertUserData(this.signUpForm.value).subscribe((res) => {
        this.readData = res.data;
          this.ap.appOpen = false;
          this.ap.sellerLogin = false;
          this.ap.buyerLogin = true;
          this.ap.loginBuyerId = this.readData;
          console.log(this.ap.loginBuyerId);
          localStorage.setItem('buyerLoginId',this.ap.loginBuyerId.toString());
          this.router.navigate(['/']);
          this.signUpForm.reset();
      });
    }
    else
    {
      this.showMsg = 'Enter Right Verification Code or Resend It';
    }
  }
}
