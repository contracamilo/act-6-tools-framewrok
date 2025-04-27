# Administrador de Tareas

Una aplicación web moderna para la gestión de tareas desarrollada con Vue.js 3, TypeScript y Pinia para el manejo del estado.

Demo.

https://github.com/user-attachments/assets/6cd211aa-cabb-4fdc-8160-fc195a042108


## 🚀 Características

- Crear, editar, eliminar y marcar tareas como completadas
- Filtrar tareas por estado y prioridad
- Búsqueda de tareas por título o descripción
- Interfaz de usuario intuitiva y responsive
- Gestión del estado con Pinia
- Tipado fuerte con TypeScript
- Enrutamiento con Vue Router

## 🛠️ Tecnologías Utilizadas

- Vue.js 3 con Composition API
- TypeScript
- Pinia para gestión del estado
- Vue Router para navegación
- Vite como bundler
- ESLint + Prettier para formateo de código

## 📦 Estructura del Proyecto

```
src/
├── assets/          # Recursos estáticos
├── components/      # Componentes Vue
│   ├── TaskList.vue    # Lista de tareas
│   ├── TaskForm.vue    # Formulario de tareas
│   └── TaskDetails.vue # Detalles de tarea
├── router/          # Configuración de rutas
├── services/        # Servicios y APIs
├── stores/          # Stores de Pinia
├── types/           # Tipos TypeScript
└── views/           # Vistas/Páginas
```

## 🧩 Componentes Principales

### TasksView (Vista Principal)

- Componente principal que actúa como contenedor
- Maneja la navegación y el estado global de la aplicación
- Gestiona el modal para crear/editar tareas
- Ubicación: `src/views/TasksView.vue`

### TaskList

- Muestra la lista de tareas en un grid responsive
- Implementa filtros por estado y prioridad
- Permite búsqueda de tareas
- Muestra badges de estado y prioridad con colores distintivos
- Ubicación: `src/components/TaskList.vue`

### TaskForm

- Formulario para crear y editar tareas
- Validación de campos requeridos
- Selector de prioridad y estado
- Selector de fecha de vencimiento
- Ubicación: `src/components/TaskForm.vue`

### TaskDetails

- Muestra información detallada de una tarea
- Visualización de estado y prioridad con badges coloridos
- Ubicación: `src/components/TaskDetails.vue`

## 🗄️ Gestión del Estado

El estado de la aplicación se maneja con Pinia a través del store `taskStore` que incluye:

- Lista de tareas
- Filtros activos
- Estado de carga y errores
- Tarea seleccionada
- Acciones para CRUD de tareas

## 🎨 Diseño UI/UX

- Diseño moderno y minimalista
- Sistema de colores para estados y prioridades
- Interfaz responsive que se adapta a diferentes dispositivos
- Feedback visual para acciones del usuario
- Modales para formularios
- Animaciones suaves para mejor experiencia de usuario

## 🚦 Estados de Tareas

- Pendiente
- En Progreso
- Completada
- Cancelada

## ⚡ Niveles de Prioridad

- Alta
- Media
- Baja

## 🛠️ Instalación y Uso

1. Clonar el repositorio:

```bash
git clone [url-del-repositorio]
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar en desarrollo:

```bash
npm run dev
```

4. Construir para producción:

```bash
npm run build
```

## 🧪 Testing

El proyecto incluye tests unitarios que se pueden ejecutar con:

```bash
npm run test
```

## 📝 Convenciones de Código

- Uso de TypeScript para tipo seguro
- Composition API con `<script setup>`
- Nombres de componentes en PascalCase
- Props y eventos en camelCase
- Estilos scoped para encapsulamiento

## 🤝 Contribuir

1. Fork del repositorio
2. Crear una rama para tu feature
3. Commit de tus cambios
4. Push a la rama
5. Crear un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
