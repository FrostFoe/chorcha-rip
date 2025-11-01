# Chorcha - A Next.js eLearning Platform

This is a web application for "Chorcha", a modern eLearning platform. It's built with Next.js and provides a rich, interactive experience for students.

## About The Project

Chorcha is designed to help students prepare for exams like HSC, SSC, Admission tests, and BCS. It allows users to:

- Browse and enroll in various courses.
- Watch video lessons and read articles.
- Test their knowledge with quizzes.
- Submit assignments and track their status.
- View their progress and standing on a leaderboard.
- Manage their user profile.

## Tech Stack

This project is built with a modern tech stack, focusing on performance, developer experience, and scalability.

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Authentication**: [Supabase](https://supabase.com/)
- **Content**: [MDX](https://mdxjs.com/) for course and lesson content.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18.17.0 or later)
- [pnpm](https://pnpm.io/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Install dependencies:**
    ```sh
    pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of your project and add your Supabase project URL and anon key. You can get these from your Supabase project's API settings.

    ```env
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

4.  **Run the development server:**
    ```sh
    pnpm dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `pnpm dev`: Runs the app in development mode.
- `pnpm build`: Builds the app for production.
- `pnpm start`: Starts a production server.
- `pnpm lint`: Lints the code using Biome.
- `pnpm format`: Formats the code using Biome.
- `pnpm typecheck`: Runs TypeScript to check for type errors.
