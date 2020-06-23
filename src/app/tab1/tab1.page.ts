import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  searchValue = '';

  constructor(private router: Router) { }

  openResultsWithQueryParams() {
    const navigationExtras: NavigationExtras = {
      state: {
        search: this.searchValue === '' ? 'all' : this.searchValue
      }
    };
    this.router.navigate(['results'], navigationExtras);
  }

}
