import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdAndSellerDescriptionComponent } from './prod-and-seller-description.component';

describe('ProdAndSellerDescriptionComponent', () => {
  let component: ProdAndSellerDescriptionComponent;
  let fixture: ComponentFixture<ProdAndSellerDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdAndSellerDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdAndSellerDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
