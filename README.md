# Todo List Application

A React-based todo list application with sorting, due dates, and completion status tracking.

## Getting Started

1. Install dependencies:
`npm install`

2. Start the development server:
`npm run dev`

## Technologies Used

- **React Query**: Handles data fetching, updates, and cache invalidation
- **Day.js**: Formats and manages dates
- **CSS Modules**: Provides scoped styling
- **classnames**: Manages conditional class applications

## Environment Variables

This project uses environment variables for configuration. For demonstration purposes, the `.env` file is included in this repository.
**In a production environment, this file would be excluded from version control and added to `.gitignore`.**

## Development Notes

- The application uses a container/presentational pattern for component organization
- Styles are modular and scoped to prevent conflicts
- Data fetching is handled through React Query for efficient caching and updates
