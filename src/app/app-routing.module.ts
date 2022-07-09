import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"",loadChildren:()=>import('./customer/customer.module').then((m)=>m.CustomerModule)},
  {path:"admin",canActivate: [AuthGuard],loadChildren:()=>import('./admin/admin.module').then((m)=>m.AdminModule)},
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
