// src/app/models/task.interface.ts
export interface Task {
  id?: number;
  title: string;
  completed: boolean;
  status: 'P' | 'I' | 'C' | 'H';
  status_display?: string;
  created_at?: string;
  deadline?: string;
  comments?: string;
  description?: string;
  user?: number;
}

export interface TaskCreate {
  title: string;
  completed?: boolean;
  status?: 'P' | 'I' | 'C' | 'H';
  deadline?: string;
  comments?: string;
  description?: string;
}

export interface TaskUpdate {
  title?: string;
  completed?: boolean;
  status?: 'P' | 'I' | 'C' | 'H';
  deadline?: string;
  comments?: string;
  description?: string;
}

export type FilterType =
  | 'all'
  | 'active'
  | 'completed'
  | 'pending'
  | 'in-progress'
  | 'on-hold';
