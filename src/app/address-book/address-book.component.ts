import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css']
})
export class AddressBookComponent implements OnInit {

  readData: any;

  constructor(
    private service: APIService,
    private router: Router,
    private ap: AppComponent
  ) {}


  ngOnInit(): void {
    this.service.getAddressBookData(sessionStorage.getItem('loginBuyerId')).subscribe((res) => {
      this.readData = res.data;
    });
  }

  editAddressDetails()
  {
    var Row = document.getElementById("details");
    var Cells = Row.getElementsByTagName("td");
    var id = Row.getElementsByTagName('th');
    // console.log(id[0].innerText,Cells[0].innerText,Cells[1].innerText,Cells[2].innerText,Cells[3].innerText,Cells[4].innerText,Cells[5].innerText,Cells[6].innerText,Cells[7].innerText)
    var data = 
    {
      Id : id[0].innerText,
      FullName : Cells[0].innerText,
      PhoneNo : Cells[1].innerText,
      Building_House_Street_Floor : Cells[2].innerText,
      Colony_Submark_Locality_Landmark : Cells[3].innerText,
      Province : Cells[4].innerText,
      City : Cells[5].innerText,
      NickName : Cells[6].innerText,
      Buyer_User_Id : Cells[7].innerText
    }
    this.service.editBuyerUserAddressDetails(data).subscribe((res) =>{
      this.ngOnInit();
    });
  }

  deleteAddressDetails()
  {
    var Row = document.getElementById("details");
    var Cells = Row.getElementsByTagName("td");
    var id = Row.getElementsByTagName('th');
    // console.log(id[0].innerText,Cells[0].innerText,Cells[1].innerText,Cells[2].innerText,Cells[3].innerText,Cells[4].innerText,Cells[5].innerText,Cells[6].innerText,Cells[7].innerText)
    var data = 
    {
      Id : id[0].innerText,
      Buyer_User_Id : Cells[7].innerText
    }
    this.service.deleteBuyerUserAddressDetails(data).subscribe((res) =>{
      this.ngOnInit();
    });
  }
}
