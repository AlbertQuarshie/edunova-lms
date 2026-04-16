# EduNova LMS

---

## A. Contributor

- **Albert Junior Quarshie**

## B. Overview

**EduNova** is a premium, AI-integrated Learning Management System (LMS)
designed to bridge the gap between static content and interactive
education.

- It provides students with a dynamic environment to learn and interact
  with an AI tutor, while giving administrators powerful, paginated tools
  to manage curriculum and student enrollments in real time.

- Built with a focus on high-performance architecture and a modern,
  utility-first design approach.

---

## C. Installation

- Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/AlbertQuarshie/edunova-lms.git
cd edunova-lms
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following:

    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_GEMINI_API_KEY=your_google_gemini_key

### 4. Initialize Firebase

- Make sure the following are enabled in your Firebase console:
- Firestore Database
- Authentication

---

## D. Usage

- Start the development server:

```bash
npm run dev
```

### 1. Student View

- Navigate to `/dashboard`
- View enrolled courses
- Interact with the AI tutor

### 2. Admin View

- Access `/admin/manage-courses`
- Add, edit, and manage courses
- Navigate large datasets with pagination

---

## E. Features

### 1. AI-Powered Tutoring

- Integrated Google Gemini AI (`gemini-3.1-flash-lite-preview`) that answers student
  questions based strictly on the course catalog

### 3. Advanced Course Management

- Full CRUD operations with smooth pagination for large course libraries

### 4. Enrollment Registry

- Centralized admin system to approve or remove student enrollments

### 5. Real-Time Feedback System

- Custom toast notifications for responsive UI feedback

### 6. Fully Responsive Design

- Mobile-first interface built with Tailwind CSS and Lucide icons

---

## F. Tech Stack

| Layer     | Technology              |
| --------- | ----------------------- |
| Frontend  | React.js (Vite)         |
| Styling   | Tailwind CSS            |
| Icons     | Lucide React            |
| Database  | Firebase Firestore      |
| Auth      | Firebase Authentication |
| AI Engine | Google Gemini API       |

---
