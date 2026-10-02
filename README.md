# Recipe Manager

A full-stack recipe management application built as an industry training project.

Users can browse recipes and categories publicly, create an account and sign in, and create recipes containing ingredients, directions, categories, preparation time, cooking time, and serving information.

## Technology Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Clerk authentication
- Native Fetch API

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- Clerk authentication middleware

### Database

- PostgreSQL
- Supabase

### Development Tools

- npm workspaces
- Git
- VS Code

## Features

### Public Features

- Browse all recipes
- View individual recipe details
- Browse recipe categories
- Filter recipes by category
- View ingredients in their intended order
- View directions in sequential order
- View recipe preparation time, cooking time, servings, categories, and creator

### Authentication

- User registration with Clerk
- User sign-in and sign-out
- Persistent authenticated sessions
- Protected client routes
- Protected API endpoints
- Local application users linked to Clerk accounts

### User Dashboard

Authenticated users can:

- View their account information
- View the number of recipes they have created
- View their recipes
- Open their recipes from the dashboard
- Navigate to the recipe creation page

### Recipe Creation

Authenticated users can create recipes with:

- Title
- Description
- Preparation time
- Cooking time
- Number of servings
- Multiple ingredients
- Multiple directions
- Multiple categories

Ingredients and directions can be dynamically added or removed. Ingredient order and direction numbering are preserved when the recipe is saved.

Recipe creation also includes client-side and server-side validation, submission loading states, error handling, and automatic navigation to the newly created recipe.

## Project Structure

```text
tech-training-project/
├── client/          # React frontend
├── server/          # Express backend
├── package.json
├── package-lock.json
└── README.md
```

The project uses npm workspaces to manage the frontend and backend from the project root.

## Prerequisites

Before running the project, install:

- Node.js
- npm
- Git

You will also need:

- A PostgreSQL database
- A Clerk application

This project currently uses Supabase to host the PostgreSQL database.

## Installation

Clone the repository and navigate into the project directory.

```bash
git clone <repository-url>
cd tech-training-project
```

Install dependencies from the project root:

```bash
npm install
```

## Environment Variables

Environment files are not committed to Git.

### Client

Create:

```text
client/.env
```

Add:

```env
VITE_API_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### Server

Create:

```text
server/.env
```

Add:

```env
DATABASE_URL=your_postgresql_pooler_connection_string
DIRECT_URL=your_postgresql_direct_connection_string

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

PORT=3000
CLIENT_URL=http://localhost:5173
```

Do not commit real environment variables or secret keys to the repository.

## Database Setup

The backend uses Prisma with PostgreSQL.

From the project root, generate the Prisma client:

```bash
npx prisma generate --schema=server/prisma/schema.prisma
```

Run the existing database migrations:

```bash
npx prisma migrate deploy --schema=server/prisma/schema.prisma
```

Seed the database with the application's initial data:

```bash
npm run seed --workspace=server
```

The seed process creates the application's default recipe categories and development data.

## Running the Application

The frontend and backend can be started together from the project root:

```bash
npm run dev
```

This starts:

- React/Vite frontend at `http://localhost:5173`
- Express API at `http://localhost:3000`

They can also be started separately.

Frontend:

```bash
npm run start:frontend
```

Backend:

```bash
npm run start:backend
```

## Type Checking

Backend:

```bash
npm run typecheck --workspace=server
```

Frontend:

```bash
npx tsc --noEmit -p client/tsconfig.json
```

## API Overview

Public endpoints include:

```text
GET /api/recipes
GET /api/recipes/:id
GET /api/categories
GET /api/categories/:id/recipes
```

Authenticated endpoints include:

```text
GET  /api/users/me
GET  /api/users/me/recipes
POST /api/recipes
```

Authenticated requests use a Clerk session token sent in the `Authorization` header.

## Known Issues / Limitations

- The application currently has minimal styling and is focused primarily on MVP functionality.
- Recipe creator display falls back to the user's email when no username or first/last name is available.
- Recipe editing and deletion are not currently implemented.
- User profile editing is not currently implemented.
- Development Clerk keys are intended for local development only.
- Additional production hardening, validation, and error handling may be required before production deployment.

## Development Status

This project is currently an MVP developed as part of an industry training project.