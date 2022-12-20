import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { AppComponent } from '../app.component';
import { GlobalData } from '../App/navbar/GlobalData';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  readData: any;
  showMsg: any;
  verificationCodeButtonText: string;
  getCodeButtonProperty: boolean;
  verificationCodeGenerated: number;
  accountCreated:Boolean = false;
  verificationCodeSended = false;
  // getCodeButtonProperty:Boolean = false;
  uLogin:Boolean;
  verificationCodeVaildTime:any;
  // signUpButtonText = "Sign Up";
  // verificationCodeButtonText = "Get Code";
  verificationTime = 0;
  intervalId:any;

  constructor(private service: APIService, private router:Router, private ap:AppComponent) { }

  ngOnInit(): void {
  }

  resetPasswordForm = new FormGroup({
    // 'email': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
    'verificationCode': new FormControl('', Validators.required)

  })

  async resetPassword(){
    // console.log("hello hi!")
    await this.service.checkbuyerUserData(this.resetPasswordForm.value).subscribe(res => {
      this.readData = res.data;
      console.log(this.readData);
      if (this.readData == null){
        this.showMsg = 'No user with this email address does not exist!';
      }
      else{
        // this.showMsg = 'Account With This Email Id Already Exist';
        this.UpdatePassword();
      }
    });
  }
  UpdatePassword() {
    this.service.updateBuyerUserPassword(this.resetPasswordForm.value).subscribe((res) => {
      this.readData = res.data;
        this.ap.appOpen = false;
        this.ap.sellerLogin = false;
        this.ap.buyerLogin = true;
        this.ap.loginBuyerId = this.readData;
        console.log(this.ap.loginBuyerId);
        this.router.navigate(['/']);
        this.resetPasswordForm.reset();
    });
  }

  sendVerificationCode(){
    let response = null;
    this.verificationCodeButtonText = "Get Code ...";
    this.getCodeButtonProperty = true;
    this.verificationCodeGenerated = Math.floor(100000 + Math.random() * 900000);
    this.service.sendVerificationCode(this.resetPasswordForm.value, this.verificationCodeGenerated).subscribe((res) => {
      response = res.data;
      if(response != null)
      {
        console.log(this.verificationCodeGenerated);
        this.verificationCodeButtonText = "Resend It";
        // this.setVerificationValidTime();
        // this.verificationCodeGenerated = true;
        // this.signUpButton = true;
      }
      else
      {
        this.showMsg = 'Enter Email in right format';
        this.getCodeButtonProperty = false;
      }
    });
  }

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
}
