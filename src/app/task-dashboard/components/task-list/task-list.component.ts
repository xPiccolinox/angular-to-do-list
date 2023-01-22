import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Task } from "../../models/task.interface";

@Component({
  selector: 'task-list',
  styleUrls: ['task-list.component.scss'],
  template: `
    <li class="task" [class.taskDone]="task.done">
      {{ task.title }}
      <button (click)="changeDone(task)"> Done </button>
      <button (click)="onRemove(task)"> Remove </button>
    </li>
  `
})

export class TaskListComponent {
  @Input()
  task!: Task
  @Output()
  remove: EventEmitter<any> = new EventEmitter()
  @Output()
  done: EventEmitter<any> = new EventEmitter()

  changeDone(event: Task) {
    this.done.emit(this.task)
  }
  onRemove(event: Task) {
    this.remove.emit(this.task)
  }
}