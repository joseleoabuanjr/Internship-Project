import { Component } from '@angular/core';
import { Item } from "./item";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  title = 'todo';

  filter: 'all' | 'active' | 'done' = 'all';

  allItems = [
    { description: 'Partnership Meeting - 09:00 AM', done: true },
    { description: 'Set Up Faculty Accounts', done: false },
    { description: 'View Email Notifications', done: false },
    { description: 'CICT Technical Seminar - 01:00 PM', done: false },
  ];

  get items() {
    if (this.filter === 'all') {
      return this.allItems;
    }
    return this.allItems.filter((item) => this.filter === 'done' ? item.done : !item.done);
  }

  addItem(description: string) {
    this.allItems.unshift({
      description,
      done: false
    });
  }

  remove(item: Item) {
  this.allItems.splice(this.allItems.indexOf(item), 1);
}

}
