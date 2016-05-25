interface IngredientFields {
  id: number;
  name: string;
  amount: number;
}

export class Ingredient implements IngredientFields {
  constructor(public id: number,
              public name: string,
              public amount: number) {

  }
}
