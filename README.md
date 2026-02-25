# Vyuga'26 - Symposium Management System 🚀

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

A comprehensive, production-ready management system for technical symposiums. Built with **React**, **TypeScript**, and **Supabase**, this platform handles everything from registrations to real-time attendance tracking and advanced data reporting.

## ✨ Key Features

### 📅 Event Management
- **Intra/Inter-College Registration**: Separate workflows for different participant types.
- **Departmental Logic**: Custom rules for department-specific registrations.
- **Real-time Statistics**: Live dashboard showing registration counts and payment verifications.

### 📊 Admin Dashboard
- **Advanced Filtering**: Filter participants by Year (1st-4th), Department, and Section.
- **Excel Export**: Generate detailed reports with customizable filters for easy data handling.
- **Attendance Tracking**: Real-time entry confirmation and event-specific attendance monitoring.

### 🎨 Premium UI/UX
- **Modern Design**: Built with Lucide icons and Shadcn UI components.
- **Responsive Layout**: Works seamlessly across mobile, tablet, and desktop.
- **Dynamic Themes**: Professional gradients and glass-morphism effects.

---

## 🛠️ Tech Stack

- **Frontend**: [React 18](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Backend/Database**: [Supabase](https://supabase.com/) (PostgreSQL + Auth)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

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
   - Fill in your Supabase credentials:
   ```bash
   cp .env.example .env
   ```
   - Open `.env` and replace values:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   - Import the `supabase_schema.sql` file into your Supabase SQL Editor to set up the required tables and functions.

5. **Start Development Server**
   ```bash
   npm run dev
   ```

---

## 📁 Project Structure

```text
src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and Supabase client
├── pages/          # Main application pages (Admin, Register, etc.)
├── types/          # TypeScript definitions
└── utils/          # Helper functions logic
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

- **Environment Variables**: Never commit your `.env` file to version control. It is already included in `.gitignore`.
- **Supabase Policies**: Ensure you have Row Level Security (RLS) enabled on your Supabase tables.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📞 Support

For any inquiries or support, please open an issue or contact the project maintainer.

Made with ❤️ for the Developer Community.
