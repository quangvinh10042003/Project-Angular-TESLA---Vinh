import { HistoryComponent } from './pages/history/history.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { AccountSettingComponent } from './pages/account-setting/account-setting.component';
import { AccountComponent } from './pages/account/account.component';
import { CartComponent } from './pages/cart/cart.component';
import { DetailAccessoryComponent } from './pages/detail-accessory/detail-accessory.component';
import { DetailComponent } from './pages/detail/detail.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { TeslaAboutComponent } from './pages/tesla-about/tesla-about.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { ShopComponent } from './pages/shop/shop.component';

const routes: Routes = [
  {
    path: "", component: CustomerComponent, children: [
      { path: "", component: HomeComponent },
      { path: "delivery", component: DeliveryComponent },
      { path: "teslaAbout", component: TeslaAboutComponent },
      { path: "signin", component: SigninComponent },
      { path: "signup", component: SignupComponent },
      { path: "cart", component: CartComponent },
      { path: "allshop", component: ShopComponent },
      { path: "shop/:id", component: ShopComponent },
      { path: "detail/:id", component: DetailComponent },
      { path: "detailAccessory/:id", component: DetailAccessoryComponent },
      {path:"account",component: AccountComponent},
      {path:"accountSetting",component: AccountSettingComponent},
      {path:"changePassword",component: ChangePasswordComponent},
      {path:"history",component: HistoryComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
