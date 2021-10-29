import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task, TaskRequest } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasks(query = "", done?: boolean): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.apiUrl}/task`);
  }

  createTask(task: TaskRequest): Observable<{esito: boolean}> {
    return this.http.post<{esito: boolean}>(`${environment.apiUrl}/task`, task);
  }
}
