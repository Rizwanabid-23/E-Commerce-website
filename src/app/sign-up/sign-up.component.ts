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


  checkDetailValidSignUpForm() {
    if (this.signUpForm.valid) {
      let isExistAlready = false;
      this.service.checkValidSignUpUser(this.signUpForm.value).subscribe(res => {
        this.readData = res.data;
        isExistAlready = true;
        //console.log(this.readData.lenghth());
        console.log('No ', isExistAlready);

        this.showMsg = 'Account With This Email Id Already Exist';
      });
      if (!isExistAlready) {

        console.log('yes', isExistAlready);
        this.submitSignUpForm();
      }

    }
    else {
      this.showMsg = 'Fill All Fields';
    }

  }

  submitSignUpForm() {
    if (this.signUpForm.valid) {
      this.service.insertUserData(this.signUpForm.value).subscribe((res) => {
        this.showMsg = 'Account Successfully Created';
        this.signUpForm.reset();

      });
    }
    else {
      this.showMsg = 'Fill All Fields';
    }

  }

}
