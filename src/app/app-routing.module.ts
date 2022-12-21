import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { SignInSellerComponent } from './SellerRegistration/sign-in-seller/sign-in-seller.component';
import { SignUpSellerComponent } from './SellerRegistration/sign-up-seller/sign-up-seller.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { AddStockComponent } from './SellerRegistration/add-stock/add-stock.component';
import { ProdAndSellerDescriptionComponent } from './Buyer/prod-and-seller-description/prod-and-seller-description.component';
import { ProductCartComponent } from './Buyer/product-cart/product-cart.component';
import { UploadFileService } from './SellerRegistration/upload-file.service';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CancelOrderComponent } from './cancel-order/cancel-order.component';
import { EditAccountDetailsComponent } from './edit-account-details/edit-account-details.component';
import { AddressBookComponent } from './address-book/address-book.component';
import { MyReturnsComponent } from './my-returns/my-returns.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { MessageModalComponent } from './Shared/message-modal/message-modal.component';
import { NavbarComponent } from './App/navbar/navbar.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AuthGuard } from './Shared/auth.guard';
import { SellerAuthGuard } from './SellerRegistration/seller-auth.guard';
import { AdminAuthGuard } from './admin/admin-auth.guard';
import { AdminSignInComponent } from './admin/admin-sign-in/admin-sign-in.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'SignIn', component: SignInComponent },
  { path: 'SignUp', component: SignUpComponent },
  { path: 'productAndSellerDetails', component: ProdAndSellerDescriptionComponent, },
  { path: 'productCart', canActivate:[AuthGuard], component: ProductCartComponent },
  { path: 'customerSupport', canActivate:[AuthGuard], component: CustomerSupportComponent },
  { path: 'resetPassword',  component: ResetPasswordComponent },
  { path: 'cancelOrder', canActivate:[AuthGuard], component: CancelOrderComponent },
  { path: 'editAccountDetails', canActivate:[AuthGuard], component: EditAccountDetailsComponent },
  { path: 'addressBook', canActivate:[AuthGuard], component: AddressBookComponent },
  { path: 'myReturns', canActivate:[AuthGuard], component: MyReturnsComponent },
  { path: 'trackOrder', canActivate:[AuthGuard], component: TrackOrderComponent },
  { path: 'SignInSeller', component: SignInSellerComponent },
  { path: 'SignUpSeller', component: SignUpSellerComponent },
  { path: 'SellerDashboard', canActivate:[SellerAuthGuard], component: SellerDashboardComponent },
  { path: 'addStock', canActivate:[SellerAuthGuard], component: AddStockComponent },
  { path: 'adminSignIn',  component:AdminSignInComponent},
  { path: 'adminDashboard', canActivate:[AdminAuthGuard], component:DashboardComponent},
  { path: 'uploadFile', component: UploadFileService },
  { path: 'ShowMessageModal', component: MessageModalComponent },
  { path: 'navbar', component: NavbarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
