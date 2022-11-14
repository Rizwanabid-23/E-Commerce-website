import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  constructor(private service:APIService, private router:Router, private ap:AppComponent) { }


  showMsg:any;
  readData:any;
  successfullyLogIn:Boolean = false;
  uLogin:Boolean;
  ngOnInit(): void {
    // this.service.getUserData().subscribe((res) =>{
    //   console.log('User Data');
    //   this.readData = res.data;
    // })

  }

  signInForm = new FormGroup({
    'email':new FormControl('',Validators.required),
    'password':new FormControl('',Validators.required),
  })

  // This function check email id from and password from server and check that user is right or not
  checkSignInFormData(){
    this.service.checkValidSignInUser(this.signInForm.value).subscribe(res =>{
      this.readData = res.data;
      if (this.readData == null){
        this.showMsg = 'Enter Right Email Id And Password';
      }
      else{
        this.ap.loginBuyerId = this.readData;
        this.ap.appOpen = false;
        this.ap.sellerLogin = false;
        this.ap.buyerLogin = true;
        if(this.ap.buyerLoginThroughAddToCart)
        {
          this.router.navigate(['productCart']);
        }
        else
        {
          this.router.navigate(['/']);
        }
        this.signInForm.reset();
      }

    });

  }

}
