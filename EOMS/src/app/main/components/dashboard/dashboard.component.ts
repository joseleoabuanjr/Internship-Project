import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  editable = false;

  @Input() item!: Item;
  @Output() remove = new EventEmitter<Item>();

  saveItem(description: string) {
    if (!description) return;
    this.editable = false;
    this.item.description = description;
  }

  title = 'Extension Head To-Do List';

  filter: 'All' | 'active' | 'done' = 'All';

  allItems = [
    { description: 'Flag Ceremony - 08:00 A.M.', done: true },
    { description: 'Media Briefing - 10:00 A.M.', done: false },
    { description: 'CICT Executives Lunch Out - 01:00 P.M.', done: true },
    { description: 'Partnership Meeting - 03:00 P.M.', done: false },
  ];

  get items() {
    if (this.filter === 'All') {
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

}

export interface Item {
  description: string;
  done: boolean;
}
