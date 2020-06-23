import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Item, MenuItem, MenuItemCart } from '../models/item';
import { CommerceService } from '../services/commerce.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {

  searchFilter: any;
  items: Item[] = [];
  itemsFiltered: Item[] = [];
  notFoundError = false;

  constructor(private route: ActivatedRoute, private router: Router, public commerceService: CommerceService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.searchFilter = this.router.getCurrentNavigation().extras.state.search;
      }
    });
  }

  ngOnInit() {
    // const menuItems = [];
    // const items = [];
    // const m: MenuItem = Object.assign({});
    // m.id = '1';
    // m.name = 'Queques x10';
    // m.price = '100';
    // m.quantity = 0;
    // menuItems.push(m);
    // const m2: MenuItem = Object.assign({});
    // m2.id = '2';
    // m2.name = 'Cerveza lata';
    // m2.price = '80';
    // m2.quantity = 0;
    // menuItems.push(m2);
    // const i: Item = Object.assign({});
    // i.id = '1';
    // i.name = 'Humano Fitness';
    // i.img = 'https://dnd1g0gk41u1l.cloudfront.net/image/filename/3262668/logo_uOQcoXwJyVXsM39Mhr6LEICgv8dWZwPC.jpg';
    // i.desc = 'Cervecería';
    // i.offers = menuItems;
    // i.phone = '000-0000000';
    // i.address = 'Buenos Aires 100';
    // i.likes = 0;
    // items.push(i);

    // const menuItems2 = [];
    // const m21: MenuItem = Object.assign({});
    // m21.id = '1';
    // m21.name = 'Pizza Muzza';
    // m21.price = '150';
    // m21.quantity = 0;
    // menuItems2.push(m21);
    // const m22: MenuItem = Object.assign({});
    // m22.id = '2';
    // m22.name = 'Faramoes';
    // m22.price = '100';
    // m22.quantity = 0;
    // menuItems2.push(m22);
    // const i2: Item = Object.assign({});
    // i2.id = '2';
    // i2.name = 'Moes RestoBar';
    // i2.img = 'https://www.actualidadsimpson.com/wp-content/uploads/2017/02/El-flameado-de-Moe-03x10-1.jpg';
    // i2.desc = 'Resto Bar';
    // i2.offers = menuItems2;
    // i2.phone = '000-1123232';
    // i2.address = 'Bv DePaola 100';
    // i2.likes = 0;
    // items.push(i2);

    // if (this.searchFilter === 'all') {
    //   this.items.push(i);
    //   this.items.push(i2);
    // } else {
    //   items.forEach(element => {
    //     const commerce = element.name.toLowerCase();
    //     if (commerce.includes(this.searchFilter.toLowerCase())) {
    //       this.items.push(element);
    //     } else {
    //       element.offers.forEach(menu => {
    //         const name = menu.name.toLowerCase();
    //         if (name.includes(this.searchFilter.toLowerCase())) {
    //           this.items.push(element);
    //         }
    //       });
    //     }
    //   });
    // }

    this.commerceService.getCommerces()
      .subscribe(
        (data: Item[]) => {
          console.log(data);
          this.items = data;
          if (this.items.length > 0) {
            if (this.searchFilter !== 'all') {
              this.items.forEach(element => {
                const commerce = element.name.toLowerCase();
                if (commerce.includes(this.searchFilter.toLowerCase())) {
                  this.itemsFiltered.push(element);
                } else {
                  element.offers.forEach(menu => {
                    const name = menu.name.toLowerCase();
                    if (name.includes(this.searchFilter.toLowerCase())) {
                      this.itemsFiltered.push(element);
                    }
                  });
                }
              });
              this.items = this.itemsFiltered;
            }
          } else {
            this.notFoundError = true;
          }
        },
        (error) => {
          console.error(error);
        }
      );


  }

  detailsComponent(selectedItem) {
    const navigationExtras: NavigationExtras = {
      state: {
        selected: selectedItem
      }
    };
    this.router.navigate(['details'], navigationExtras);
  }
}
