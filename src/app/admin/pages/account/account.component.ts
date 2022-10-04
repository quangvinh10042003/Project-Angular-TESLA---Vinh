import { AccountService } from './../../../services/account.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
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
    document.documentElement.scrollTop = 0;
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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.accService.deleteItem(id).subscribe(()=>{
          this.getAllAccount();
        });
      }
    })
    
  }
}
