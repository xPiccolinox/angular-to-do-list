import { Component, OnInit} from "@angular/core";
import { TaskDashboardService } from "../../task-dashboard.service";
import { Task } from "../../models/task.interface";

// @Component({
//   selector: 'task-dashboard',
//   styleUrls: ['task-dashboard.component.scss'],
//   template: `
//     <div class="taskContainer">
//       <header>To do list</header>
//       <div class="taskList">
//         <task-tile
//           class="taskTile"
//           *ngFor="let task of tasks; let i = index;"
//           [task]="task"
//           [i]="i"
//           (done)="handleChangeDone($event)"
//           (remove)="handleRemove($event)">
//         </task-tile>
//       </div>
//       <task-form class="taskForm" (addNew)="handleAddNew($event)"></task-form>
//     </div>
//   `
// })
@Component({
  selector: 'task-dashboard',
  templateUrl: 'task-dashboard.component.html',
  styleUrls: ['task-dashboard.component.scss']
})

export class TaskDashboardComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private taskService: TaskDashboardService) {}
  ngOnInit() {
    this.tasks = this.taskService.getTasks()
  }
  handleChangeDone(event: any) {
    event.done = !event.done
    this.taskService.updateTasks(this.tasks)
  }
  handleRemove(event: any) {
    this.tasks = this.tasks.filter((task: Task) => {
      return event.id !== task.id
    })
    this.taskService.updateTasks(this.tasks)
  }
  handleAddNew(event: any) {
    if (this.tasks.length > 0) this.tasks.push({id: this.tasks[this.tasks.length - 1].id + 1, title: event.taskDesc, done: false})
    else this.tasks.push({id: 1, title: event.taskDesc, done: false})
    this.taskService.updateTasks(this.tasks)
  }
}