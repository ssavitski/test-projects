import {Injectable} from 'angular2/core';
import {Ingredient} from './../shared/ingredient';

import {Http, Headers} from 'angular2/http';

import 'rxjs/add/operator/toPromise';

@Injectable()

export class ShoppingListService {
  url: string;

  constructor(public http: Http) {
    this.url = 'http://57453db969bf6411008454aa.mockapi.io/ShoppingList';
  }

  getAllItems() {
    return this.http.get(this.url)
      .map(res => res.json());
  }

  getItem(index: number) {
    return this.http.get(`${this.url}:${index}`)
      .map(res => res.json());
  }

  getIndexOfItem(item: Ingredient) {

  }

  insertItem(item: Ingredient): Promise<Ingredient> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
      .post(this.url,
            JSON.stringify(item),
            {headers: headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(error => console.error('Error: ' + error));
  }

  insertItems(items: Ingredient[]) {

  }

  deleteItem(index: number) {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
      .delete(`${this.url}:${index}`, headers)
      .toPromise()
      .catch(error => console.error('Error: ' + error));
  }

  updateItem(index: number, item: Ingredient) {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
      .put(`${this.url}:${index}`,
           JSON.stringify(item),
           {headers: headers})
      .toPromise()
      .then(() => item)
      .catch(error => console.error('Error: ' + error));
  }

}
