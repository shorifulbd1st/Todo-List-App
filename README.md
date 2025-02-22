<div align="center">
 <h1>Task Management Application </h1>
  <a href="https://todo-list-2c36b.web.app/" target="_blank">
    <img src="https://i.ibb.co.com/chKHScmJ/screencapture-localhost-5173-2025-02-22-13-12-22.png" width="400px" alt="Todo-List"/> 
  </a>
 
</div>


## 📜 Project Overview

Welcome to **Task Management Application**, The Task Management Application is a robust, real-time system that allows users to manage tasks efficiently. The application supports task creation, editing, deletion, and reordering through a drag-and-drop interface. Tasks are categorized into three sections: To-Do, In Progress, and Done. The system ensures real-time updates and data persistence by instantly saving changes to the database.

---


## 🚀 Live Links

- **Client Repo:** This repository serves as the main `Task Management Application ` platform and includes the `frontend` setup.
- **Live Site:** [_Task Management Application.com_](https://todo-list-2c36b.web.app/)

---

## 🔍 React Concepts Used

- **Components**
- **Hooks**: `useState`, `useEffect`, `useContext`
- **Conditional Rendering**
- **Context API** for global state management
- **React Hook Form** for form handling and validation

---

## 🛠️ Technologies Used

### 👩🏼‍💻 Frontend

- **React**
- **Firebase**
- **Tailwind CSS**
- **DaisyUI**
- **React Router**
- **React Icons**
- **React Hot Toast**
- **JWT-based Authentication**

### ｡🇯‌🇸‌ Backend

- **Node.js**
- **Express.js**

### 🛢️ Database

- **MongoDB**

---

## ✨ Features

- **Task Management:** Users can add new tasks with a title, category, and description, edit existing tasks, and delete tasks as needed with a confirmation toast. View all tasks in a responsive grid layout.
- **Drag-and-Drop Functionality:** Users can effortlessly reorder tasks and move them between categories.
- **Real-Time Updates:**  Instant synchronization of task changes across all connected users.
- **Persistent Storage:** Task data is stored in a MongoDB database to ensure seamless access and retrieval.
- **Clean UI/UX:** The application features a minimalistic and responsive design, ensuring smooth usability on both desktop and mobile devices.

---

## 🧰 NPM Packages Used
- "@dnd-kit/accessibility": "^3.1.1",
- "@dnd-kit/core": "^6.3.1",
- "@dnd-kit/sortable": "^10.0.0",
- "@tanstack/react-query": "^5.66.8",
- "axios": "^1.7.9",
- "firebase": "^11.3.1",
- "localforage": "^1.10.0",
- "lottie-react": "^2.4.1",
- "match-sorter": "^8.0.0",
- "react": "^19.0.0",
- "react-dom": "^19.0.0",
- "react-helmet-async": "^2.0.5",
- "react-icons": "^5.5.0",
- "react-router-dom": "^7.2.0",
- "react-toastify": "^11.0.3",
- "react-tooltip": "^5.28.0",
- "socket.io-client": "^4.8.1",
- "sort-by": "^1.2.0",
- "sweetalert2": "^11.17.2"

---

## 🛠 Installation

### Prerequisites

- **Node.js** and **npm** installed
- **MongoDB** connection string

---

### Client Side Setup

1. Clone the client-side repository:

   ```bash
   git clone https://github.com/shorifulbd1st/Todo-List-App.git
   cd Todo-List-App
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the project in a code editor:
   ```bash
   code .
   ```
5. Add the `.env` file in the root directory and include the following environment variables:
   ```bash
   VITE_apiKey=................................
   VITE_authDomain=................................
   VITE_projectId=................................
   VITE_storageBucket=................................
   VITE_messagingSenderId=................................
   VITE_appId=................................
   VITE_IMAGE_HOSTING_KEY=................................
   VITE_Payment_Gateway_PK=................................

   ```
   > **Note:** Replace the `VITE_API_KEY` and `VITE_AUTH_DOMAIN`, along with other placeholders, with actual values.

### Server Side Setup

1. Clone the server-side repository:

   ```bash
   git clone https://github.com/shorifulbd1st/Todo-List-Server.git
   cd Todo-List-Server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   node index.js
   ```

   --- OR ---

   ```bash
   nodemon index.js
   ```

4. Open the project in a code editor:
   ```bash
   code .
   ```
5. Add the `.env` file in the root directory and include the following environment variables:
   ```bash
   DB_USER=..........................................
   DB_PASS=..........................................
   ```
   > **Note:** Replace the `index.js` file's `mongo_uri` and the `.env` file's `DB_USER` and `DB_PASS`,  with actual values.

## 🧑‍💻 Authors

- Shoriful Islam (Lead Developer)
- Lead Developer & Maintainer
- Connect with me on [_GitHub_](https://github.com/shorifulbd1st) & [_Facebook_](https://www.facebook.com/shoriful1st)
