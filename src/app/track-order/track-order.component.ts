import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit {
  readData: any;

  constructor(private service: APIService,
    private router: Router,
    private ap: AppComponent) { }

  ngOnInit(): void {
    this.service.getTrackOrderData(sessionStorage.getItem('loginBuyerId')).subscribe((res) => {
      this.readData = res.data;
    });
  }

}
