import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveOrderAndSelectBillingComponent } from './save-order-and-select-billing.component';

describe('SaveOrderAndSelectBillingComponent', () => {
  let component: SaveOrderAndSelectBillingComponent;
  let fixture: ComponentFixture<SaveOrderAndSelectBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveOrderAndSelectBillingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveOrderAndSelectBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
