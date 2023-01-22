import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError, catchError, retry } from "rxjs"

import { Task } from "./models/task.interface";

const TASKS_API: string = '/assets/tasks'

@Injectable()
export class TaskDashboardService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http.get(TASKS_API)
    }
}