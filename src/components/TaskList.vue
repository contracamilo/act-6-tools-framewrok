<!-- src/components/TaskList.vue -->
<template>
  <div class="task-list">
    <!-- Filtros -->
    <div class="filters">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar tareas..."
        class="search-input"
      />
      <select v-model="statusFilter" class="filter-select">
        <option value="">Todos los estados</option>
        <option value="pending">{{ TaskStatusLabels.pending }}</option>
        <option value="in_progress">{{ TaskStatusLabels.in_progress }}</option>
        <option value="completed">{{ TaskStatusLabels.completed }}</option>
        <option value="cancelled">{{ TaskStatusLabels.cancelled }}</option>
      </select>
      <select v-model="priorityFilter" class="filter-select">
        <option value="">Todas las prioridades</option>
        <option value="low">{{ TaskPriorityLabels.low }}</option>
        <option value="medium">{{ TaskPriorityLabels.medium }}</option>
        <option value="high">{{ TaskPriorityLabels.high }}</option>
      </select>
    </div>

    <!-- Lista de Tareas -->
    <div class="tasks-container">
      <div v-if="taskStore.loading" class="loading">
        <div class="spinner"></div>
        Cargando tareas...
      </div>
      <div v-else-if="taskStore.error" class="error">
        {{ taskStore.error }}
      </div>
      <div v-else-if="filteredTasks.length === 0" class="no-tasks">
        No se encontraron tareas
      </div>
      <div v-else class="tasks-grid">
        <div
          v-for="task in filteredTasks"
          :key="task.id"
          class="task-card"
          :class="[`priority-${task.priority}`, `status-${task.status}`]"
        >
          <div class="task-header">
            <h3>{{ task.title }}</h3>
            <div class="task-badges">
              <span 
                class="priority-badge" 
                :style="{ backgroundColor: TaskPriorityColors[task.priority] + '20', color: TaskPriorityColors[task.priority] }"
              >
                {{ TaskPriorityLabels[task.priority] }}
              </span>
              <span 
                class="status-badge" 
                :style="{ backgroundColor: TaskStatusColors[task.status] + '20', color: TaskStatusColors[task.status] }"
              >
                {{ TaskStatusLabels[task.status] }}
              </span>
            </div>
          </div>
          <p class="task-description">{{ task.description }}</p>
          <div class="task-meta">
            <span>Vence: {{ formatDate(task.dueDate) }}</span>
          </div>
          <div class="task-actions">
            <button
              @click="editTask(task)"
              class="btn-edit"
            >
              Editar
            </button>
            <button
              @click="deleteTask(task.id)"
              class="btn-delete"
            >
              Eliminar
            </button>
            <button
              v-if="task.status !== 'completed'"
              @click="markAsCompleted(task)"
              class="btn-complete"
            >
              Completar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useTaskStore } from '../stores/taskStore';
import type { Task, TaskPriority, TaskStatus } from '../types/Task';
import { TaskStatusLabels, TaskPriorityLabels, TaskStatusColors, TaskPriorityColors } from '../types/Task';

const taskStore = useTaskStore();
const searchQuery = ref('');
const statusFilter = ref('');
const priorityFilter = ref('');

// Inicializar tareas
onMounted(async () => {
  await taskStore.fetchTasks('user1');
});

// Propiedad computada para tareas filtradas
const filteredTasks = computed(() => {
  return taskStore.filteredTasks;
});

// Formatear fecha
const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Obtener etiquetas en español
const getPriorityLabel = (priority: TaskPriority) => {
  const labels = {
    low: 'Baja',
    medium: 'Media',
    high: 'Alta'
  };
  return labels[priority];
};

const getStatusLabel = (status: TaskStatus) => {
  const labels = {
    pending: 'Pendiente',
    'in-progress': 'En progreso',
    completed: 'Completada'
  };
  return labels[status];
};

// Acciones de tareas
const editTask = (task: Task) => {
  taskStore.setSelectedTask(task);
};

const deleteTask = async (taskId: string) => {
  if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
    await taskStore.deleteTask(taskId);
  }
};

const markAsCompleted = async (task: Task) => {
  await taskStore.updateTask(task.id, {
    status: 'completed',
    updatedAt: new Date()
  });
};

// Observar filtros
watch([searchQuery, statusFilter, priorityFilter], ([newSearch, newStatus, newPriority]) => {
  taskStore.setFilters({
    searchQuery: newSearch,
    status: newStatus || null,
    priority: newPriority || null
  });
});
</script>

<style scoped>
.task-list {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  background-color: #f8fafc;
  min-height: 100vh;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-input,
.filter-select {
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  min-width: 200px;
  flex: 1;
}

@media (min-width: 768px) {
  .search-input {
    flex: 2;
  }
  
  .filter-select {
    flex: 1;
  }
}

.search-input:focus,
.filter-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.task-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #e2e8f0;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.task-card h3 {
  color: #1e293b;
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
}

.task-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.priority-badge,
.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.task-description {
  color: #64748b;
  margin-bottom: 1rem;
  line-height: 1.5;
  font-size: 0.975rem;
}

.task-meta {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 1.5rem;
}

.task-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-edit {
  background: #3b82f6;
  color: white;
}

.btn-edit:hover {
  background: #2563eb;
}

.btn-delete {
  background: #ef4444;
  color: white;
}

.btn-delete:hover {
  background: #dc2626;
}

.btn-complete {
  background: #10b981;
  color: white;
}

.btn-complete:hover {
  background: #059669;
}

.loading,
.error,
.no-tasks {
  text-align: center;
  padding: 3rem;
  color: #64748b;
  font-size: 1.125rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.error {
  color: #ef4444;
  border-color: #fecaca;
  background-color: #fee2e2;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 640px) {
  .task-list {
    padding: 1rem;
  }

  .task-actions {
    flex-direction: column;
  }

  button {
    width: 100%;
  }
}
</style> 