<div align="center">

# 🏥 Smart Healthcare Portal

**A full-stack, production-grade healthcare management platform connecting patients, doctors, and administrators through secure role-based dashboards**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![WebRTC](https://img.shields.io/badge/WebRTC-333333?style=for-the-badge&logo=webrtc&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Twilio](https://img.shields.io/badge/Twilio-F22F46?style=for-the-badge&logo=twilio&logoColor=white)

</div>

---

## 📸 Screenshots

### 🧑‍💼 Patient Portal

**Login**
![Patient Login](https://github.com/user-attachments/assets/a22b8e52-bf2b-4e94-a7af-63dce7221b98)

**Dashboard**
![Patient Dashboard](https://github.com/user-attachments/assets/a0e5b591-f0e1-419b-9a87-eed2beb30265)

---

### 👨‍⚕️ Doctor Portal

**Login**
![Doctor Login](https://github.com/user-attachments/assets/0b826c23-d4f7-406e-99c7-fb73d1de4fa5)

**Dashboard**
![Doctor Dashboard](https://github.com/user-attachments/assets/5a22cf0a-f5d4-4714-affa-66b3193690fb)

---

### 🏛️ Admin Portal

**Login**
![Admin Login](https://github.com/user-attachments/assets/2a00eb7a-6f61-49f1-b6e0-029e51990ba8)

**Dashboard**
![Admin Dashboard](https://github.com/user-attachments/assets/b2ec0785-b2da-46f5-ba32-45fdb6f264ce)

---

## 📋 Table of Contents

- [Screenshots](#-screenshots)
- [Overview](#-overview)
- [Objectives](#-objectives)
- [Tech Stack](#-tech-stack)
- [Core Features](#-core-features)
- [Real-World Use Cases](#-real-world-use-cases)
  - [Patients](#-patients)
  - [Doctors & Clinicians](#-doctors--clinicians)
  - [Hospital Administrators](#-hospital-administrators)
  - [Pharmacies](#-pharmacies)
  - [Industry-Specific Use Cases](#-industry-specific-use-cases)
- [User Roles](#-user-roles)
- [System Architecture](#-system-architecture)
- [APIs & Integrations](#-apis--integrations)
- [Project Structure](#-project-structure)
- [Setup & Installation](#-setup--installation)
- [Deployment](#-deployment)
- [Future Enhancements](#-future-enhancements)
- [License](#-license)
- [Author](#-author)

---

## 🧭 Overview

**The Problem:** Healthcare platforms are fragmented. Patients can't access their records. Doctors juggle disconnected tools. Administrators lack visibility. Communication falls through the cracks.

**The Solution:** The **Smart Healthcare Portal** is a unified, production-ready platform that consolidates patient–doctor workflows, secure EHR management, AI-powered symptom checking, real-time communication, and administrative analytics into a single, role-aware interface — built to scale from a single clinic to a full hospital network.

---

## 🎯 Objectives

- Centralize healthcare workflow management across all roles in one platform
- Enforce data security with role-based access control and JWT authentication
- Improve service efficiency through automation, AI triage, and real-time communication
- Scale seamlessly from small clinics to large hospital networks

---

## 🛠 Tech Stack

### Frontend

| Technology | Role |
|:-----------|:-----|
| **React.js + TypeScript** | Core UI framework with type-safe components |
| **HTML5 / CSS3** | Semantic markup and responsive styling |
| **Recharts** | Analytics and data visualization charts |

### Backend

| Technology | Role |
|:-----------|:-----|
| **Node.js + Express** | Primary REST API server |
| **Django REST Framework** | Alternative Python backend (configurable) |
| **Socket.IO** | Real-time messaging and live notifications |
| **WebRTC / Twilio** | Peer-to-peer telemedicine video calls |

### Data & Storage

| Technology | Role |
|:-----------|:-----|
| **MongoDB** | Unstructured data — chat logs, activity history |
| **MySQL** | Structured data — EHR, appointments, prescriptions |

### Infrastructure

| Technology | Role |
|:-----------|:-----|
| **Vercel** | Frontend hosting and CDN |
| **Render / Heroku** | Backend API hosting |
| **MongoDB Atlas** | Cloud-managed NoSQL database |
| **AWS RDS** | Production-grade MySQL hosting |
| **Git + GitHub** | Version control and collaboration |

---

## ✨ Core Features

### 🗂️ Electronic Health Records (EHR)
Securely store, retrieve, and manage complete patient medical histories — diagnoses, lab results, prescriptions, and visit notes — accessible to authorized roles only.

### 🤖 AI Symptom Checker
Powered by the **Infermedica API**, patients receive preliminary symptom assessments before appointments — reducing unnecessary visits and helping doctors arrive better prepared.

### 💬 Real-Time Patient–Doctor Chat
Live messaging via **Socket.IO** with read receipts, timestamps, and notification support — no third-party apps needed.

### 📹 Telemedicine Video Calls
Integrated **WebRTC / Twilio** video consultations directly inside the portal — secure, browser-native, and HIPAA-aligned.

### 📋 QR-Coded Prescriptions
Each prescription generates a scannable QR code for instant pharmacy verification — eliminating paper scripts and reducing fraud.

### ⌚ Wearable Device Integration
Sync fitness and vitals data from **Fitbit** and **Google Fit** APIs directly into patient health profiles for continuous monitoring.

### 📊 Analytics Dashboard
Visualize appointment trends, patient demographics, usage patterns, and performance metrics — all in real time with Recharts.

### 🔐 Enterprise-Grade Security
- JWT-based authentication with refresh token rotation
- HTTPS encryption across all endpoints
- Input validation and sanitization
- Full audit logs for every data access event

### 📱 Responsive UI/UX
Healthcare-focused design system with accessible color palettes, clear information hierarchy, and mobile-first layouts.

---

## 🎯 Real-World Use Cases

---

### 🧑‍⚕️ Patients

| Pain Point | How the Portal Solves It |
|:-----------|:-------------------------|
| **"I can never find my old test results"** | EHR dashboard stores complete medical history — searchable and always accessible |
| **"Booking appointments takes too many calls"** | Self-service appointment booking from the patient dashboard, 24/7 |
| **"I don't know if my symptoms are serious"** | AI symptom checker gives a preliminary triage assessment before any visit |
| **"Video calls with my doctor feel insecure"** | Native WebRTC video — no third-party apps, no data leaving the platform |
| **"I lose paper prescriptions"** | QR-coded digital prescriptions stored in the portal, scannable at any pharmacy |
| **"My fitness tracker data never reaches my doctor"** | Fitbit / Google Fit sync pushes vitals directly into the patient health profile |

**A day in the life:**

```
08:00 AM  →  Wake up with chest discomfort. Open portal and run AI symptom checker.
              Assessment: "Possible acid reflux — low urgency. Monitor for 24h."
09:00 AM  →  Decide to book an appointment anyway. Slots available, booked in 30 sec.
10:30 AM  →  Video call with Dr. Sharma. She reviews last month's Fitbit heart rate
              data already synced to the EHR.
10:45 AM  →  Prescription issued. QR code arrives instantly in the portal.
11:00 AM  →  Show QR at pharmacy. Medication dispensed. No paperwork.
```

---

### 👨‍⚕️ Doctors & Clinicians

| Pain Point | How the Portal Solves It |
|:-----------|:-------------------------|
| **"I waste time reviewing paper notes before consultations"** | Full EHR with visit history, lab results, and vitals loaded before the patient joins |
| **"Patients miss appointments and I find out too late"** | NodeMailer sends automated reminders — no-show rate drops |
| **"Remote consultations feel disconnected"** | Integrated video + chat in one screen — no app switching |
| **"Prescribing is paper-heavy and error-prone"** | Digital QR-coded prescriptions issued in seconds, verified at point of dispensing |
| **"I can't monitor chronic patients between visits"** | Wearable data sync surfaces abnormal vitals passively — alert when thresholds breach |

**Weekly workflow:**

```
Monday     →  Review upcoming schedule. Check wearable alerts for 3 chronic patients
              showing elevated resting heart rate.
Tuesday    →  Morning video consults. EHR pre-loaded per patient. Notes auto-saved.
Wednesday  →  New patient books via portal. AI symptom pre-assessment already attached
              to their profile — arrive to consultation informed.
Friday     →  Issue 12 prescriptions digitally. Zero paper, zero pharmacy callbacks.
```

---

### 🏛️ Hospital Administrators

| Pain Point | How the Portal Solves It |
|:-----------|:-------------------------|
| **"I have no visibility into platform usage"** | Analytics dashboard shows appointments, active users, and resource utilization in real time |
| **"Doctor schedules are managed in spreadsheets"** | Centralized scheduling and resource management from the admin dashboard |
| **"Compliance audits take weeks to prepare"** | Audit logs record every data access event — export-ready at any time |
| **"We can't see bottlenecks until it's too late"** | Trend visualization surfaces appointment backlogs and demographic shifts early |
| **"Onboarding new staff is slow"** | Role-based access means new doctors/admins are fully provisioned in minutes |

**Monthly review workflow:**

```
Start of Month  →  Pull analytics snapshot. Appointment volume up 18%.
                   Identify 2 departments with highest wait times.
Mid-Month       →  Check audit logs for compliance review. All access events
                   timestamped and attributed. Zero gaps.
End of Month    →  Export demographic trend charts to board report.
                   Forecast staffing needs for next quarter.
```

---

### 💊 Pharmacies

| Pain Point | How the Portal Solves It |
|:-----------|:-------------------------|
| **"Verifying handwritten prescriptions is slow and error-prone"** | QR-coded prescriptions scan in under 2 seconds — no manual verification |
| **"Fraudulent or duplicate prescriptions are hard to catch"** | Each QR links to a unique, server-verified prescription record — duplicates rejected |
| **"We spend time calling clinics for clarification"** | Prescription includes doctor details, dosage, and notes in structured digital format |

---

### 🏭 Industry-Specific Use Cases

| Setting | Specific Application |
|:--------|:---------------------|
| **General Practice Clinics** | End-to-end patient flow — booking → consult → EHR → prescription |
| **Telemedicine Platforms** | Video + chat + records in one portal, no third-party tools |
| **Corporate Health Programs** | Wearable integration for employee wellness monitoring and reporting |
| **Hospital Networks** | Multi-role access across departments with centralized analytics |
| **Mental Health Services** | Secure, private chat + video with full session history in EHR |
| **Chronic Disease Management** | Continuous vitals monitoring via wearables with threshold alerting |

---

## 👥 User Roles

| Role | Access & Capabilities |
|:-----|:----------------------|
| **Patient** | Appointment booking, EHR access, symptom checker, video calls, prescription QR, wearable sync |
| **Doctor** | Patient management, EHR read/write, telemedicine, prescription issuance, chat, wearable data review |
| **Admin** | Full platform oversight, analytics dashboard, scheduling management, audit log access, user provisioning |

---

## 🏗 System Architecture

```
  ╔══════════════════════════════════════════════════════╗
  ║             React.js + TypeScript Frontend            ║
  ║        Patient · Doctor · Admin Dashboards           ║
  ╚══════════╦═══════════════════════════╦═══════════════╝
             ║  REST API Calls           ║  Socket.IO Events
             ▼                           ▼
  ╔══════════╩═══════════╗   ╔═══════════╩═══════════════╗
  ║  Node.js / Django    ║   ║   Real-Time Layer          ║
  ║  REST API Backend    ║   ║   Socket.IO + WebRTC       ║
  ╚══════════╦═══════════╝   ╚═══════════════════════════╝
             ║
      ┌──────┴──────┐
      ▼             ▼
  ╔═══╩════╗   ╔════╩═══╗
  ║ MongoDB ║   ║  MySQL  ║
  ║ (chat,  ║   ║ (EHR,  ║
  ║  logs)  ║   ║  appts) ║
  ╚════════╝   ╚════════╝
             ║
  ╔══════════╩═══════════════════════════════════════════╗
  ║                  External APIs                        ║
  ║  Infermedica (AI) · Twilio · Fitbit · Google Fit     ║
  ║  NodeMailer · QR Generator                           ║
  ╚══════════════════════════════════════════════════════╝
```

---

## 🔗 APIs & Integrations

| Integration | Purpose |
|:------------|:--------|
| **Infermedica** | AI-powered symptom assessment and preliminary triage |
| **Socket.IO** | Real-time bidirectional messaging and live notifications |
| **WebRTC / Twilio** | Secure browser-native telemedicine video calls |
| **Fitbit API** | Wearable vitals and fitness data sync to patient EHR |
| **Google Fit API** | Alternative wearable data source for Android ecosystem |
| **NodeMailer** | Automated appointment reminders and system notifications |
| **QR Generator** | Unique prescription code generation and pharmacy verification |

---

## 📁 Project Structure

```
smart-healthcare-portal/
│
├── src/
│   ├── types/
│   │   └── index.ts                    # Shared TypeScript interface definitions
│   │
│   ├── context/
│   │   └── AuthContext.tsx             # JWT auth state, role detection & session management
│   │
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.tsx              # Top navigation bar with role-aware menu
│   │   │   └── Sidebar.tsx             # Contextual sidebar per user role
│   │   │
│   │   ├── Auth/
│   │   │   └── LoginForm.tsx           # Unified login with role-based redirect
│   │   │
│   │   └── Dashboard/
│   │       ├── PatientDashboard.tsx    # Appointments, EHR, symptom checker, prescriptions
│   │       ├── DoctorDashboard.tsx     # Patient list, consultations, EHR write, prescribing
│   │       └── AdminDashboard.tsx      # Analytics, scheduling, audit logs, user management
│   │
│   └── App.tsx                         # Root component and route definitions
│
└── package.json                        # Node.js dependencies & scripts
```

---

## 🚀 Setup & Installation

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+ *(if using Django backend)*
- Git

### Clone & Install

```bash
git clone https://github.com/ramcodeverse/Smart-Healthcare-Portal---Production-Ready-Platform.git
cd Smart-Healthcare-Portal---Production-Ready-Platform
npm install
npm run dev
```

Frontend available at: `http://localhost:3000`

### Backend Setup *(Node.js)*

```bash
cd backend
npm install
npm run start
```

### Backend Setup *(Django)*

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

---

## ☁️ Deployment

| Layer | Platform | Notes |
|:------|:---------|:------|
| **Frontend** | Vercel | Auto-deploy from GitHub — zero config |
| **Backend** | Render / Heroku | Set environment variables via dashboard |
| **MongoDB** | MongoDB Atlas | Free tier available for development |
| **MySQL** | AWS RDS | Use `db.t3.micro` for cost-efficient production start |

### Environment Variables

```env
# Backend
JWT_SECRET=your_jwt_secret_here
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/healthcare
MYSQL_URL=mysql://user:pass@host:3306/healthcare_db
INFERMEDICA_APP_ID=your_infermedica_app_id
INFERMEDICA_APP_KEY=your_infermedica_app_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
SMTP_HOST=smtp.gmail.com
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

---

## 🔮 Future Enhancements

| Enhancement | Description |
|:------------|:------------|
| **Multi-language (i18n)** | Full internationalization for regional healthcare deployments |
| **Offline Access** | Service Workers for offline EHR viewing and form completion |
| **Payment Gateway** | Integrated billing and insurance claim processing |
| **AI Treatment Suggestions** | LLM-powered differential diagnosis and treatment recommendations |
| **FHIR Compliance** | HL7 FHIR API support for interoperability with hospital systems |
| **Mobile App** | React Native patient and doctor apps with push notifications |

---

## 📄 License

Licensed under the **MIT License** — see the `LICENSE` file for details.

---

## 👨‍💻 Author

<div align="center">

**Coded by Ram — CodVerse**

📧 [ramcodeverse@gmail.com](mailto:ramcodeverse@gmail.com)
🐙 [github.com/ramcodeverse](https://github.com/ramcodeverse)

---

> *This project demonstrates modern full-stack architecture, secure role-based workflows, third-party API integration, real-time features, and domain-specific design — built for healthcare innovation.*

</div>
