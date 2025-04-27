export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate?: Date;
  priority: TaskPriority;
  status: TaskStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const TaskStatusLabels: Record<TaskStatus, string> = {
  pending: 'Pendiente',
  in_progress: 'En Progreso',
  completed: 'Completada',
  cancelled: 'Cancelada',
};

export const TaskPriorityLabels: Record<TaskPriority, string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
};

export const TaskStatusColors: Record<TaskStatus, string> = {
  pending: '#FFA500',      // Naranja
  in_progress: '#3498db',  // Azul
  completed: '#2ecc71',    // Verde
  cancelled: '#e74c3c',    // Rojo
};

export const TaskPriorityColors: Record<TaskPriority, string> = {
  low: '#95a5a6',     // Gris
  medium: '#f1c40f',  // Amarillo
  high: '#e74c3c',    // Rojo
}; 