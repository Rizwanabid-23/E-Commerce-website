import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSupportItemComponent } from './customer-support-item.component';

describe('CustomerSupportItemComponent', () => {
  let component: CustomerSupportItemComponent;
  let fixture: ComponentFixture<CustomerSupportItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSupportItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerSupportItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
