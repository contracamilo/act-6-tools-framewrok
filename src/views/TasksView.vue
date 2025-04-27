<!-- src/views/TasksView.vue -->
<template>
  <div class="tasks-view">
    <header class="header">
      <h1>Administrador de Tareas</h1>
      <button
        class="btn-new-task"
        @click="showTaskForm = true"
      >
        Nueva Tarea
      </button>
    </header>

    <!-- Task List Component -->
    <TaskList />

    <!-- Task Form Modal -->
    <div
      v-if="showTaskForm"
      class="modal-overlay"
      @click="closeTaskForm"
    >
      <div
        class="modal-content"
        @click.stop
      >
        <TaskForm
          :task-id="selectedTaskId"
          @close="closeTaskForm"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import TaskList from '../components/TaskList.vue';
import TaskForm from '../components/TaskForm.vue';
import { useTaskStore } from '../stores/taskStore';

const taskStore = useTaskStore();
const showTaskForm = ref(false);
const selectedTaskId = ref<string | undefined>(undefined);

// Watch for selected task changes
watch(
  () => taskStore.selectedTask,
  (newTask) => {
    if (newTask) {
      selectedTaskId.value = newTask.id;
      showTaskForm.value = true;
    }
  }
);

const closeTaskForm = () => {
  showTaskForm.value = false;
  selectedTaskId.value = undefined;
  taskStore.setSelectedTask(null);
};
</script>

<style scoped>
.tasks-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.btn-new-task {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}

.btn-new-task:hover {
  background: #0056b3;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}
</style> 