import { AccountService } from './../../../services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tesla-about',
  templateUrl: './tesla-about.component.html',
  styleUrls: ['./tesla-about.component.css']
})
export class TeslaAboutComponent implements OnInit {
  getCart: number = 0;
  accountSignIn: any;
  constructor(private accountSer: AccountService) { }

  ngOnInit(): void {
    document.documentElement.scrollTop = 0;
    let openMenuInAccountPages = document.getElementById('openMenuInAccountPages') as HTMLDivElement | null;
    openMenuInAccountPages?.classList.add('d-none');
    this.accountSignIn = sessionStorage.getItem('accountSignIn');
    this.accountSignIn = JSON.parse(this.accountSignIn);
  }
}
