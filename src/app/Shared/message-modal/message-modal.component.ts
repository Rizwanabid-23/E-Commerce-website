import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
declare var window:any;

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent implements OnInit {

  constructor(private ap:AppComponent, private router:Router) { }

  showMessageModal:any;
  showMessage:any;
  navigateOnNextPage:any;
  showMsgModal = false;
  ngOnInit(): void {

    this.showMsgModal = false;
    this.showMessageModal = new window.bootstrap.Modal(
      document.getElementById("showMessageModal")
    );
    this.showMessage = this.ap.showTextInMessageModal;
    this.openModal();
  }

  openModal()
  {
    this.showMessageModal.show();
    this.ordered();
  }


  ordered()
  {
    setTimeout (() => {
      this.closeModal();
    }, 1000);
  }
  closeModal()
  {
    this.showMessageModal.hide();
    this.navigateOnNextPage = this.ap.navigateOnNextPage;
    if(this.navigateOnNextPage == "SellerDashboard") 
    {
      this.ap.goSellerDashboardPage();
    }
    if(this.navigateOnNextPage == "AdminDashboard") 
    {
      this.ap.goAdminDashboardPage();
    }
    if(this.navigateOnNextPage == "Home") 
    {
      this.ap.goHomePage();
    }
  }





}
