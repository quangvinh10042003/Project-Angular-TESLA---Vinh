import { Router } from '@angular/router';
import { CategoryService } from './../../../services/category.service';
import { AccountService } from './../../../services/account.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  listHistory: any;
  acc: any;
  category: any = [];
  listOrder: any;
  accountSignIn: any;
  constructor(private accService: AccountService, private categorySer: CategoryService, private router: Router) { }

  ngOnInit(): void {
    // this.listOrder = 0;
    document.documentElement.scrollTop = 0;
    this.accountSignIn = sessionStorage.getItem('accountSignIn');
    this.accountSignIn = JSON.parse(this.accountSignIn);
    if (this.accountSignIn) {
      this.accService.getItem(this.accountSignIn.id).subscribe((data: any) => {
        this.acc = data;
        this.listOrder = data.history.cart;
        this.listHistory = data.history;
        this.listHistory.forEach((element: any) => {
          element.cart.forEach((product: any) => {
            this.categorySer.getItem(product.category_id).subscribe((item: any) => {
              this.category.push(item.name);
            })
          });
        });
      })
    }
  }
  showMoreOrder(id: number) {
    let box1 = document.getElementById(`showMoreOrder${id}`) as HTMLDivElement | null;
    let box2 = document.getElementById(`closeMoreOrder${id}`) as HTMLDivElement | null;
    let itemGroup = document.getElementById(`itemGroup${id}`) as HTMLDivElement | null;
    let iconGroup = document.getElementById(`icon${id}`) as HTMLDivElement | null;
    box2?.classList.remove('d-none');
    box1?.classList.add('d-none');
    itemGroup?.classList.remove('maxHeight');
    iconGroup?.setAttribute('class', 'fa-solid fa-angle-up');
  }
  closeMoreOrder(id: number) {
    let box1 = document.getElementById(`showMoreOrder${id}`) as HTMLDivElement | null;
    let box2 = document.getElementById(`closeMoreOrder${id}`) as HTMLDivElement | null;
    let itemGroup = document.getElementById(`itemGroup${id}`) as HTMLDivElement | null;
    let iconGroup = document.getElementById(`icon${id}`) as HTMLDivElement | null;
    box1?.classList.remove('d-none');
    box2?.classList.add('d-none');
    itemGroup?.classList.add('maxHeight');
    iconGroup?.setAttribute('class', 'fa-solid fa-angle-down');
  }
  removeItem(id: number) {
    this.listHistory.splice(id, 1);
    this.acc.history = this.listHistory;
    this.accService.editItem(this.accountSignIn.id, this.acc).subscribe();
    if (this.listHistory.length == 0) {
      this.listOrder = 0;
    }
  }
  removeAllHistory() {

    Swal.fire({
      title: 'Are you sure?',
      text: "Your data will be completely removed. You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your product has been deleted.',
          'success'
        )
        this.acc.history = [];
        this.listHistory = 0;
        this.accService.editItem(this.accountSignIn.id, this.acc).subscribe();
      }
    })

  }
  signout() {
    this.accService.isUserLoggedIn.next(false);
    this.accService.totalCard.next(0);
    sessionStorage.clear();
    this.router.navigate(['signin']);
  }
}
