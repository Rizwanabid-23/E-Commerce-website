import { Component, OnInit } from '@angular/core';
import { ApisellerregistrationService } from '../apisellerregistration.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

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
  // successfullyLogIn:Boolean = false;

  sellerSignInForm = new FormGroup({

    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),

  })

  // This function check email id from and password from server and check that user is right or not
  checkSignInFormData(){
    this.service.checkValidSellerSignIn(this.sellerSignInForm.value).subscribe(res =>{
      this.readData = res.data;
      console.log(this.readData);
      if (this.readData == null){
        this.showMsg = 'Enter correct Email Id and Password';
      }
      else{
        this.sellerSignInForm.reset();
        this.ap.appOpen = false;
        this.ap.sellerLogin = true;
        this.ap.buyerLogin = false;
        this.router.navigate(['/SellerDashboard']);
      }

    });

  }

}
