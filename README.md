# Project Overview: Issue Tracker

This project is a React application built with TypeScript. It provides a user interface for creating and managing issues. The issues are created via a form and are stored in a PostgreSQL database. The form data is validated using Zod and the form itself is managed with React Hook Form. The application also includes a toast notification system for user feedback.

## Project Structure

- `app/`: Contains the main application code including the issues page and various components.
- `components/ui/`: Contains reusable UI components such as buttons, inputs, labels, and toasts.
- `lib/`: Contains utility functions and schema definitions for the issues.

## Setup and Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the project dependencies by running `npm install`.
4. Set up your PostgreSQL database and add the connection string to a `.env` file in the root of your project. Make sure to add `.env` to your `.gitignore` file to prevent it from being tracked by Git.

## Running the Project

To start the development server, run `npm run dev` in the terminal. This will start the Next.js server and the application will be available at `http://localhost:3000`.
