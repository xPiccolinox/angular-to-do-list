import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Task } from "../../models/task.interface";

@Component({
  selector: 'task-tile',
  templateUrl: 'task-tile.component.html',
  styleUrls: ['task-tile.component.scss']
})

export class TaskTileComponent {
  @Input()
  task!: Task
  @Input()
  i!: number
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