HFiles – Mini Medical Record Dashboard

A simplified Medical Record Dashboard built as part of the HFiles Full Stack Developer assignment.
The project demonstrates frontend development with Next.js and backend services with .NET Core Web API + MySQL.

🚀 Features

User Authentication (Register/Login)

Profile Management (name, email, phone, gender)

Medical Record Uploads (lab reports, prescriptions, scans, etc.)

File Management API with DTOs & Controllers

Session-based Authentication (backend auth APIs)

Responsive Dashboard UI (built with Next.js & Tailwind CSS)

🛠 Tech Stack

Frontend

Next.js (React Framework)

Tailwind CSS

Backend

.NET Core Web API

Entity Framework Core

MySQL Database

Authentication & Authorization with DTOs

📂 Project Structure
hfiles-task/
 ├── frontend/     # Next.js app (UI + API calls)
 ├── backend/      # .NET Core Web API project
 ├── README.md

⚡ Setup Instructions
1️⃣ Frontend (Next.js)
cd frontend
npm install
npm run dev


Runs on http://localhost:3000

2️⃣ Backend (.NET Core Web API)

Open the backend folder in Visual Studio or run from CLI:

cd backend
dotnet restore
dotnet run


Runs on https://localhost:7267

Make sure MySQL server is running and update your connection string in appsettings.json.

Backend (appsettings.json)

  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Port=3306;Database=hfiles_db;User=root;Password=3251;"
  },
  

📜 APIs Implemented

AuthController → Register, Login

ProfileController → Get/Update profile

FilesController → Upload & Fetch medical records

All APIs follow DTO-based design for clean separation of data.

🧑‍💻 How to Use

Register a new account

Login with your credentials

Update profile info (email, phone, gender, profile picture)

Upload medical records (select type, name, and file)

View uploaded records in a responsive grid

🌐 Deployment

Frontend → Vercel (Next.js)


👤 Author

Darshan Kakadiya

