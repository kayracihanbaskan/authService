# Next.js Authentication Demo

A full-featured authentication system built with Next.js, TypeScript, and MongoDB. This project demonstrates user registration, login, email verification, password reset, and JWT-based authentication.

## Features

- **User Registration** - Sign up with email and password
- **Email Verification** - Verify email address via verification link
- **Login & Logout** - Secure user authentication with JWT tokens
- **Forgot Password** - Request password reset link via email
- **Password Reset** - Reset password using secure token
- **User Profile** - View user profile with profile routes
- **API Routes** - Comprehensive REST API endpoints for authentication

## Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer
- **Styling**: CSS

## Project Structure

```
src/
├── app/
│   ├── api/users/          # API endpoints
│   │   ├── login/
│   │   ├── signup/
│   │   ├── logout/
│   │   ├── me/
│   │   ├── forgotpassword/
│   │   ├── resetpassword/
│   │   └── verifyemail/
│   ├── login/              # Login page
│   ├── signup/             # Registration page
│   ├── profile/            # User profile pages
│   ├── forgotpassword/     # Password recovery
│   ├── verifyemail/        # Email verification
│   └── layout.tsx
├── db/                     # Database configuration
├── models/                 # MongoDB models
├── helpers/                # Utility functions
│   ├── mailer.ts          # Email sending
│   └── getDataFromToken.ts # JWT token handling
└── proxy.ts               # API proxy configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB instance
- Email service credentials (for sending emails)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file with your configuration:

```env
MONGO_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
MAILER_EMAIL=your_email@gmail.com
MAILER_PASSWORD=your_app_password
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Endpoints

- `POST /api/users/signup` - Create new user account
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout
- `GET /api/users/me` - Get current user info
- `POST /api/users/forgotpassword` - Request password reset
- `POST /api/users/resetpassword` - Reset password with token
- `POST /api/users/verifyemail` - Verify email address

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Documentation](https://jwt.io/)
