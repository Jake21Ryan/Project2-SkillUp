# SkillUp — Mini Learning System (Next.js + MongoDB)

## Team Members
- AungHlaingHtwe(6612119) — https://github.com/cyon003
- Aung Myint Myat(6611906) — https://github.com/Jake21Ryan
- Lwin Htoo Aung(6612110) — https://github.com/lwinhtooaung781-ctrl

## Project Description
SkillUp is a mini learning platform built with **Next.js (App Router, JavaScript)** and **MongoDB**.  
It provides authentication, role-based access (admin/student), and REST API CRUD operations across 3 core entities:
- Users
- Courses
- Enrollments

The project is designed for VM deployment (no serverless requirement) and follows assignment constraints.

## Tech Stack
- Next.js 16 (App Router)
- React 19
- MongoDB + Mongoose
- JWT Auth (HttpOnly cookie)
- TailwindCSS
- Nginx + PM2 (for VM production)

## Roles and Permissions
### Student
- Register / Login
- View course catalog + search
- Enroll in courses
- View enrolled courses
- Unenroll from courses

### Admin
- Manage courses (Create / Read / Update / Delete)
- Manage users (Read / Update role / Delete)
- Manage enrollments (Read / Update progress / Delete)

## Data Models (3 CRUD Entities)
### 1) User
- Create: register student
- Read: admin list users
- Update: admin update user role
- Delete: admin delete user

### 2) Course
- Create: admin create course
- Read: authenticated users list/search courses
- Update: admin edit course
- Delete: admin delete course

### 3) Enrollment
- Create: student enroll in course
- Read: student own enrollments, admin all enrollments
- Update: admin update progress
- Delete: student unenroll / admin delete enrollment

## REST API Endpoints
### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/seed-admin` (one-time admin seed)

### Courses
- `GET /api/courses?q=`
- `POST /api/courses` (admin)
- `GET /api/courses/:id`
- `PUT /api/courses/:id` (admin)
- `DELETE /api/courses/:id` (admin)

### Users
- `GET /api/users` (admin)
- `PUT /api/users/:id` (admin)
- `DELETE /api/users/:id` (admin)

Note: legacy internal routes `/api/user` and `/api/user/:id` are also available.

### Enrollments
- `GET /api/enrollments`
- `POST /api/enrollments`
- `PUT /api/enrollments/:id`
- `DELETE /api/enrollments/:id`
