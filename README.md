# REST Client API - Lightweight Postman Alternative

## Overview

REST Client API is a lightweight alternative to Postman built with Next.js, providing essential API testing capabilities with a focus on simplicity and user experience. The application supports all RESTful methods, request customization, and includes features like authentication, request history, and code generation.

## Features

### Core Functionality
- **REST Client** with all HTTP methods (GET, POST, PUT, DELETE, etc.)
- **Request Builder** with:
  - Method selector
  - URL input
  - Request body editor (JSON/plain text)
  - Headers editor
- **Response Viewer** with HTTP status code and response body display
- **Code Generation** for multiple languages and libraries (cURL, Fetch, XHR, Node.js, Python, etc.)

### Additional Features
- ✅ User Authentication
- 📜 Request History
- 🔤 Variables System
- 🌐 Internationalization
- ❌ Error Handling
- 🔄 CORS Proxy

## Technology Stack

### Core Technologies

- **Next.js 15 (App Router)** - Provides server-side rendering and optimized production builds
- **React 19** - Latest version with improved performance and hooks
- **TypeScript** - Static typing for better code quality and developer experience
- **Tailwind CSS** - Utility-first CSS framework for responsive design

### Development Tools

- **ESLint & Prettier** - Code linting and formatting for consistent style
- **Husky** - Git hooks for pre-commit checks
- **Vitest** - Blazing fast unit testing framework
- **React Testing Library** - For component testing

### Key Libraries

| Library | Purpose |
|---------|---------|
| CodeMirror | Code editing in request/response panels |
| React Hook Form | Form management with validation |
| react-toastify | User notifications and alerts |
| next-intl | Internationalization (i18n) support |
| Firebase/Supabase | Authentication |
| postman-code-generators | API request code generation |
| yup | Schema validation for forms |

## Available Scripts

### `npm run dev`

Starts the development server.

### `npm run build`

Builds the application for production.

### `npm run start`

Starts the production server.

### `npm run lint`

Runs ESLint.

### `npm run prettier`

Checks code formatting using Prettier.

### `npm run format:all`

Runs code formatting and linting fixes.

### `npm run test`

Runs tests using Vitest.

### `npm run test:coverage`

Runs tests using Vitest and displays how much code is covered with tests.

### `npm run prepare`

Runs Husky to set up Git hooks for code formatting and linting.
