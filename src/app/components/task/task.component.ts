import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task, FilterType } from '../../models/task.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TaskComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  newTaskText: string = '';
  currentFilter: FilterType = 'all';
  private tasksSubscription?: Subscription;
  private subscriptions: Subscription[] = [];
  isLoading = false;

  statusOptions = [
    { value: 'P', label: 'Pending', emoji: '⏳' },
    { value: 'I', label: 'In Progress', emoji: '🚀' },
    { value: 'C', label: 'Completed', emoji: '✅' },
    { value: 'H', label: 'On Hold', emoji: '⏸️' },
  ];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // Subscribe to tasks from the service
    // this.taskService.getTasks().subscribe(
    //  {next: (tasks) => {
    //     this.tasks = tasks;
    //     this.isLoading = false;
    //   },
    //   error: (error) => {
    //     console.error('Error loading tasks:', error);
    //     this.isLoading = false;
    //   }}
    // );
    this.loadTasks();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
  // Load all tasks
  loadTasks(): void {
    this.isLoading = true;
    const sub = this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.isLoading = false;
        // Fallback to demo data if needed
        this.tasks = [
          {
            id: 1,
            title: 'Task 1 fallback',
            completed: false,
            status: 'P',
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            title: 'Task 2 fallback',
            completed: false,
            status: 'P',
            created_at: new Date().toISOString(),
          },
        ];
      },
    });
    this.subscriptions.push(sub);
  }

  // Add new task
  addTask(): void {
    const trimmedText = this.newTaskText.trim();
    if (trimmedText) {
      this.isLoading = true;

      const newTask = {
        title: trimmedText,
        completed: false,
        status: 'P' as const,
      };

      const sub = this.taskService.createTask(newTask).subscribe({
        next: (createdTask) => {
          this.tasks = [...this.tasks, createdTask];
          this.newTaskText = '';
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error creating task:', error);
          this.isLoading = false;
        },
      });
      this.subscriptions.push(sub);
    }
  }
  // Enter key press
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.addTask();
    }
  }

  toggleTask(task: Task): void {
    const sub = this.taskService.toggleTaskCompletion(task).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex((t) => t.id === task.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
      },
      error: (error) => {
        console.error('Error toggling task:', error);
      },
    });
    this.subscriptions.push(sub);
  }

  // Delete task
  // deleteTask(task: Task): void {
  //   if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
  //     this.taskService.removeTask(task);
  //   }
  // }
  deleteTask(task: Task): void {
    if (
      task.id &&
      confirm(`Are you sure you want to delete "${task.title}"?`)
    ) {
      const sub = this.taskService.deleteTask(task.id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter((t) => t.id !== task.id);
        },
        error: (error) => {
          console.error('Error deleting task:', error);
        },
      });
      this.subscriptions.push(sub);
    }
  }

  // Update task status
  // updateTaskStatus(task: Task, status: 'P' | 'I' | 'C' | 'H'): void {
  //   this.taskService.updateTaskStatus(task, status);
  // }
  updateTaskStatus(task: Task, status: 'P' | 'I' | 'C' | 'H'): void {
    const sub = this.taskService.updateTaskStatus(task, status).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex((t) => t.id === task.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
      },
      error: (error) => {
        console.error('Error updating task status:', error);
      },
    });
    this.subscriptions.push(sub);
  }

  setFilter(filter: FilterType): void {
    this.currentFilter = filter;
  }

  getFilteredTasks(): Task[] {
    switch (this.currentFilter) {
      case 'active':
        return this.tasks.filter((task) => !task.completed);
      case 'completed':
        return this.tasks.filter((task) => task.completed);
      case 'pending':
        return this.tasks.filter((task) => task.status === 'P');
      case 'in-progress':
        return this.tasks.filter((task) => task.status === 'I');
      case 'on-hold':
        return this.tasks.filter((task) => task.status === 'H');
      default:
        return this.tasks;
    }
  }

  // Statistics methods (calculated from local tasks)
  getTotalTasks(): number {
    return this.tasks.length;
  }

  getCompletedTasks(): number {
    return this.tasks.filter((task) => task.completed).length;
  }

  getRemainingTasks(): number {
    return this.tasks.filter((task) => !task.completed).length;
  }

  getPendingTasks(): number {
    return this.tasks.filter((task) => task.status === 'P').length;
  }

  getInProgressTasks(): number {
    return this.tasks.filter((task) => task.status === 'I').length;
  }

  getOnHoldTasks(): number {
    return this.tasks.filter((task) => task.status === 'H').length;
  }

  // TrackBy function for performance
  trackByTaskId(index: number, task: Task): number | undefined {
    return task.id;
  }

  // Get status emoji
  getStatusEmoji(status: string): string {
    const statusOption = this.statusOptions.find(
      (option) => option.value === status
    );
    return statusOption ? statusOption.emoji : '📝';
  }

  // Get formatted date
  getFormattedDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  // // Refresh tasks
  // refreshTasks(): void {
  //   this.loadTasks();
  // }
}
