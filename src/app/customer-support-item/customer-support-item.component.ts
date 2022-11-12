import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-customer-support-item',
  templateUrl: './customer-support-item.component.html',
  styleUrls: ['./customer-support-item.component.css']
})
export class CustomerSupportItemComponent implements OnInit {

  @Input() imgsrc : string = "";
  @Input() title : string = "";
  @Input() link : string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
