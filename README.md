# Vyuga'26 - Symposium Management System 🚀

![Vyuga 26 Preview](./public/preview.png)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

A comprehensive, production-ready management system for technical symposiums. Built with **React**, **TypeScript**, and **Supabase**, this platform handles everything from registrations to real-time attendance tracking and advanced data reporting.

---

## ✨ Key Features

### 📅 Event Management
- **Intra/Inter-College Registration**: Separate workflows for different participant types (Outer College, Intra College, and Department).
- **Rule Enforcement**: Implementation of "1 Technical + 1 Non-Technical" event selection rules.
- **Real-time Statistics**: Live dashboard showing registration counts, verified payments, and entry confirmations.

### 📊 Admin Dashboard
- **Advanced Filtering**: Filter participants by Year (1st-4th), Department, and Section.
- **Excel Export**: Generate detailed reports with customizable filters (by event, status, or date) for easy data handling.
- **Attendance Tracking**: Real-time entry confirmation and event-specific attendance monitoring using QR or manual search.

### 🛡️ Security & Customization
- **Environment Driven**: All sensitive credentials (Supabase, Admin passwords) are managed via `.env`.
- **Custom Admin Access**: Separate roles for Admin, Coordinator, and Entry Admin with different access levels.
- **Action Passwords**: Independent passwords for sensitive actions like Deleting registrations or Updating event selections.

---

## 🛠️ Tech Stack

- **Frontend**: [React 18](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Backend/Database**: [Supabase](https://supabase.com/) (PostgreSQL + Auth)
- **Data Export**: [XLSX](https://www.npmjs.com/package/xlsx)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn
- A Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/vyuga26-symposium.git
   cd vyuga26-symposium
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Configure your Supabase and Admin credentials:
   ```bash
   cp .env.example .env
   ```

### 🔑 Environment Variables (.env)

Configure these variables to customize your instance:

| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | Your Supabase Project URL | - |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase Anon/Publishable Key | - |
| `VITE_ADMIN_PASSWORD` | Main Admin password | `vyuga@26` |
| `VITE_COORD_PASSWORD` | Coordinator entry password | `coord@26` |
| `VITE_ENTRY_PASSWORD` | Entry Admin password | `entry@26` |
| `VITE_DELETE_PASSWORD` | Password required to delete data | `del@it` |
| `VITE_UPDATE_PASSWORD` | Password required to update events | `ud@me` |

4. **Database Setup**
   - Import the `supabase_schema.sql` file into your Supabase SQL Editor.

5. **Start Development**
   ```bash
   npm run dev
   ```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🛡️ Safety & Security

- **Safe Deletion**: Data can only be deleted by authorized admins providing the `DELETE_PASSWORD`.
- **Environment Integrity**: Ensure `.env` is never committed to GitHub.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

Made with ❤️ for the Developer Community.
