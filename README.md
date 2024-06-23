# Task Management Application
**Live Link**: [task-managment-mern-app.netlify.app](https://task-managment-mern-app.netlify.app/)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-17.0.2-blue)
![Node.js](https://img.shields.io/badge/node.js-14.17.0-green)
![Tailwind CSS](https://img.shields.io/badge/tailwind_css-2.2.19-blue)

## Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Front-End Development](#front-end-development)
- [Back-End Development](#back-end-development)
- [Deployment](#deployment)
- [Challenges Faced](#challenges-faced)
- [Future Improvements](#future-improvements)


## Project Overview

The Task Management Application is a user-friendly tool that allows users to create, read, update, and delete tasks. It showcases proficiency in both front-end and back-end development using the MERN stack.

**Key Features:**
- User-friendly interface for managing tasks.
- CRUD operations for tasks.
- Responsive design for various devices.

## Technology Stack

The project is built using the MERN stack consisting of:
- **MongoDB**: Database for storing tasks.
- **Express.js**: Backend framework.
- **React.js**: Frontend library.
- **Node.js**: Server environment.

Additional libraries used:
- **Material UI**: For implementing Google's Material Design.
- **NextUI**: For building accessible UI components.
- **React Icons**: For including icons.
- **SweetAlert2**: For creating beautiful alerts.
- **React Loader Spinner**: For adding loading spinners.
- **Tailwind CSS**: For utility-first CSS framework.

**Hosting Platforms:**
- **Netlify**: For hosting the front-end.
- **Render**: For hosting the back-end.

## Front-End Development

The front-end of the application was developed using React.

**Key features include:**
- **Landing Page**: Displays a list of all tasks.
- **Add New Task**: Users can add new tasks with a title, description, and due date.
- **Task Details**: Users can view detailed information for each task.
- **Edit Task**: Users can edit existing tasks.
- **Delete Task**: Users can delete tasks.
- **Responsive Design**: Ensures usability on both desktop and mobile devices.
- **Alerts**: SweetAlert2 for beautiful and customizable alerts.
- **Loading Spinners**: React Loader Spinner for displaying loading indicators.
- **Styling**: Tailwind CSS for efficient and responsive styling.

**Libraries used:**
- **Material UI**: For comprehensive UI components.
- **NextUI**: For additional UI components and styling.
- **React Icons**: For including icons in the application.
- **SweetAlert2**: For creating alerts and pop-ups.
- **React Loader Spinner**: For adding loading spinners.
- **Tailwind CSS**: For utility-first CSS framework.

## Back-End Development

The back-end was developed using Node.js and Express.js. It includes a RESTful API with the following endpoints:

- `GET /tasks`: Retrieve all tasks.
- `POST /tasks`: Create a new task.
- `GET /tasks/:id`: Retrieve a task by ID.
- `PUT /tasks/:id`: Update a task by ID.
- `DELETE /tasks/:id`: Delete a task by ID.

**Key points:**
- **Data Validation**: Ensured through middleware.
- **Error Handling**: Comprehensive error handling for all endpoints.
- **Security**: Basic security measures implemented.
- **Deployment**: Hosted on Render for the backend.

## Deployment

The application is deployed using:

- **Netlify**: For hosting the front-end.
  - Provides continuous deployment from the GitHub repository.
  - Handles the front-end build process and serves the static files.

- **Render**: For hosting the back-end.
  - Handles the deployment of the Express server.
  - Connects to MongoDB for database operations.

**Live Link**: [Task Management Application](https://task-managment-mern-app.netlify.app/)

**GitHub Link**: [GitHub Repository](https://github.com/vipulkumar6/task-management-application)


## Challenges Faced

During the development of the Task Management Application, several challenges were encountered and overcome:
- **Integrating Material UI, NextUI, and Tailwind CSS**: Ensuring consistent design and compatibility between different UI libraries and frameworks.
- **State Management**: Managing the state efficiently between components and ensuring smooth data flow.
- **Responsive Design**: Creating a responsive design that works well on both desktop and mobile devices.
- **Deployment Issues**: Ensuring the front-end and back-end communicate effectively when deployed on separate platforms.
- **Error Handling**: Implementing comprehensive error handling on both the client and server sides.

## Future Improvements

To enhance the functionality and user experience of the Task Management Application, the following improvements are planned:
- **User Authentication**: Implement user authentication to secure tasks.
- **Search and Filter**: Add search and filter functionality to easily find tasks.
- **Notifications**: Integrate notifications to remind users of due tasks.
- **Enhanced Validation**: Improve validation and error handling on both client and server sides.
- **User Interface Enhancements**: Further refine the user interface for better usability and aesthetics.

