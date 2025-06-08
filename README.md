# Gemini Solver App

A futuristic AI-powered problem solver application built with Next.js 15 and Google's Gemini AI.

## Features

- Modern, futuristic UI with animated background
- Integration with Google's Gemini AI for problem-solving
- Responsive design for all device sizes
- Beautiful animations and transitions

## Prerequisites

- Node.js 18.0.0 or later
- Google Gemini API key

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/yourusername/solver-app.git
cd solver-app
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Gemini API key:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

To get a Gemini API key, visit: [Google AI Studio](https://aistudio.google.com/)

4. Run the development server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Google Gemini AI
- React Icons

## Project Structure

- `/src/app` - Next.js app directory
- `/src/components` - React components
- `/src/lib` - Utility functions
- `/public` - Static assets

## How It Works

1. The user enters a problem or question in the form
2. The application sends the query to the Gemini AI API
3. Gemini processes the request and generates a solution
4. The solution is displayed to the user in a beautifully formatted card

## License

MIT
