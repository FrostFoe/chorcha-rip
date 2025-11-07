# Shikhbo - Online Learning Platform

Shikhbo is a modern, full-stack online learning platform built with Next.js. It allows users to browse courses, enroll, track their progress, and take quizzes. It also includes a comprehensive admin panel for managing courses, modules, and lessons.

## Features

- **User Authentication**: Secure login/registration using Supabase (Email, Google, GitHub, Anonymous Guest).
- **Course Management**: A full-featured admin panel to create, read, update, and delete courses, modules, and lessons.
- **Dynamic Content**: Course content is stored in local JSON files, making it easy to manage and version control.
- **Course Enrollment**: Users can enroll in courses using a virtual currency (Gems).
- **Learning Dashboard**: A personalized dashboard for users to view their enrolled courses and track progress.
- **Interactive Course Player**: A dedicated layout for learning, with a sidebar for navigating modules and lessons of different types (video, article, quiz).
- **Assignments**: View and submit assignments for different courses.
- **Leaderboard & Gem Store**: Gamification elements to enhance user engagement.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS and ShadCN UI components.
- **Theming**: Supports both light and dark modes.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Authentication & User Data**: [Supabase](https://supabase.io/) (via local storage simulation)
- **Linting & Formatting**: [Biome](https://biomejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later)
- [pnpm](https://pnpm.io/) (or your preferred package manager like npm or yarn)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/shikhbo.git
    cd shikhbo
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

### Running the Development Server

1.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add your Supabase credentials:

    ```
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

2.  **Run the development server:**
    ```bash
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Folder Structure

Here's a high-level overview of the project's folder structure:

```
src
├── app
│   ├── (main)          # Main application routes
│   ├── admin           # Admin panel routes
│   ├── api             # API routes for backend logic
│   └── auth            # Authentication routes
├── components
│   ├── admin           # Components specific to the admin panel
│   ├── courses         # Components for the course learning pages
│   ├── dashboard       # Components for the user dashboard
│   ├── landing         # Components for the landing page
│   └── ui              # Reusable UI components (from ShadCN)
├── content
│   ├── assignments     # JSON files for assignment data
│   └── courses         # JSON files for course, module, and lesson data
├── hooks               # Custom React hooks
├── lib                 # Utility functions, type definitions, and server-side data fetching
└── providers           # React Context providers (e.g., UserData, Supabase)
```

## Admin Panel

The admin panel is a core feature of Shikhbo, allowing administrators to manage the entire course catalog without directly editing the source code.

- **Access**: Navigate to `/admin`.
- **Features**:
  - **Dashboard**: An overview of platform statistics (total courses, modules, lessons).
  - **Course Management**: Create, edit, and delete courses. Set details like title, price, instructor, and description.
  - **Module Management**: Within each course, create, edit, reorder, and delete modules.
  - **Lesson Management**: Within each module, create, edit, reorder, and clone lessons of various types (video, article, quiz).
  - **Live Previews**: Preview lessons and course descriptions directly within the admin interface.
  - **Data Persistence**: All changes made in the admin panel are saved directly to the JSON files in the `src/content` directory.
