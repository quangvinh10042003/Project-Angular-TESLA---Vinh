import { AccountService } from './../../../services/account.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  allAccount:any;
  constructor(private accService: AccountService) { }
  ngOnInit(): void {
    this.accService.getAll().subscribe(data=>{
      this.allAccount = data
    })
  } 

}
