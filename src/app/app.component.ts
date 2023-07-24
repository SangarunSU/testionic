import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'About', url: '/about', icon: 'alert' },
    { title: 'Contact', url: '/contact', icon: 'call' },
    { title: 'Customer', url: '/customer', icon: 'accessibility'},
    { title: 'Login', url: '/loginauth',icon: 'call'}
  ];
  constructor() {}
}
