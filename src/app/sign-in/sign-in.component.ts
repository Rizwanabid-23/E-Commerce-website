import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  constructor(private service:APIService) { }


  showMsg:any;
  re:any;
  readData:any;
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

  checkSignInFormData(){
    if(this.signInForm.valid){
      let isExist:boolean = false;
      this.service.checkValidSignInUser(this.signInForm.value).subscribe(res =>{
        this.readData = res.data;
        this.showMsg = 'Successfully Login';
        isExist = true;
        this.signInForm.reset();
      });
    }
    else{
      this.showMsg ='Fill All Fields';
    }
  }

}
