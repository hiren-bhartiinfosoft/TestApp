import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

  Pages = [
    {
      title: 'Product',
      url: '/product-list',
      icon: 'list-circle'
    },
    {
      title: 'Home',
      url: '/home',
      icon: 'checkmark-done-circle'
    },
   
  ];
}
