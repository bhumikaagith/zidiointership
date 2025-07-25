# 📊 Excel Analytics Platform (MERN Stack)

A full-stack web application that allows users to upload Excel files (.xlsx/.xls), visualize data using 2D/3D charts, download them as PNG/PDF, and manage history. Includes an Admin Panel to monitor all users and uploaded files.

---

## 🚀 Features

- ✅ User & Admin authentication (JWT-based)
- ✅ Upload and parse Excel files (SheetJS)
- ✅ Select X and Y axes dynamically
- ✅ Generate interactive 2D/3D charts using Chart.js
- ✅ Download charts as PNG or PDF
- ✅ Dashboard with upload history
- ✅ Admin panel to view all users and files
- ✅ Optional AI integration for summary (OpenAI API)
- ✅ Responsive UI using Tailwind CSS

---

## 🧰 Tech Stack

### Frontend  (In Progress)
- React.js
- Redux Toolkit (optional)
- Chart.js (for charts)
- Tailwind CSS
- Axios
- html2canvas + jsPDF (for downloads)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Auth
- Multer (file upload)
- SheetJS / xlsx

---

## 📁 Folder Structure

# Bash
cd backend
npm install

# .env 

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Backend Run

node server.js
# or
npx nodemon server.js


Author Built by [Mudassar]

