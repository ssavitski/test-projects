import {Component, OnInit} from 'angular2/core';
import {ShoppingListEditComponent} from './shopping-list-edit.component';
import {Ingredient} from '../shared/ingredient';
import {ShoppingListService} from './shopping-list.service';

@Component({
  template: require('./shopping-list.template.html'),
  directives: [ShoppingListEditComponent],
  providers: [ShoppingListService],
  styleUrls: ['./assets/css/shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit {
  shoppingList: Ingredient[];
  selectedItem: Ingredient = null;
  activeState: number = null;

  constructor(private _ShoppingListService: ShoppingListService) {

  }

  onAddItem() {
    this.selectedItem = null;
    this.activeState = null;
  }

  onSelectItem(item: Ingredient) {
    this.selectedItem = item;
    this.activeState = item.id;
  }

  ngOnInit():any {
    this._ShoppingListService.getAllItems()
      .subscribe(ingredients => this.shoppingList = ingredients,
                 error => console.error('Error: ' + error),
                 () => console.log('Completed!')
    );
  }
}
