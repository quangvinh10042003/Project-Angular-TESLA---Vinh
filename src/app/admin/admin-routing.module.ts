import { AccountComponent } from './pages/account/account.component';
import { CategoryComponent } from './pages/category/category.component';
import { EditAccessoryComponent } from './pages/edit-accessory/edit-accessory.component';
import { AddAccessoryComponent } from './pages/add-accessory/add-accessory.component';
import { EditComponent } from './pages/edit/edit.component';
import { AddnewComponent } from './pages/addnew/addnew.component';
import { MainComponent } from './pages/main/main.component';
import { AdminAppComponent } from './admin-app/admin-app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"",component: AdminAppComponent, children:[
    {path:"", component: MainComponent},
    {path:"list/:id", component: MainComponent},
    {path:"addnew", component: AddnewComponent},
    {path:"category", component: CategoryComponent},
    {path:"account", component: AccountComponent},
    {path:"edit/:id", component: EditComponent},
    {path:"addAccessory", component: AddAccessoryComponent},
    {path:"editAccessory/:id", component: EditAccessoryComponent},
  ]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
