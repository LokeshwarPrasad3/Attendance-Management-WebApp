# Smart Attendance System

## Table of Contents

1. [Introduction](#introduction)
2. [Problem Statements](#problem-statements)
3. [Solution](#solution)
4. [Technolgies Used](#technologies-used)
5. [Role Wise User Access](#roll-wise-user-access)
   - [User Access](#user-access)
   - [Teacher Access](#teacher-access)
   - [HOD Access](#hod-access)
6. [Future Scope](#future-scope)
7. [Screenshots](#screenshots)
7. [Live Link](#screenshots)
8. [Local Setup](#local-setup)
9. [Contributing](#contributing)

## Introduction

In today's fast-paced world, efficient tracking of attendance is crucial for organizations. Our system offers a seamless solution leveraging technology to automate and streamline the attendance monitoring process. Join us as we delve into the key features and benefits that make our system an invaluable asset for enhancing organizational efficiency. Let's explore the future of attendance management together.

## Problem Statements

- Manual Attendance Tracking
- Lack of Real-Time Updates
- Inefficient Communication
- Difficulty in Record Accessibility
- Limited Data Accuracy
- Challenges in Reporting
- Ineffective Time Management

## Solution

- Automated Attendance Tracking for Students and Staff
- Real-Time Updates for Instant Record Access
- User-Friendly Interface for Intuitive Operation
- Enhanced Accessibility to Attendance Records
- Data Accuracy for Informed Decision-Making
- Efficient Reporting Mechanisms
- Improved Time Management for Faculty

## Technolgies Used

![HTML](https://img.shields.io/badge/-HTML-red)
![CSS (Tailwind CSS)](https://img.shields.io/badge/-CSS-blue)
![React](https://img.shields.io/badge/-React-blueviolet)
![Express JS](https://img.shields.io/badge/-Express-9cf)
![MongoDB](https://img.shields.io/badge/-MongoDB-green)
![Cloudinary](https://img.shields.io/badge/-Cloudinary-orange)
![Cors](https://img.shields.io/badge/-Cors-lightgrey)
![Bcrypt](https://img.shields.io/badge/-Bcrypt-yellow)
![jsonwebtoken](https://img.shields.io/badge/-jsonwebtoken-yellowgreen)
![dotenv](https://img.shields.io/badge/-dotenv-lightgrey)

## Role Wise User Access

### User Access

- Login & Access attendance read only

### Teacher Access

- Can see history
- Submit Attendance

### HOD Access

- Manage students
- Create Teacher Account & Assign Subjects
- Access any subject All Attendance
- Access specific date attendance

## Future Scope

- Biometric Technology Integration
- Enhanced Data Analytics for Predictive Trends
- Mobile App Accessibility
- AI for Smart Attendance Insights
- Extra-Curricular Activities Tracking
- Continuous User Feedback Refinement


## Screenshots

1. Student Interface

   ![Student Interface](/frontend/public/Screenshots/student-page.jpg)

2. Teacher Interface

   ![Teacher Interface](/frontend/public/Screenshots/teacher-page.jpg)

3. HOD Interface

   ![HOD Interface](/frontend/public/Screenshots/hod-page.png)

## Local Setup

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/LokeshwarPrasad3/Attendance-Management-WebApp.git
   ```
    Go to Root Directory : 
   ```
   cd Attendance-Management-WebApp
   ```

2. **Install the dependencies:**

    Install backend dependencies
   ```bash
   cd backend
  
   npm install
   ```

   Install frontend dependencies
   ```bash
   cd ../frontend
   
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the `backend` directory and add your MongoDB URI credentials:

   ```env
    PORT=5000
    JWT_SECRET=YOURSECRETKEYHERE
    DB_URL=mongodb://127.0.0.1:27017/College-Attendance

   ```

4. **Run the project:**

   ```bash
   # Start the backend server
   cd backend
   npm run start

   # Start the frontend server
   cd ../frontend
   npm run react
   ```

5. **Access the application:**
   Open your browser and navigate to `http://localhost:5173`.


## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.
