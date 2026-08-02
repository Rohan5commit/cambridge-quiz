'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Question } from '@/data/questions';

interface QuizResults {
  subjectId: string;
  subjectName: string;
  subjectColor: string;
  questions: Question[];
  answers: (string | null)[];
}

interface ResultItem {
  question: Question;
  userAnswer: string | null;
  isCorrect: boolean;
  correctAnswerDisplay: string;
}

export default function ResultsPage() {
  const [results, setResults] = useState<QuizResults | null>(null);
  const [resultItems, setResultItems] = useState<ResultItem[]>([]);
  
  useEffect(() => {
    const stored = sessionStorage.getItem('quizResults');
    if (stored) {
      const data: QuizResults = JSON.parse(stored);
      setResults(data);
      
      const items = data.questions.map((q, index) => {
        const userAnswer = data.answers[index];
        let isCorrect = false;
        
        if (userAnswer) {
          if (Array.isArray(q.correctAnswer)) {
            isCorrect = q.correctAnswer.includes(userAnswer.toLowerCase());
          } else {
            isCorrect = q.correctAnswer.toLowerCase() === userAnswer.toLowerCase();
          }
        }
        
        const correctAnswerDisplay = Array.isArray(q.correctAnswer)
          ? q.correctAnswer[0]
          : q.correctAnswer;
        
        return {
          question: q,
          userAnswer,
          isCorrect,
          correctAnswerDisplay,
        };
      });
      
      setResultItems(items);
    }
  }, []);
  
  if (!results) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">No quiz results found</h1>
          <Link href="/" className="text-blue-500 hover:underline">Go back home</Link>
        </div>
      </main>
    );
  }
  
  const score = resultItems.filter(item => item.isCorrect).length;
  const total = resultItems.length;
  const percentage = Math.round((score / total) * 100);
  
  const getScoreMessage = () => {
    if (percentage === 100) return 'Perfect! 🌟';
    if (percentage >= 80) return 'Great job! 🎉';
    if (percentage >= 60) return 'Good effort! 👍';
    if (percentage >= 40) return 'Keep practicing! 💪';
    return 'Try again! 📚';
  };
  
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Quiz Complete! 🎓
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            {results.subjectName} Quiz Results
          </p>
        </div>
        
        <div
          className="rounded-2xl p-8 text-center text-white mb-8"
          style={{ backgroundColor: results.subjectColor }}
        >
          <div className="text-6xl font-bold mb-2">{score}/{total}</div>
          <div className="text-2xl mb-4">{percentage}%</div>
          <div className="text-xl opacity-90">{getScoreMessage()}</div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Answer Review</h2>
          <div className="space-y-4">
            {resultItems.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 ${
                  item.isCorrect
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">
                    {item.isCorrect ? '✅' : '❌'}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 mb-1">
                      {index + 1}. {item.question.question}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Your answer:</span>{' '}
                      <span className={item.isCorrect ? 'text-green-600' : 'text-red-600'}>
                        {item.userAnswer || 'No answer'}
                      </span>
                    </p>
                    {!item.isCorrect && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Correct answer:</span>{' '}
                        <span className="text-green-600">
                          {item.correctAnswerDisplay}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/quiz/${results.subjectId}`}
            className="px-8 py-4 text-lg font-semibold text-white rounded-xl transition-all duration-200 hover:scale-105 text-center"
            style={{ backgroundColor: results.subjectColor }}
          >
            🔄 Try Again
          </Link>
          <Link
            href="/"
            className="px-8 py-4 text-lg font-semibold text-gray-700 bg-gray-100 rounded-xl transition-all duration-200 hover:bg-gray-200 text-center"
          >
            🏠 Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
