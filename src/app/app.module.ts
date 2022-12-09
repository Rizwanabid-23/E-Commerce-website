import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { APIService } from './api.service';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInSellerComponent } from './SellerRegistration/sign-in-seller/sign-in-seller.component';
import { SignUpSellerComponent } from './SellerRegistration/sign-up-seller/sign-up-seller.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { ProdAndSellerDescriptionComponent } from './Buyer/prod-and-seller-description/prod-and-seller-description.component';
import { AddStockComponent } from './SellerRegistration/add-stock/add-stock.component';
import { ProductCartComponent } from './Buyer/product-cart/product-cart.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductApiService } from './Buyer/Services/product-api.service';
import { ApisellerregistrationService } from './SellerRegistration/apisellerregistration.service';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { CustomerSupportItemComponent } from './customer-support-item/customer-support-item.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EditAccountDetailsComponent } from './edit-account-details/edit-account-details.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { MyReturnsComponent } from './my-returns/my-returns.component';
import { AddressBookComponent } from './address-book/address-book.component';
import { CancelOrderComponent } from './cancel-order/cancel-order.component';
import { SaveOrderAndSelectBillingComponent } from './Buyer/save-order-and-select-billing/save-order-and-select-billing.component';
import { NavbarComponent } from './App/navbar/navbar.component';
import { MessageModalComponent } from './Shared/message-modal/message-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    MainPageComponent,
    SignUpComponent,
    SignInSellerComponent,
    SignUpSellerComponent,
    SellerDashboardComponent,
    AddStockComponent,
    ProdAndSellerDescriptionComponent,
    ProductCartComponent,
    CustomerSupportComponent,
    CustomerSupportItemComponent,
    ResetPasswordComponent,
    EditAccountDetailsComponent,
    TrackOrderComponent,
    MyReturnsComponent,
    AddressBookComponent,
    CancelOrderComponent,
    SaveOrderAndSelectBillingComponent,
    NavbarComponent,
    MessageModalComponent,

  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule 
  ],
  providers: [
    APIService,
    ProductApiService,
    ApisellerregistrationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }