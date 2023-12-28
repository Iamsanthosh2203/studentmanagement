# Student Management API - Express

This documentation provides information about the Student Management System API, which is built using ExpressJS and MongoDB Atlas. The system includes both an Admin Panel and a Student Interface.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Features](#features)
3.  [Setup](#setup)
4.  [Endpoints](#endpoints)
5.  [Environment Variables](#environment-variables)
6.  [Sample Examples](#sample-examples)
7.  [Additional Notes](#additional-notes)

## Project Overview

The Student Management System API is designed to manage student-related tasks. It consists of two main components: the Admin Panel and the Student Interface. The system allows administrators to log in, add students, assign tasks, while students can log in, view assigned tasks, and update task statuses.


## Features

### Admin Panel

1.  Admin Login
2.  Add Students (Name, Email ID, Department, Password)
3.  Assign Tasks to Students with Due Time


### Student Interface

1.  Student Login
2.  View Assigned Tasks
3.  Check Task Status (Pending, Overdue, Completed)
4.  Update Task Status to Completed

## Setup

1.  Clone the repository.
2.  Install dependencies using `npm install`.
3.  Set up a MongoDB Atlas account and obtain the connection string.
4.  Create a `.env` file and add the necessary environment variables (see [Environment Variables](https://chat.openai.com/c/74908359-d3ad-43b2-a13f-9ac03f2614b6#environment-variables)).
5.  Run the application using `npm start` or `nodemon start app`

## Endpoints

-   Admin Panel Endpoints:
    
    -   `POST /admin/login`: Admin login
    -   `POST /admin/add-student`: Add a new student
    -   `POST /admin/assign-task`: Assign a task to a student
-   Student Interface Endpoints:
    
    -   `POST /student/login`: Student login
    -   `GET /student/tasks`: Get assigned tasks
    -   `PATCH /student/update-task-status/:taskId`: Update task status to Completed
  
Certainly! In order to enhance security, JWT (JSON Web Token) authentication can be implemented for both the admin and student login. Below are the modifications to the documentation to reflect this security enhancement:

## JWT TOKEN LOGIN

### Admin Panel

1.  **Admin Login with JWT**
    -   Admin login with email and password will provide a JWT token.
    -   Admin can use the JWT token for subsequent requests (limited period).

### Student Interface

1.  **Student Login with JWT**
    -   Students can log in using their email and password.
    -   Upon successful login, a JWT token is generated and should be used for further authentication.

## Environment Variables

-   `PORT`: Port number for the server.
-   `MONGODB_URI`: MongoDB Atlas connection string.
-   `ADMIN_EMAIL`: Admin email address (e.g., admin@admin.com).
-   `ADMIN_PASSWORD`: Admin password.

## Sample Examples

### Admin Login (POST /admin/login)

**Request:**

jsonCopy code

`{
  "email": "admin@admin.com",
  "password": "admin"
}`

**Response:**

jsonCopy code

`{
  "message": "Admin logged in successfully",
  "token": "example_token"
}` 

### Add Student (POST /admin/add-student)

**Request:**

jsonCopy code

`{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "department": "Computer Science",
  "password": "student123"
}` 

**Response:**

jsonCopy code

`{
  "message": "Student added successfully",
  "student": {
    "id": "example_id",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "department": "Computer Science"
  }
}` 

## Additional Notes

-   The API does not use session cookies for authentication.
-   HTML is not used; requests and responses are in JSON format.
-   The `.gitignore` file is not included.
-   MongoDB Atlas is used for database storage.


## Contact

LinkedIn : https://www.linkedin.com/in/iamsanthosh2203/
Gmail : mailto:iamsanthosh2203@gmail.com
Number : +91 63748 86129
