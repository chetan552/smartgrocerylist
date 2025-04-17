# Smart Grocery List

A smart grocery list application built with Next.js and modern web technologies.

## Technology Stack

- [Next.js](https://nextjs.org/) 15.1.6
- [React](https://react.dev/) 19.0.0
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/) 6.3.0
- [NextAuth.js](https://next-auth.js.org/) 4.24.11
- [Tailwind CSS](https://tailwindcss.com/) 3.4.1
- [DaisyUI](https://daisyui.com/) 4.12.23
- [OpenAI](https://platform.openai.com/) 4.82.0

## Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/)
- npm (comes with Node.js)

## Getting Started

1. Clone the repository:
2. Install dependencies:
3. Set up your environment variables:
   Create a `.env` file in the root directory and add necessary environment variables:
   env 
4. DATABASE_URL="your_database_url" 
   NEXTAUTH_SECRET="your_nextauth_secret" 
   NEXTAUTH_URL="[http://localhost:3000](http://localhost:3000)"
   OPENAI_API_KEY="your_openai_api_key"
5. Initialize and set up the database:
   npx prisma generate npx prisma db push
6. Run the development server:
   bash npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Features

- Authentication using NextAuth.js
- Database integration with Prisma
- Modern UI with Tailwind CSS and DaisyUI
- AI-powered features using OpenAI integration
- Real-time updates
- Responsive design

## Available Scripts

- `npm run dev` - Runs the development server
- `npm run build` - Builds the application for production
- `npm start` - Starts the production server
- `npm run lint` - Runs ESLint for code linting

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com/)
- [OpenAI](https://openai.com/)
- [Prisma](https://www.prisma.io/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
## App Demo
https://smartgrocerylist.vercel.app
