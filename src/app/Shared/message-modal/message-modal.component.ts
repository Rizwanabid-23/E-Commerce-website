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
  ngOnInit(): void {
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
    }, 2000);
  }
  closeModal()
  {
    this.showMessageModal.hide();
    this.navigateOnNextPage = this.ap.navigateOnNextPage;
    if(this.navigateOnNextPage == "SellerDashboard")
    {
      this.ap.goSellerDashboardPage();
    }

  }





}
