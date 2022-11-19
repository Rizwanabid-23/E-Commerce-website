import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  readData: any;
  showMsg: string;

  constructor(private service: APIService, private router:Router, private ap:AppComponent) { }

  ngOnInit(): void {
  }

  resetPasswordForm = new FormGroup({
    // 'email': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
    // 'fullname': new FormControl('', Validators.required)

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
}
