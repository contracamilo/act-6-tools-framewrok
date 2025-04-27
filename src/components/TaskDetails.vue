<script setup lang="ts">
import type { Task } from '../types/Task';
import { TaskStatusLabels, TaskPriorityLabels, TaskStatusColors, TaskPriorityColors } from '../types/Task';

defineProps<{
  task: Task
}>();
</script>

<template>
  <div class="task-details">
    <div class="mb-3">
      <strong>Status:</strong>
      <span :class="['badge', TaskStatusColors[task.status]]">
        {{ TaskStatusLabels[task.status] }}
      </span>
    </div>
    <div class="mb-3">
      <strong>Priority:</strong>
      <span :class="['badge', TaskPriorityColors[task.priority]]">
        {{ TaskPriorityLabels[task.priority] }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.task-details {
  padding: 1rem;
}

.badge {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  margin-left: 0.5rem;
  color: white;
}
</style> 