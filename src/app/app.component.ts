import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';

interface Task {
  id: number,
  title: string,
  done: boolean
}

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <task-dashboard></task-dashboard>
  `
})
export class AppComponent {}