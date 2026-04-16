# 🎓 EduNova LMS

The Future of Intelligent Learning Management

------------------------------------------------------------------------

## Overview

**EduNova** is a premium, AI-integrated Learning Management System (LMS)
designed to bridge the gap between static content and interactive
education.

It provides students with a dynamic environment to learn and interact
with an AI tutor, while giving administrators powerful, paginated tools
to manage curriculum and student enrollments in real time.

Built with a focus on high-performance architecture and a modern,
utility-first design approach.

------------------------------------------------------------------------

## Installation

Follow these steps to set up the project locally:

### 1. Clone the Repository

``` bash
git clone https://github.com/AlbertQuarshie/edunova-lms.git
cd edunova-lms
```

### 2. Install Dependencies

``` bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following:

    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_GEMINI_API_KEY=your_google_gemini_key

### 4. Initialize Firebase

Make sure the following are enabled in your Firebase console: -
Firestore Database - Authentication

------------------------------------------------------------------------

## Usage

Start the development server:

``` bash
npm run dev
```

###  Student View

-   Navigate to `/dashboard`
-   View enrolled courses
-   Interact with the AI tutor

### Admin View

-   Access `/admin/manage-courses`
-   Add, edit, and manage courses
-   Navigate large datasets with pagination

------------------------------------------------------------------------

## Features

###  AI-Powered Tutoring

Integrated Google Gemini AI (`gemini-1.5-flash`) that answers student
questions based strictly on the course catalog

###  Advanced Course Management

Full CRUD operations with smooth pagination for large course libraries

###  Enrollment Registry

Centralized admin system to approve or remove student enrollments

###  Real-Time Feedback System

Custom toast notifications for responsive UI feedback

###  Fully Responsive Design

Mobile-first interface built with Tailwind CSS and Lucide icons

------------------------------------------------------------------------

##  Tech Stack

  Layer       Technology
  ----------- -------------------------
  Frontend    React.js (Vite)
  Styling     Tailwind CSS
  Icons       Lucide React
  Database    Firebase Firestore
  Auth        Firebase Authentication
  AI Engine   Google Gemini API

------------------------------------------------------------------------

