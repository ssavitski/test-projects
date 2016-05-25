/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';
import { CollapseDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { RecipeComponent } from './recipe-book/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

import { AppState } from './app.service';
import { Home } from './home';
import { RouterActive } from './router-active';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  directives: [ RouterActive, CollapseDirective ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('./app.css')
  ],
  template: `
    <div class="container-fluid container">
      <nav class="navbar navbar-default">
        <div class="container-fluid container">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" (click)="isCollapsed = !isCollapsed">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" [routerLink]="['Recipes']">Recipe Book</a>
          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" [collapse]="isCollapsed">
            <ul class="nav navbar-nav">
              <li class="active"><a [routerLink]="['Recipes']">Recipes <span class="sr-only">(current)</span></a></li>
              <li><a  [routerLink]="['Shopping-list']">Shopping list</a></li>
            </ul>
          </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
      </nav>

      <span router-active>
        <button [routerLink]=" ['Home'] ">
          Home
        </button>
      </span>
      <span router-active>
        <button [routerLink]=" ['About'] ">
          About
        </button>
      </span>

      <main>
        <router-outlet></router-outlet>
      </main>

      <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>
    </div>
  `
})
@RouteConfig([
  { path: '/home',  name: 'Home',  component: Home,  },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') },
  { path: '/recipes', name: 'Recipes', component: RecipeComponent, useAsDefault: true },
  { path: '/shopping-list', name: 'Shopping-list', component: ShoppingListComponent }
])
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  loading = false;
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';
  public isCollapsed: boolean;

  constructor(
    public appState: AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
    this.isCollapsed = false;
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
