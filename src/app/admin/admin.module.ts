import { SearchPipe } from './pipes/search.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAppComponent } from './admin-app/admin-app.component';

import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './layouts/header/header.component';
import { MenuComponent } from './layouts/menu/menu.component';
import { MainComponent } from './pages/main/main.component';
import { AddnewComponent } from './pages/addnew/addnew.component';
import { EditComponent } from './pages/edit/edit.component';
import { AddAccessoryComponent } from './pages/add-accessory/add-accessory.component';
import { EditAccessoryComponent } from './pages/edit-accessory/edit-accessory.component';
import { CategoryComponent } from './pages/category/category.component';
import { AccountComponent } from './pages/account/account.component';
import { SearchEmailPipe } from './pipes/search-email.pipe';


@NgModule({
  declarations: [
    AdminAppComponent,
    HeaderComponent,
    MenuComponent,
    MainComponent,
    SearchPipe,
    AddnewComponent,
    EditComponent,
    AddAccessoryComponent,
    EditAccessoryComponent,
    CategoryComponent,
    AccountComponent,
    SearchEmailPipe,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
