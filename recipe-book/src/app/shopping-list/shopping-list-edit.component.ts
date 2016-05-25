import {Component} from 'angular2/core';
import {Ingredient} from '../shared/ingredient';
import {ShoppingListService} from './shopping-list.service';

@Component({
  selector: 'rb-shopping-list-edit',
  template: require('./shopping-list-edit.template.html'),
  inputs: ['ingredient']
})

export class ShoppingListEditComponent {
  ingredient: Ingredient;

  constructor(private _ShoppingListService: ShoppingListService) {

  }

  onSubmit(item: Ingredient) {
    if (this.ingredient != null) {
      this._ShoppingListService.updateItem(this.ingredient.id, item);
    } else {
      this._ShoppingListService.insertItem(item);
    }
  }

  onDelete() {
    this._ShoppingListService.deleteItem(this.ingredient.id);
    this.ingredient = null;
  }
}
