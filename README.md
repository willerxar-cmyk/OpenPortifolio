# Modern Portfolio with Next.js & PostgreSQL

This is a modern, high-performance portfolio website built with the latest technologies.

## Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Shadcn/ui (Radix UI)
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Getting Started

1.  **Install Dependencies:**

    ```bash
    npm install
    ```

2.  **Database Setup:**

    Ensure you have a PostgreSQL database running. Create a `.env` file in the root directory:

    ```env
    DATABASE_URL="postgres://user:password@localhost:5432/portfolio"
    ```

    Push the schema to the database:

    ```bash
    npx drizzle-kit push
    ```

3.  **Run Development Server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser.

## Features

- **Home:** Hero section with animated introduction.
- **Portfolio:** Showcase projects with filtering (tags) and database integration.
- **Curriculum:** Professional timeline (Work & Education).
- **Admin:** Simple interface to add new projects (`/admin`).
- **Responsive:** Fully optimized for mobile and desktop.
- **Dark Mode:** Built-in support (configured in Tailwind).

## Customization

- Edit `src/app/page.tsx` for the Home content.
- Update `src/components/layout/Navigation.tsx` for menu items.
- Modify `src/db/schema.ts` to add more fields to your content.
