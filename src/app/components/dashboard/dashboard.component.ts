import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tasks: Task[] = [];
  columns = 2;

  layoutChanges: Observable<BreakpointState>;

  constructor(
    private api: TaskService,
    private authApi: AuthService,
    private router: Router,
    private bo: BreakpointObserver) {
    this.layoutChanges = this.bo.observe([Breakpoints.Small, Breakpoints.Medium, Breakpoints.XSmall]);

  }

  ngOnInit() {
    this.layoutChanges?.subscribe(result => {
       if (result.breakpoints[Breakpoints.XSmall]) {
         this.columns = 1;
       } else if (result.breakpoints[Breakpoints.Small]) {
         this.columns = 2;
       } else {
         this.columns = 3;
       }
     });
    this.api.getTasks()
      .subscribe({
        next: tasks => { this.tasks = tasks; },
        error: error => console.error(error)
      });
  }

  getLoggedUser(): string {
    return `${localStorage.getItem('nome')} ${localStorage.getItem('cognome')}`;
  }

  logout(): void {
    this.authApi.logout()
    .subscribe(response => {
      if(response.esito) {
        this.router.navigateByUrl("/");
        localStorage.clear();
      }
    })
  }
}
