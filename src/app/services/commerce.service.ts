import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommerceService {

  constructor(
    private http: HttpClient
  ) { }

  getCommerces() {
    return this.http.get('http://www.json-generator.com/api/json/get/bOmOXwElvm?indent=2');
  }

  // https://www.json-generator.com/#
  // [
  //   '{{repeat(5, 7)}}',
  //   {
  //     id: '{{objectId()}}',
  //     name: '{{company().toUpperCase()}}',
  //     img: 'http://placehold.it/32x32',
  //     desc: 'Comercio ejemplo',
  //     phone: '+1 {{phone()}}',
  //     address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',

  //     likes: '{{index()}}',

  //     offers: [
  //       {	id:'{{objectId()}}',
  //       name: 'Pizza muzza grande',
  //       price: '150',
  //        quantity: 0
  //       },
  //       {	id:'{{objectId()}}',
  //       name: 'Cerveza 1l',
  //       price: '180',
  //        quantity: 0
  //       }
  //     ]
  //   }
  // ]
}
