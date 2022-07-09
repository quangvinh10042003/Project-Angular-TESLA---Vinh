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
  listVehical:any = [];
  check:any;
  constructor(private vehicalService: VehicalService, private accessoryService: ProductAcessoryService) { }

  ngOnInit(): void {
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
   this.check = sessionStorage.getItem('check');
   if(this.check == 'true'){
    sessionStorage.removeItem('check');
    window.location.reload();
   }else{}
  }

}
