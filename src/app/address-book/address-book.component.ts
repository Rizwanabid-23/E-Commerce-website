import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { AppComponent } from '../app.component';
declare var window: any;

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css'],
})
export class AddressBookComponent implements OnInit {
  readData: any;
  editAddressDetail: any;
  AddressBook= false;

  cities = [
    "Ahmadpur East",
    "Ahmed Nager Chatha",
    "Ali Khan Abad",
    "Alipur",
    "Arifwala",
    "Attock",
    "Bhera",
    "Bhalwal",
    "Bahawalnagar",
    "Bahawalpur",
    "Bhakkar",
    "Burewala",
    "Chenab Nagar",
    "Chillianwala",
    "Choa Saidanshah",
    "Chakwal",
    "Chak Jhumra",
    "Chichawatni",
    "Chiniot",
    "Chishtian",
    "Chunian",
    "Dajkot",
    "Daska",
    "Davispur",
    "Darya Khan",
    "Dera Ghazi Khan",
    "Dhaular",
    "Dina",
    "Dinga",
    "Dhudial Chakwal",
    "Dipalpur",
    "Faisalabad",
    "Fateh Jang",
    "Ghakhar Mandi",
    "Gojra",
    "Gujranwala",
    "Gujrat",
    "Gujar Khan",
    "Harappa",
    "Hafizabad",
    "Haroonabad",
    "Hasilpur",
    "Haveli Lakha",
    "Islamabad",
    "Jalalpur Jattan",
    "Jampur",
    "Jaranwala",
    "Jhang",
    "Jhelum",
    "Jauharabad",
    "Kallar Syedan",
    "Kalabagh",
    "Karor Lal Esan",
    "Karachi",
    "Kasur",
    "Kamalia",
    "Kāmoke",
    "Khanewal",
    "Khanpur",
    "Khanqah Sharif",
    "Kharian",
    "Khushab",
    "Kot Adu",
    "Lahore",
    "Lalamusa",
    "Layyah",
    "Lawa Chakwal",
    "Liaquat Pur",
    "Lodhran",
    "Malakwal",
    "Mamoori",
    "Mailsi",
    "Mandi Bahauddin",
    "Mian Channu",
    "Mianwali",
    "Miani",
    "Multan",
    "Murree",
    "Muridke",
    "Mianwali Bangla",
    "Muzaffargarh",
    "Narowal",
    "Nankana Sahib",
    "Okara",
    "Pakpattan",
    "Pattoki",
    "Pindi Bhattian",
    "Pind Dadan Khan",
    "Pir Mahal",
    "Qaimpur",
    "Qila Didar Singh",
    "Raiwind",
    "Rajanpur",
    "Rahim Yar Khan",
    "Rawalpindi",
    "Renala Khurd",
    "Sadiqabad",
    "Sagri",
    "Sahiwal",
    "Sambrial",
    "Samundri",
    "Sangla Hill",
    "Sarai Alamgir",
    "Sargodha",
    "Shakargarh",
    "Sheikhupura",
    "Shujaabad",
    "Sialkot",
    "Sohawa",
    "Soianwala",
    "Siranwali",
    "Tandlianwala",
    "Talagang",
    "Taxila",
    "Toba Tek Singh",
    "Vehari",
    "Wah Cantonment",
    "Wazirabad",
    "Yazman",
    "Zafarwal"
  ]

  constructor(private service: APIService, private router: Router, private ap: AppComponent) {}

  editAddress = new FormGroup({
    'fullName': new FormControl('', Validators.required),
    'phoneNo': new FormControl('', Validators.required),
    'Building_House_Street_Floor': new FormControl('', Validators.required),
    'Colony_Submark_Locality_Landmark': new FormControl('', Validators.required),
    'Province': new FormControl('', Validators.required),
    'City': new FormControl('', Validators.required),
    'NickName': new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this.service
      .getAddressBookData(sessionStorage.getItem('buyerLoginId'))
      .subscribe((res) => {
        this.readData = res.data;
        console.log(this.readData);
        this.AddressBook =true;
      });
    this.editAddressDetail = new window.bootstrap.Modal(
      document.getElementById("editAddressDetailModalId")
    );
  }

  closeEditAddressDetailModal() {
    this.editAddressDetail.hide();
  }

  openEditAddressDetailModal() {
    this.editAddressDetail.show();
    this.editAddress.setValue({
      'fullName': this.readData[0].FullName,
      'phoneNo': this.readData[0].PhoneNo,
      'Building_House_Street_Floor': this.readData[0].Buildin_House_Street_Floor,
      'Colony_Submark_Locality_Landmark': this.readData[0].Colony_Submark_Locality_Landmark,
      'Province': this.readData[0].Province,
      'City': this.readData[0].City,
      'NickName': this.readData[0].NickName,
    })
  }

  deleteAddressDetails() {
    var Row = document.getElementById('details');
    var Cells = Row.getElementsByTagName('td');
    var id = Row.getElementsByTagName('th');
    var data = {
      Id: id[0].innerText,
      Buyer_User_Id: Cells[7].innerText,
    };

    this.service.deleteBuyerUserAddressDetails(data).subscribe((res) => {
      this.ngOnInit();
    });
  }

  saveEditAddressDetails()
  {
    var data = {
      Id: this.readData[0].Id,
      FullName: this.editAddress.value.fullName,
      PhoneNo: this.editAddress.value.phoneNo,
      Building_House_Street_Floor: this.editAddress.value.Building_House_Street_Floor,
      Colony_Submark_Locality_Landmark: this.editAddress.value.Colony_Submark_Locality_Landmark,
      Province: this.editAddress.value.Province,
      City: this.editAddress.value.City,
      NickName: this.editAddress.value.NickName,
      Buyer_User_Id: this.readData[0].Buyer_User_Id,
    };
    this.service.editBuyerUserAddressDetails(data).subscribe((res) => {
      this.ngOnInit();
    });
    this.editAddressDetail.hide();
  }
}
