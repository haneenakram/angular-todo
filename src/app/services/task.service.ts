// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskCreate, TaskUpdate } from '../models/task.interface';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.apiUrl + '/api/tasks/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // Get all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Get single task
  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}${id}/`);
  }

  // Create new task
  createTask(task: TaskCreate): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, this.httpOptions);
  }

  // Update task
  updateTask(id: number, task: TaskUpdate): Observable<Task> {
    return this.http.patch<Task>(
      `${this.apiUrl}${id}/`,
      task,
      this.httpOptions
    );
  }

  // Delete task
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`, this.httpOptions);
  }

  // Toggle task completion - returns updated task
  toggleTaskCompletion(task: Task): Observable<Task> {
    if (!task.id) {
      throw new Error('Task ID is required');
    }

    const updateData: TaskUpdate = {
      completed: !task.completed,
      status: !task.completed ? 'C' : 'P', // Completed or Pending
    };

    return this.updateTask(task.id, updateData);
  }

  // Update task status - returns updated task
  updateTaskStatus(
    task: Task,
    status: 'P' | 'I' | 'C' | 'H'
  ): Observable<Task> {
    if (!task.id) {
      throw new Error('Task ID is required');
    }

    const updateData: TaskUpdate = {
      status: status,
      completed: status === 'C',
    };

    return this.updateTask(task.id, updateData);
  }

  // Get tasks with specific status
  getTasksByStatus(status: 'P' | 'I' | 'C' | 'H'): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}?status=${status}`);
  }

  // Get completed tasks
  getCompletedTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}?completed=true`);
  }

  // Get active (non-completed) tasks
  getActiveTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}?completed=false`);
  }

  // Get task statistics (if you enabled the stats endpoint in Django)
  getStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}stats/`);
  }
}
