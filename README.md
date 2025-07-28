# 🎓 UniReg System

**UniReg** is an enterprise-grade, full-stack University Registration and Academic Management System built with Node.js, Express, MongoDB, and EJS. It supports multiple user roles including **Students**, **Faculty**, **Registrar**, and **Superadmin**, each with tailored dashboards and workflows.

---

## 📁 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Requirements](#-system-requirements)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [Project Structure](#-project-structure)
- [User Roles & Capabilities](#-user-roles--capabilities)
- [Screenshots](#-screenshots)
- [Planned Features](#-planned-features)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🚀 Features

- 🔐 User Authentication (Login/Register with bcrypt hashing)
- 🧑‍🎓 Student Dashboard: enrollment, grades, subjects
- 👨‍🏫 Faculty Dashboard: teaching load, grade encoding
- 🗂️ Registrar Panel: schedule and record management
- 🛠️ Superadmin Dashboard: full user management with CRUD
- 🌐 Role-based routing and access control
- 📊 Bootstrap-based UI with layout templates
- 📦 MongoDB Atlas Cloud Integration
- 📂 Organized MVC Architecture

---

## 🧰 Tech Stack

| Layer           | Technology                      |
|----------------|----------------------------------|
| Frontend       | EJS + Bootstrap 5                |
| Backend        | Node.js, Express.js              |
| Database       | MongoDB (Cloud via Atlas)        |
| Authentication | bcrypt, express-session, connect-mongo |
| Hosting (Optional) | Render or Railway (for full deployment) |

---

## 💻 System Requirements

- Node.js v18 or higher
- npm v9 or higher
- MongoDB Atlas (or local MongoDB)
- macOS / Linux / Windows compatible

---

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/unireg-system.git
   cd unireg-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

---

## 🔐 Environment Setup

Create a `.env` file in the root folder:

```env
MONGO_URI=your_mongodb_atlas_connection_string
SESSION_SECRET=your_session_secret
PORT=3000
```

Start the server:

```bash
npm start
```

App will be running at: [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Project Structure

```
unireg-system/
├── app.js
├── bin/
│   └── www
├── controllers/
├── middleware/
├── models/
├── routes/
├── views/
│   ├── layouts/
│   ├── partials/
│   ├── auth/
│   ├── student/
│   ├── faculty/
│   ├── registrar/
│   ├── admin/
├── public/
│   └── css/
├── .env
├── .gitignore
└── README.md
```

---

## 👥 User Roles & Capabilities

| Role        | Capabilities                                             |
|-------------|----------------------------------------------------------|
| Student     | View subjects, grades, enrollment history                |
| Faculty     | View teaching load, encode grades                        |
| Registrar   | Manage schedules, student records                        |
| Superadmin  | Full access to all data, user management (CRUD)         |

---

## 🖼️ Screenshots

> Include 3–5 screenshots here (login page, dashboards, forms, user management, etc.)

---

## 🧩 Planned Features

- 🔍 Search and filtering of users and subjects
- 📝 PDF grade reports and enrollment slips
- 📅 Academic calendar and schedule sync
- 📊 Data visualizations per user role
- 🔔 Notifications for schedule changes or grade posting

---

## 🤝 Contributing

1. Fork this repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

**Guillermo V. Red, Jr., DIT**  
Assistant Professor  
Bicol University Polangui  
📧 [gjvred@bicol-u.edu.ph](mailto:gjvred@bicol-u.edu.ph)  
