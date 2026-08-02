'use client';

import { useState } from 'react';
import { Question } from '@/data/questions';

interface QuizCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  selectedAnswer: string | null;
  isAnswered: boolean;
  timeUp: boolean;
  accentColor: string;
}

export default function QuizCard({
  question,
  onAnswer,
  selectedAnswer,
  isAnswered,
  timeUp,
  accentColor,
}: QuizCardProps) {
  const [shortAnswer, setShortAnswer] = useState('');
  
  const getCorrectAnswerDisplay = () => {
    if (Array.isArray(question.correctAnswer)) {
      return question.correctAnswer[0];
    }
    return question.correctAnswer;
  };
  
  const handleSubmitShortAnswer = () => {
    if (shortAnswer.trim()) {
      onAnswer(shortAnswer.trim().toLowerCase());
    }
  };
  
  const isCorrect = (answer: string) => {
    if (Array.isArray(question.correctAnswer)) {
      return question.correctAnswer.includes(answer.toLowerCase());
    }
    return question.correctAnswer.toLowerCase() === answer.toLowerCase();
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-2 mb-4">
        <span
          className="px-3 py-1 rounded-full text-sm font-medium text-white"
          style={{ backgroundColor: accentColor }}
        >
          {question.type === 'true-false' ? 'True/False' :
           question.type === 'multiple-choice' ? 'Multiple Choice' : 'Short Answer'}
        </span>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {question.question}
      </h2>
      
      {timeUp && (
        <div className="mb-4 p-4 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-red-700 font-medium">⏱️ Time's up!</p>
          <p className="text-red-600 text-sm">Correct answer: {getCorrectAnswerDisplay()}</p>
        </div>
      )}
      
      {question.type === 'true-false' && (
        <div className="grid grid-cols-2 gap-4">
          {[true, false].map((value) => {
            const answer = value.toString();
            const isSelected = selectedAnswer === answer;
            const isCorrectAnswer = isCorrect(answer);
            const showResult = isAnswered;
            
            return (
              <button
                key={answer}
                onClick={() => onAnswer(answer)}
                disabled={isAnswered}
                className={`p-6 rounded-xl text-xl font-semibold transition-all duration-200 ${
                  showResult && isCorrectAnswer
                    ? 'bg-green-100 border-2 border-green-500 text-green-700'
                    : showResult && isSelected && !isCorrectAnswer
                    ? 'bg-red-100 border-2 border-red-500 text-red-700'
                    : isSelected
                    ? 'text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                } ${!isAnswered ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'}`}
                style={!showResult && isSelected ? { backgroundColor: accentColor } : {}}
              >
                {value ? '✓ True' : '✗ False'}
              </button>
            );
          })}
        </div>
      )}
      
      {question.type === 'multiple-choice' && question.options && (
        <div className="grid grid-cols-1 gap-3">
          {question.options.map((option) => {
            const isSelected = selectedAnswer === option;
            const isCorrectAnswer = isCorrect(option);
            const showResult = isAnswered;
            
            return (
              <button
                key={option}
                onClick={() => onAnswer(option)}
                disabled={isAnswered}
                className={`p-4 rounded-xl text-left transition-all duration-200 ${
                  showResult && isCorrectAnswer
                    ? 'bg-green-100 border-2 border-green-500 text-green-700'
                    : showResult && isSelected && !isCorrectAnswer
                    ? 'bg-red-100 border-2 border-red-500 text-red-700'
                    : isSelected
                    ? 'text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                } ${!isAnswered ? 'cursor-pointer hover:scale-[1.02]' : 'cursor-not-allowed'}`}
                style={!showResult && isSelected ? { backgroundColor: accentColor } : {}}
              >
                <span className="font-medium">{option}</span>
              </button>
            );
          })}
        </div>
      )}
      
      {question.type === 'short-answer' && (
        <div className="space-y-4">
          <input
            type="text"
            value={shortAnswer}
            onChange={(e) => setShortAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isAnswered && handleSubmitShortAnswer()}
            disabled={isAnswered}
            placeholder="Type your answer here..."
            className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors disabled:bg-gray-50"
          />
          {!isAnswered && (
            <button
              onClick={handleSubmitShortAnswer}
              disabled={!shortAnswer.trim()}
              className="w-full p-4 text-lg font-semibold text-white rounded-xl transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: accentColor }}
            >
              Submit Answer
            </button>
          )}
          {isAnswered && (
            <div className={`p-4 rounded-xl border-2 ${
              selectedAnswer && isCorrect(selectedAnswer)
                ? 'bg-green-50 border-green-500'
                : 'bg-red-50 border-red-500'
            }`}>
              <p className={selectedAnswer && isCorrect(selectedAnswer) ? 'text-green-700' : 'text-red-700'}>
                <span className="font-medium">Your answer:</span> {selectedAnswer || 'No answer'}
              </p>
              {!(selectedAnswer && isCorrect(selectedAnswer)) && (
                <p className="text-green-700">
                  <span className="font-medium">Correct answer:</span> {getCorrectAnswerDisplay()}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
