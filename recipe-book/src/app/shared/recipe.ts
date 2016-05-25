import {Ingredient} from './ingredient';

interface recipeFields {
  name: string;
  content: string;
  imageUrl: string;
  ingredients: Ingredient[];
}

export class Recipe implements recipeFields {
  constructor(public name: string,
              public content: string,
              public imageUrl: string,
              public ingredients: Ingredient[]) {

  }
}
