import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskList } from '../../models/taskList.interface';

@Component({
  selector: 'task-taskList',
  templateUrl: './task-taskList.component.html',
  styleUrls: ['./task-taskList.component.scss']
})
export class TaskTaskListComponent {
  @Input()
  taskList!: TaskList
  @Input()
  currentTaskListIndex!: number
  @Input()
  index!: number
  @Output()
  changeCurrentTaskListIndex: EventEmitter<any> = new EventEmitter()
  @Output()
  edit: EventEmitter<any> = new EventEmitter()
  @Output()
  remove: EventEmitter<any> = new EventEmitter()

  handleCurrentTaskListIndexChange(index: number) {
    if (!this.editing) this.changeCurrentTaskListIndex.emit(index)
  }

  editing:boolean = false
  editDoneValue: string = ''

  handleToggleEditing() {
    this.editDoneValue = this.taskList.listName
    this.editing = !this.editing
  }
  handleEditDone(value: string) {
    this.editing = false
    this.edit.emit({taskList: this.taskList, newTaskListName: value})
  }
  handleRemove() {
    this.remove.emit({taskList: this.taskList, index: this.index})
  }
}
