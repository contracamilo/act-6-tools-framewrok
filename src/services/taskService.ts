import type { Task, TaskPriority, TaskStatus } from '../types/Task';
import { v4 as uuidv4 } from 'uuid';

// Mock data
let tasks: Task[] = [
  {
    id: '1',
    title: 'Complete Project Documentation',
    description: 'Write comprehensive documentation for the current project',
    dueDate: new Date('2024-05-01'),
    priority: 'high' as TaskPriority,
    status: 'pending' as TaskStatus,
    userId: 'user1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'Review Pull Requests',
    description: 'Review and merge pending pull requests',
    dueDate: new Date('2024-04-30'),
    priority: 'medium' as TaskPriority,
    status: 'in-progress' as TaskStatus,
    userId: 'user1',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const taskService = {
  // Get all tasks
  getAllTasks: (userId: string): Promise<Task[]> => {
    return Promise.resolve(tasks.filter(task => task.userId === userId));
  },

  // Get task by id
  getTaskById: (taskId: string): Promise<Task | undefined> => {
    return Promise.resolve(tasks.find(task => task.id === taskId));
  },

  // Create new task
  createTask: (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    tasks.push(newTask);
    return Promise.resolve(newTask);
  },

  // Update task
  updateTask: (taskId: string, taskData: Partial<Task>): Promise<Task | undefined> => {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) return Promise.resolve(undefined);

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...taskData,
      updatedAt: new Date()
    };
    return Promise.resolve(tasks[taskIndex]);
  },

  // Delete task
  deleteTask: (taskId: string): Promise<boolean> => {
    const initialLength = tasks.length;
    tasks = tasks.filter(task => task.id !== taskId);
    return Promise.resolve(tasks.length !== initialLength);
  },

  // Search tasks
  searchTasks: (userId: string, query: string): Promise<Task[]> => {
    const searchResults = tasks.filter(task => 
      task.userId === userId && 
      (task.title.toLowerCase().includes(query.toLowerCase()) || 
       task.description.toLowerCase().includes(query.toLowerCase()))
    );
    return Promise.resolve(searchResults);
  },

  // Filter tasks
  filterTasks: (
    userId: string,
    status?: TaskStatus,
    priority?: TaskPriority
  ): Promise<Task[]> => {
    let filteredTasks = tasks.filter(task => task.userId === userId);

    if (status) {
      filteredTasks = filteredTasks.filter(task => task.status === status);
    }

    if (priority) {
      filteredTasks = filteredTasks.filter(task => task.priority === priority);
    }

    return Promise.resolve(filteredTasks);
  }
}; 