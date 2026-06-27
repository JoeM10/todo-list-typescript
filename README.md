# Todo List TypeScript

A React and TypeScript task management application built with Vite. This project allows authenticated users to manage a task list through a dashboard, view detailed task information, create new tasks, edit existing tasks, update task status, and delete tasks.

The project was created to demonstrate task management features, TypeScript type safety, React state management, React Context API, React Router navigation, form validation, error handling, and Auth0 authentication.

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Project Requirements Covered](#project-requirements-covered)
* [Project Structure](#project-structure)
* [Installation](#installation)
* [Auth0 Setup](#auth0-setup)
* [Environment Variables](#environment-variables)
* [Running the Project](#running-the-project)
* [Available Scripts](#available-scripts)
* [Application Routes](#application-routes)
* [Architecture Overview](#architecture-overview)
* [TypeScript Implementation](#typescript-implementation)
* [Validation and Error Handling](#validation-and-error-handling)
* [Future Improvements](#future-improvements)

## Features

### Task Dashboard

The task dashboard provides a central place for users to manage their tasks.

Users can:

* View all existing tasks
* Open a detailed view for a selected task
* Navigate to the create task page
* Navigate to the edit task page
* Delete tasks
* View task status

### Task Details Display

Each task can be opened in a detailed view.

The task details section displays:

* Task ID
* Task title
* Task description
* Task status

The details view also allows users to:

* Update the task status
* Edit the full task
* Delete the task
* Close the details panel

### Task Creation Page

The create task page includes a reusable form for adding new tasks.

The form includes:

* Task title
* Task description
* Task status

Form validation prevents users from creating a task with missing required information.

### Task Editing Page

The edit task page reuses the same task form component as the create page.

When editing a task:

* The form loads the existing task information
* Users can update the title, description, and status
* The app handles invalid task IDs by showing a task not found message

### Authentication and Authorization

The application uses Auth0 for authentication.

Authentication features include:

* Login page
* Registration page
* Logout functionality
* Protected routes
* Profile page
* Authenticated user information display

Private task routes are protected so users must be logged in before accessing the dashboard, create task page, edit task page, or profile page.

### Global State Management

The project uses the React Context API to manage task state globally.

The task context provides:

* Task list state
* Create task function
* Update task function
* Delete task function
* Change task status function

This allows multiple pages and components to share task data without passing props through every level of the application.

## Tech Stack

* React
* TypeScript
* Vite
* React Router
* Auth0
* React Context API
* CSS
* Bootstrap / React Bootstrap
* ESLint

## Project Structure

```text
todo-list-typescript/
├── public/
├── src/
│   ├── components/
│   │   ├── LogoutButton.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── TaskDashboard.tsx
│   │   ├── TaskDetails.tsx
│   │   └── TaskForm.tsx
│   ├── context/
│   │   └── TaskContext.tsx
│   ├── pages/
│   │   ├── CreateTaskPage.tsx
│   │   ├── EditTaskPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── RegisterPage.tsx
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── types.ts
│   └── vite-env.d.ts
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Installation

Clone the repository:

```bash
git clone https://github.com/JoeM10/todo-list-typescript.git
```

Move into the project folder:

```bash
cd todo-list-typescript
```

Install dependencies:

```bash
npm install
```

## Auth0 Setup

This project uses Auth0 for authentication.

To run the project locally, create an Auth0 account and set up a Single Page Application.

In your Auth0 application settings, configure the following URLs.

### Allowed Callback URLs

```text
http://localhost:5173
```

### Allowed Logout URLs

```text
http://localhost:5173
```

### Allowed Web Origins

```text
http://localhost:5173
```

If Vite starts on a different port, such as `5174`, update the Auth0 URLs to match the exact local URL shown in your terminal.

## Environment Variables

Create a `.env` file in the root of the project.

```text
todo-list-typescript/
├── .env
├── package.json
└── src/
```

Add your Auth0 configuration:

```env
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
```

Example:

```env
VITE_AUTH0_DOMAIN=dev-example.us.auth0.com
VITE_AUTH0_CLIENT_ID=abc123ExampleClientId
```

Do not commit real secret values to GitHub.

The Auth0 domain and client ID are used by the frontend to connect the application to Auth0. They are referenced in `main.tsx` through `import.meta.env`.

## Running the Project

Start the development server:

```bash
npm run dev
```

Open the local development URL shown in the terminal.

Usually this is:

```text
http://localhost:5173
```

## Available Scripts

### Start Development Server

```bash
npm run dev
```

Runs the app locally using Vite.

### Build Project

```bash
npm run build
```

Runs the TypeScript build and creates a production-ready build using Vite.

### Run ESLint

```bash
npm run lint
```

Checks the project for linting issues.

### Preview Production Build

```bash
npm run preview
```

Previews the production build locally.

## Application Routes

| Route                 | Description                | Protected |
| --------------------- | -------------------------- | --------- |
| `/login`              | Login page                 | No        |
| `/register`           | Registration page          | No        |
| `/`                   | Task dashboard             | Yes       |
| `/tasks/new`          | Create task page           | Yes       |
| `/tasks/:taskId/edit` | Edit task page             | Yes       |
| `/profile`            | Authenticated user profile | Yes       |

## Architecture Overview

### `App.tsx`

`App.tsx` defines the main application routes using React Router.

It wraps protected pages with the `ProtectedRoute` component and wraps the application routes with `TaskProvider` so task data can be shared globally.

### `TaskContext.tsx`

`TaskContext.tsx` manages global task state using React Context API.

It stores the task list and provides functions for:

* Creating tasks
* Updating tasks
* Deleting tasks
* Updating task status

It also exports a custom hook called `useTaskContext`, which allows components to access the task context safely.

### `TaskDashboard.tsx`

`TaskDashboard.tsx` displays the main task list.

It allows users to:

* View task details
* Navigate to the create task page
* Navigate to the edit task page
* Delete tasks
* Access the profile page
* Log out

### `TaskDetails.tsx`

`TaskDetails.tsx` displays detailed information about one selected task.

It also allows users to update the task status, edit the task, delete the task, or close the details view.

### `TaskForm.tsx`

`TaskForm.tsx` is a reusable form component used by both the create task page and edit task page.

It manages form input state and validation errors with TypeScript types.

### `CreateTaskPage.tsx`

`CreateTaskPage.tsx` uses `TaskForm` to create a new task.

After successful submission, the user is redirected back to the dashboard.

### `EditTaskPage.tsx`

`EditTaskPage.tsx` uses the task ID from the URL to find the correct task.

If the task exists, its information is loaded into `TaskForm`.

If the task does not exist, the user sees a task not found message.

### `ProtectedRoute.tsx`

`ProtectedRoute.tsx` checks Auth0 authentication state before rendering private pages.

It handles:

* Authentication loading state
* Authentication errors
* Redirecting unauthenticated users to the login page

### `LoginPage.tsx`

`LoginPage.tsx` allows users to log in with Auth0.

If a user is already authenticated, they are redirected to the dashboard.

### `RegisterPage.tsx`

`RegisterPage.tsx` allows users to start the Auth0 sign-up flow.

### `ProfilePage.tsx`

`ProfilePage.tsx` displays authenticated user information from Auth0.

It may show:

* Name
* Email
* Nickname
* User ID
* Profile image

## TypeScript Implementation

The project uses TypeScript to define and enforce data shapes.

Important types include:

```ts
export type TaskStatus = "Not Started" | "In Progress" | "Completed";
```

`TaskStatus` limits task status values to only the allowed options.

```ts
export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}
```

`Task` defines the full shape of a task object.

```ts
export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
}
```

`TaskFormData` defines the shape of data used in the create and edit forms.

```ts
export interface TaskFormErrors {
  title?: string;
  description?: string;
}
```

`TaskFormErrors` defines optional validation errors for the task form.

```ts
export interface Auth0UserProfile {
  name?: string;
  email?: string;
  picture?: string;
  nickname?: string;
  sub?: string;
}
```

`Auth0UserProfile` defines the expected shape of Auth0 user data used by the profile page.

## Validation and Error Handling

The reusable task form validates required fields before submitting.

Validation rules include:

* Task title is required
* Task description is required

If validation fails, an error message is displayed under the related form field.

The project also includes error handling for:

* Invalid edit task routes
* Missing task data
* Auth0 loading states
* Auth0 authentication errors
* Unauthenticated users trying to access protected pages

## Auth0 Notes

If authentication fails with a callback URL error, confirm that the URL in your Auth0 settings exactly matches the URL Vite is using.

For example, if the terminal shows:

```text
http://localhost:5173
```

then Auth0 should include:

```text
http://localhost:5173
```

in:

* Allowed Callback URLs
* Allowed Logout URLs
* Allowed Web Origins

If the app runs on another port, update Auth0 to match that exact URL.

## Future Improvements

Possible future improvements include:

* Persisting tasks in local storage
* Connecting tasks to a backend API
* Saving tasks per authenticated user
* Adding due dates
* Adding task priority
* Adding task categories
* Adding search and filter functionality
* Adding drag-and-drop task ordering
* Improving mobile layout
* Adding unit tests

## Author

Created by Joseph McDaniel
GitHub: https://github.com/JoeM10/