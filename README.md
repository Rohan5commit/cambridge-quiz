# Cambridge Quiz - Grade 6

A fun, interactive quiz website for 6th grade Cambridge students to test their knowledge in Math, English, and Science.

## Features

- **Three Subjects**: Mathematics, English, and Science
- **Question Types**: True/False, Multiple Choice, and Short Answer
- **10 Questions Per Quiz**: Each quiz contains 10 carefully selected questions
- **10-Second Timer**: Timed questions with visual countdown
- **Auto-Grading**: True/False and Multiple Choice questions are automatically graded
- **Flexible Short Answers**: Short answer questions accept multiple correct responses
- **Detailed Results**: Shows score, correct/wrong answers, and correct answers for wrong questions
- **Responsive Design**: Works great on laptops and desktop computers
- **No Login Required**: Students can start quizzes immediately

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rohan5commit/cambridge-quiz.git
   cd cambridge-quiz
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page with subject selection
│   ├── globals.css         # Global styles
│   ├── quiz/
│   │   └── [subject]/
│   │       └── page.tsx    # Quiz page for each subject
│   └── results/
│       └── page.tsx        # Results page after quiz completion
├── components/
│   ├── Timer.tsx           # Countdown timer component
│   └── QuizCard.tsx        # Question display component
└── data/
    └── questions.ts        # Quiz questions and subjects data
```

## Adding More Questions

To add more questions, edit `src/data/questions.ts` and add questions to the appropriate subject array:

```typescript
{
  id: 11,
  type: 'multiple-choice',
  question: 'Your question here?',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctAnswer: 'Option A',
}
```

For short answer questions, you can provide multiple accepted answers:

```typescript
{
  id: 12,
  type: 'short-answer',
  question: 'Your question here?',
  correctAnswer: ['answer1', 'answer2', 'answer3'],
}
```

## Deployment to Vercel

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.

3. Click "New Project" and import your repository.

4. Vercel will automatically detect Next.js and configure the build settings.

5. Click "Deploy" and your site will be live in seconds!

## License

This project is open source and available for educational use.
