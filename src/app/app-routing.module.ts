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
import {UploadFileService} from './SellerRegistration/upload-file.service';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'SignIn', component: SignInComponent },
  { path: 'SignUp', component: SignUpComponent },
  { path: 'SignInSeller', component: SignInSellerComponent },
  { path: 'SignUpSeller', component: SignUpSellerComponent },
  { path: 'SellerDashboard', component: SellerDashboardComponent },
  {path: 'addStock',component:AddStockComponent},
  {path: 'productAndSellerDetails',component:ProdAndSellerDescriptionComponent},
  {path: 'productCart', component:ProductCartComponent},
  {path:'uploadFile',component:UploadFileService}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
