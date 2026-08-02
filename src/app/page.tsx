'use client';

import Link from 'next/link';
import { subjects } from '@/data/questions';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          🎓 Cambridge Quiz
        </h1>
        <p className="text-xl text-gray-600 mb-2">Grade 6</p>
        <p className="text-lg text-gray-500 max-w-md mx-auto">
          Test your knowledge in Math, English, and Science!
          Each quiz has 10 questions with a 10-second timer per question.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {subjects.map((subject) => (
          <Link
            key={subject.id}
            href={`/quiz/${subject.id}`}
            className="group relative overflow-hidden rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              backgroundColor: `${subject.color}15`,
              border: `3px solid ${subject.color}`,
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              style={{ backgroundColor: subject.color }}
            />
            <span className="text-6xl mb-4 block" role="img" aria-label={subject.name}>
              {subject.icon}
            </span>
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: subject.color }}
            >
              {subject.name}
            </h2>
            <p className="text-gray-600">10 Questions • 15 Seconds Each</p>
            <div
              className="mt-4 inline-block px-6 py-2 rounded-full text-white font-semibold transition-all duration-300 group-hover:shadow-lg"
              style={{ backgroundColor: subject.color }}
            >
              Start Quiz →
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center text-gray-500 text-sm">
        <p>📚 Cambridge Curriculum • ⏱️ Timed Questions • 📊 Instant Results</p>
      </div>
    </main>
  );
}
