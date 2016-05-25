import {Component, OnInit} from 'angular2/core';
import {ShoppingListEditComponent} from './shopping-list-edit.component';
import {Ingredient} from '../shared/ingredient';
import {ShoppingListService} from './shopping-list.service';

@Component({
  template: require('./shopping-list.template.html'),
  directives: [ShoppingListEditComponent],
  providers: [ShoppingListService]
})

export class ShoppingListComponent implements OnInit {
  shoppingList: Ingredient[];
  selectedItem: Ingredient = null;

  constructor(private _ShoppingListService: ShoppingListService) {

  }

  ngOnInit():any {
    this._ShoppingListService.getAllItems()
      .subscribe(ingredients => this.shoppingList = ingredients,
                 error => console.error('Error: ' + error),
                 () => console.log('Completed!')
    );
  }
}
