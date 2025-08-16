import { Component } from '@angular/core';
import { TaskComponent } from './components/task/task.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';  

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet], //TaskComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // template: ` <router-outlet></router-outlet> `,
})
export class AppComponent {
  title = 'todo-app';
}
