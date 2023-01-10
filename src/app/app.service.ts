import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError, retry, map } from 'rxjs/operators'

const TASKS_API: string = '/api/tasks'

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {}
}