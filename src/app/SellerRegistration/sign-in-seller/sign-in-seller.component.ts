import { Component, OnInit } from '@angular/core';
import { ApisellerregistrationService } from '../apisellerregistration.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { GlobalData } from 'src/app/App/navbar/GlobalData';

@Component({
  selector: 'app-sign-in-seller',
  templateUrl: './sign-in-seller.component.html',
  styleUrls: ['./sign-in-seller.component.css']
})
export class SignInSellerComponent implements OnInit {

  constructor(private service:ApisellerregistrationService,  private router:Router, private ap:AppComponent) { }

  ngOnInit(): void {
  }

  showMsg:any;
  readData:any;
  uL:Boolean
  aaaa:any;
  // successfullyLogIn:Boolean = false;

  sellerSignInForm = new FormGroup({

    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),

  })

  async getLoginSellerName(){
    await this.service.getLoginSellerFNameLName(this.ap.loginSellerId).subscribe(res =>{
      this.readData = res.data;
      if (this.readData != null){
        this.ap.loginSellerName = this.readData;
        localStorage.setItem('sellerLoginName', this.ap.loginSellerName.toString());
        this.ap.appOpen = false;
        this.ap.sellerLogin = true;
        this.ap.buyerLogin = false;
        this.router.navigate(['/SellerDashboard']);
        this.sellerSignInForm.reset();
        this.aaaa = localStorage.getItem('sellerLoginName');
      }
    });
  }

  // This function check email id from and password from server and check that user is right or not
  checkSignInFormData(){
    this.service.checkValidSellerSignIn(this.sellerSignInForm.value).subscribe(res =>{
      this.readData = res.data;
      if (this.readData == null){
        this.showMsg = 'Enter correct Email Id and Password';
      }
      else{
        this.ap.loginSellerId = this.readData;
        localStorage.setItem('sellerLoginId',this.ap.loginSellerId.toString());
        this.getLoginSellerName();
      }

    });

  }

}
