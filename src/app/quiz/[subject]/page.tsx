'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { questions, subjects, Question } from '@/data/questions';
import Timer from '@/components/Timer';
import QuizCard from '@/components/QuizCard';

export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const subjectId = params.subject as string;
  
  const subject = subjects.find(s => s.id === subjectId);
  const subjectQuestions = questions[subjectId] || [];
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(new Array(subjectQuestions.length).fill(null));
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  
  const currentQuestion = subjectQuestions[currentQuestionIndex];
  const totalQuestions = subjectQuestions.length;
  
  const handleTimeUp = useCallback(() => {
    if (!isAnswered) {
      setTimeUp(true);
      setIsAnswered(true);
      
      setTimeout(() => {
        if (currentQuestionIndex < totalQuestions - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setIsAnswered(false);
          setTimeUp(false);
        } else {
          const results = {
            subjectId,
            subjectName: subject?.name || subjectId,
            subjectColor: subject?.color || '#3B82F6',
            questions: subjectQuestions,
            answers,
          };
          sessionStorage.setItem('quizResults', JSON.stringify(results));
          router.push('/results');
        }
      }, 1500);
    }
  }, [isAnswered, currentQuestionIndex, totalQuestions, subjectId, subject, subjectQuestions, answers, router]);
  
  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
    setIsAnswered(true);
    
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsAnswered(false);
      } else {
        const results = {
          subjectId,
          subjectName: subject?.name || subjectId,
          subjectColor: subject?.color || '#3B82F6',
          questions: subjectQuestions,
          answers: newAnswers,
        };
        sessionStorage.setItem('quizResults', JSON.stringify(results));
        router.push('/results');
      }
    }, 1500);
  };
  
  if (!subject || !currentQuestion) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Subject not found</h1>
          <a href="/" className="text-blue-500 hover:underline">Go back home</a>
        </div>
      </main>
    );
  }
  
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <a href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
            ← Back to Home
          </a>
          <div className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>
        </div>
        
        <div className="mb-6">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
                backgroundColor: subject.color,
              }}
            />
          </div>
        </div>
        
        <div className="flex justify-center mb-8">
          <Timer
            key={currentQuestionIndex}
            duration={10}
            onTimeUp={handleTimeUp}
            color={subject.color}
            isPaused={isAnswered}
          />
        </div>
        
        <QuizCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          selectedAnswer={answers[currentQuestionIndex]}
          isAnswered={isAnswered}
          timeUp={timeUp}
          accentColor={subject.color}
        />
      </div>
    </main>
  );
}
