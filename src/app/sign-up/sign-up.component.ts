import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private service: APIService) { }

  showMsg: any;
  readData: any;
  ngOnInit(): void {
    // this.service.getUserData().subscribe((res) =>{
    //   console.log('User Data');
    //   this.readData = res.data;
    // })
  }


  signUpForm = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
    'fullname': new FormControl('', Validators.required)

  })

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
    this.service.insertUserData(this.signUpForm.value).subscribe((res) => {
      this.showMsg = 'Account Successfully Created';
      this.signUpForm.reset();

    });

  }

}
