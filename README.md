# 🌐 Frontend - Foodify (or Your Project Name)

A modern, responsive frontend built with **React**, **TypeScript**, and **TailwindCSS**, featuring clean UI components from **shadcn/ui**, client-side routing with **React Router**, and API communication via **Axios**.

---

## 🚀 Tech Stack

```md
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
```

---


## ⚙️ Installation

```bash
# Clone the repo
git clone https://github.com/your-username/your-frontend-repo.git

# Navigate into project
cd your-frontend-repo

# Install dependencies
npm install
```

---

## ▶️ Run the Project

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

---


## 🔗 Routing (React Router)

* Client-side routing using **React Router DOM**
* Organized route structure for scalability

---

## 🎨 UI & Styling

* Built with **TailwindCSS** for utility-first styling
* Uses **shadcn/ui** for accessible and customizable components

---

## 🔄 API Handling

* Axios used for API requests
* Centralized API service layer

Example:

```ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
```

---

## 🚀 Deployment (Netlify)

