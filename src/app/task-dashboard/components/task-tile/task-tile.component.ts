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
  edit: EventEmitter<any> = new EventEmitter()
  @Output()
  remove: EventEmitter<any> = new EventEmitter()
  @Output()
  done: EventEmitter<any> = new EventEmitter()

  editing:boolean = false
  editDoneValue: string = ''

  handleToggleEditing() {
    this.editDoneValue = this.task.title
    this.editing = !this.editing
  }
  handleEditDone(value: string) {
    this.editing = false
    this.edit.emit({task: this.task, newTitle: value})
  }
  handleChangeDoneStatus() {
    this.done.emit(this.task)
  }
  handleRemove() {
    this.remove.emit(this.task)
  }
}