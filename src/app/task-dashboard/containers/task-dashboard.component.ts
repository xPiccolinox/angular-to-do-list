import { Component, OnInit} from "@angular/core";
import { TaskDashboardService } from "../task-dashboard.service";
import { Task } from "../models/task.interface";

@Component({
  selector: 'task-dashboard',
  styleUrls: ['task-dashboard.component.scss'],
  template: `
    <div>
      <header>To do list</header>
      <div>Tasks:</div>
      <ol>
        <task-list
          *ngFor="let task of tasks"
          [task]="task"
          (done)="handleChangeDone($event)"
          (remove)="handleRemove($event)">
        </task-list>
      </ol>
      <task-form (addNew)="handleAddNew($event)"></task-form>
    </div>
  `
})

export class TaskDashboardComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private taskService: TaskDashboardService) {}
  ngOnInit() {
    this.taskService
      .getTasks()
      .subscribe((data: Task[]) => {
    //     console.log('Data', data)
        this.tasks = data
      })
  }
  handleChangeDone(event: any) {
    event.done = !event.done
  }
  handleRemove(event: any) {
    this.tasks = this.tasks.filter((task: Task) => {
      return event.id !== task.id
    })
  }
  handleAddNew(event: any) {
    if (this.tasks.length > 0) this.tasks.push({id: this.tasks[this.tasks.length - 1].id + 1, title: event.taskDesc, done: false})
    else this.tasks.push({id: 1, title: event.taskDesc, done: false})
  }
}


// <div>
//       <task-form></task-form>
//       <header>To do list</header>
//       <div>Tasks:</div>
//       <ol>
//         <li *ngFor="let task of tasks" class="task" [class.taskDone]="task.done">
//           {{ task.title }}
//           <button (click)="changeDone(task)"> Done </button>
//           <button (click)="handleRemove(task)"> Remove </button>
//         </li>
//       </ol>
//       <form 
//         (ngSubmit)="handleSubmit(form.value)"
//         #form="ngForm"
//         novalidate>
//         <input 
//           type="text"
//           name="taskDesc"
//           #taskDesc="ngModel"
//           ngModel
//           maxlength="30"
//           minlength="5"
//           placeholder="Create new task"
//           required />
//         <button type="submit" [disabled]="form.invalid">Add</button>
//         <div *ngIf="(taskDesc.errors?.['minlength'] || taskDesc.errors?.['required']) && taskDesc.dirty">
//           At least 5 characters required!
//         </div>
//       </form>
//     </div>

//     tasks: Task[] = [{
//       id: 1,
//       title: "Wash the dishes",
//       done: false
//     }, {
//       id: 2,
//       title: "Do the laundry",
//       done: true
//     }, {
//       id: 3,
//       title: "Buy some bread",
//       done: false
//     }]
  
//     handleSubmit(newTask: any) {
//       if (this.tasks.length > 0) this.tasks.push({id: this.tasks[this.tasks.length - 1].id + 1, title: newTask.taskDesc, done: false})
//       else this.tasks.push({id: 1, title: newTask.taskDesc, done: false})
//     }
//     changeDone(event: Task) {
//       event.done = !event.done
//     }
//     handleRemove(event: Task) {
//       this.tasks = this.tasks.filter((task: Task) => {
//         return event.id !== task.id
//       })
//     }