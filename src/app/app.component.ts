import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}
  // list of the drawer item
  Pages = [
    {
      title: 'Product',
      url: '/product-list',
      icon: 'list-circle'
    },
    {
      title: 'Arrange Data',
      url: '/arrange-component',
      icon: 'list-circle'
    },
  ];
}
