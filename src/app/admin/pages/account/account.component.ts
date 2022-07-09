import { AccountService } from './../../../services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  keyword:string='';
  allAccount:any;
  constructor(private accService: AccountService) { }
  ngOnInit(): void {
    this.getAllAccount();
  }
  getAllAccount(){
    this.accService.getAll().subscribe(data=>{
      this.allAccount = data
    })
  }
  changeStatus(id:number){
    let data = this.allAccount.find((item: any) => {
      return item.id == id;
    })
    this.accService.editItem(id,data).subscribe();
  }
  delete(id:number){
    this.accService.deleteItem(id).subscribe(()=>{
      this.getAllAccount();
    });
  }
}
