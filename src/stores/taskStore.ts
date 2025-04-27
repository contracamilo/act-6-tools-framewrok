import { defineStore } from 'pinia';
import type { Task, TaskStatus, TaskPriority } from '../types/Task';
import { taskService } from '../services/taskService';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  selectedTask: Task | null;
  filters: {
    status: TaskStatus | null;
    priority: TaskPriority | null;
    searchQuery: string;
  };
}

export const useTaskStore = defineStore('task', {
  state: (): TaskState => ({
    tasks: [],
    loading: false,
    error: null,
    selectedTask: null,
    filters: {
      status: null,
      priority: null,
      searchQuery: '',
    },
  }),

  getters: {
    filteredTasks: (state) => {
      let result = [...state.tasks];

      // Aplicar filtro de estado
      if (state.filters.status) {
        result = result.filter(task => task.status === state.filters.status);
      }

      // Aplicar filtro de prioridad
      if (state.filters.priority) {
        result = result.filter(task => task.priority === state.filters.priority);
      }

      // Aplicar búsqueda
      if (state.filters.searchQuery) {
        const query = state.filters.searchQuery.toLowerCase();
        result = result.filter(task =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
        );
      }

      return result;
    },

    tasksByStatus: (state) => {
      return (status: TaskStatus) => state.tasks.filter(task => task.status === status);
    },
  },

  actions: {
    async fetchTasks(userId: string) {
      this.loading = true;
      this.error = null;
      try {
        this.tasks = await taskService.getAllTasks(userId);
      } catch (error) {
        this.error = 'Error al cargar las tareas';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) {
      this.loading = true;
      this.error = null;
      try {
        const newTask = await taskService.createTask(taskData);
        this.tasks.push(newTask);
      } catch (error) {
        this.error = 'Error al crear la tarea';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async updateTask(taskId: string, taskData: Partial<Task>) {
      this.loading = true;
      this.error = null;
      try {
        const updatedTask = await taskService.updateTask(taskId, taskData);
        if (updatedTask) {
          const index = this.tasks.findIndex(task => task.id === taskId);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
          }
        }
      } catch (error) {
        this.error = 'Error al actualizar la tarea';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async deleteTask(taskId: string) {
      this.loading = true;
      this.error = null;
      try {
        const success = await taskService.deleteTask(taskId);
        if (success) {
          this.tasks = this.tasks.filter(task => task.id !== taskId);
        }
      } catch (error) {
        this.error = 'Error al eliminar la tarea';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    setFilters(filters: Partial<TaskState['filters']>) {
      this.filters = { ...this.filters, ...filters };
    },

    clearFilters() {
      this.filters = {
        status: null,
        priority: null,
        searchQuery: '',
      };
    },

    setSelectedTask(task: Task | null) {
      this.selectedTask = task;
    },
  },
}); 