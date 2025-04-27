<!-- src/components/TaskForm.vue -->
<template>
  <div class="task-form">
    <h2>{{ isEditing ? 'Editar Tarea' : 'Crear Nueva Tarea' }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Título</label>
        <input
          id="title"
          v-model="formData.title"
          type="text"
          required
          placeholder="Ingrese el título de la tarea"
        />
      </div>

      <div class="form-group">
        <label for="description">Descripción</label>
        <textarea
          id="description"
          v-model="formData.description"
          required
          placeholder="Ingrese la descripción de la tarea"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="dueDate">Fecha de vencimiento</label>
        <input
          id="dueDate"
          v-model="formData.dueDate"
          type="date"
          required
        />
      </div>

      <div class="form-group">
        <label for="priority">Prioridad</label>
        <select
          id="priority"
          v-model="formData.priority"
          required
        >
          <option value="low">{{ TaskPriorityLabels.low }}</option>
          <option value="medium">{{ TaskPriorityLabels.medium }}</option>
          <option value="high">{{ TaskPriorityLabels.high }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="status">Estado</label>
        <select
          id="status"
          v-model="formData.status"
          required
        >
          <option value="pending">{{ TaskStatusLabels.pending }}</option>
          <option value="in_progress">{{ TaskStatusLabels.in_progress }}</option>
          <option value="completed">{{ TaskStatusLabels.completed }}</option>
          <option value="cancelled">{{ TaskStatusLabels.cancelled }}</option>
        </select>
      </div>

      <div class="form-actions">
        <button
          type="button"
          class="btn-cancel"
          @click="cancel"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="btn-submit"
        >
          {{ isEditing ? 'Actualizar Tarea' : 'Crear Tarea' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useTaskStore } from '../stores/taskStore';
import type { Task, TaskPriority, TaskStatus } from '../types/Task';
import { TaskStatusLabels, TaskPriorityLabels } from '../types/Task';

const props = defineProps<{
  taskId?: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const taskStore = useTaskStore();

const isEditing = computed(() => !!props.taskId);

const formData = ref({
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium' as TaskPriority,
  status: 'pending' as TaskStatus,
});

// Initialize form if editing
onMounted(() => {
  if (props.taskId) {
    const task = taskStore.tasks.find(t => t.id === props.taskId);
    if (task) {
      formData.value = {
        title: task.title,
        description: task.description,
        dueDate: new Date(task.dueDate).toISOString().split('T')[0],
        priority: task.priority,
        status: task.status,
      };
    }
  }
});

const handleSubmit = async () => {
  try {
    if (isEditing.value && props.taskId) {
      await taskStore.updateTask(props.taskId, {
        ...formData.value,
        dueDate: new Date(formData.value.dueDate),
        updatedAt: new Date(),
      });
    } else {
      await taskStore.createTask({
        ...formData.value,
        dueDate: new Date(formData.value.dueDate),
        userId: 'user1', // In a real app, get from auth store
      });
    }
    emit('close');
  } catch (error) {
    console.error('Failed to save task:', error);
  }
};

const cancel = () => {
  emit('close');
};
</script>

<style scoped>
.task-form {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

input,
textarea,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}

.btn-submit {
  background: #007bff;
  color: white;
}

.btn-cancel {
  background: #6c757d;
  color: white;
}

.btn-submit:hover {
  background: #0056b3;
}

.btn-cancel:hover {
  background: #5a6268;
}
</style> 