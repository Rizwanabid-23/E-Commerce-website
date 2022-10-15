import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInSellerComponent } from './sign-in-seller.component';

describe('SignInSellerComponent', () => {
  let component: SignInSellerComponent;
  let fixture: ComponentFixture<SignInSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInSellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
