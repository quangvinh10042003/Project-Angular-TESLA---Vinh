import { AccountService } from './../../../services/account.service';
import { ProductAcessoryService } from './../../../services/product-acessory.service';
import { ProductAccessory } from './../../../models/product-accessory';
import { VehicalService } from './../../../services/vehical.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listVehical: any = [];
  check: any;
  getCart: number = 0;
  accountSignIn: any;
  constructor( private vehicalService: VehicalService, private accessoryService: ProductAcessoryService) { }

  ngOnInit(): void {
    document.documentElement.scrollTop = 0;
    let openMenuInAccountPages = document.getElementById('openMenuInAccountPages') as HTMLDivElement | null;
    openMenuInAccountPages?.classList.add('d-none');
    this.accountSignIn = sessionStorage.getItem('accountSignIn');
    this.accountSignIn = JSON.parse(this.accountSignIn);
    
    this.vehicalService.getAll().subscribe(data => {
      data.map(item => {
        if (item.inHome) {
          this.listVehical.push(item);
        } else { }
      })
    });
    this.accessoryService.getAll().subscribe(data => {
      data.map(item => {
        if (item.inHome) {
          this.listVehical.push(item);
        } else { }
      })
    });
  }
}
