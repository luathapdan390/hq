import React, { useState } from 'react';
import { GraduationCap, Sparkles } from 'lucide-react';
import { ExamQuestion, StudentAnswers } from './types';
import { generateShuffledExam } from './data/questions';
import { NameSelectionScreen } from './components/NameSelectionScreen';
import { ExamScreen } from './components/ExamScreen';
import { ResultScreen } from './components/ResultScreen';

type AppStep = 'name' | 'exam' | 'result';

export default function App() {
  const [step, setStep] = useState<AppStep>('name');
  const [studentName, setStudentName] = useState<string>('');
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<StudentAnswers>({});

  const handleStart = (name: string) => {
    setStudentName(name);
    // Generate freshly randomized exam per anti-memorization rules
    const newExam = generateShuffledExam();
    setQuestions(newExam);
    setCurrentIndex(0);
    setAnswers({});
    setStep('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAnswer = (questionIndex: number, answerText: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerText,
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    setStep('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setStep('name');
    setCurrentIndex(0);
    setAnswers({});
    setQuestions([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getInitials = (name: string) => {
    if (!name) return 'HQ';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBEB] text-slate-800 font-sans selection:bg-amber-200">
      {/* Vibrant Header */}
      <header className="sticky top-0 z-40 bg-[#4F46E5] text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 sm:p-2.5 rounded-2xl shadow-inner flex items-center justify-center">
              <span className="text-xl sm:text-2xl" role="img" aria-label="School Bag">🎒</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-black tracking-tight uppercase leading-tight">
                Học Tiếng Anh Lớp 6
              </h1>
              <p className="text-[11px] sm:text-xs text-indigo-100 font-medium opacity-90 hidden sm:block">
                Chương trình THCS Việt Nam • Trình độ A1–A2
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            {studentName ? (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] sm:text-xs opacity-80 font-bold uppercase tracking-wider">Học sinh</p>
                  <p className="font-extrabold text-sm sm:text-base leading-tight">{studentName}</p>
                </div>
                <div
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-white flex items-center justify-center bg-orange-400 font-black text-sm sm:text-base text-white shadow-sm"
                  title={studentName}
                >
                  {getInitials(studentName)}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-indigo-600/80 px-3.5 py-1.5 rounded-2xl border border-indigo-400/40 text-xs font-bold">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>40 Câu hỏi</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col justify-start">
        {step === 'name' && <NameSelectionScreen onStart={handleStart} />}

        {step === 'exam' && questions.length > 0 && (
          <ExamScreen
            studentName={studentName}
            questions={questions}
            currentIndex={currentIndex}
            answers={answers}
            onSelectAnswer={handleSelectAnswer}
            onNextQuestion={handleNextQuestion}
            onSubmit={handleSubmit}
          />
        )}

        {step === 'result' && (
          <ResultScreen
            studentName={studentName}
            questions={questions}
            answers={answers}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="px-4 sm:px-8 py-4 bg-white border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider gap-2">
        <span>© 2026 ENGLISH 6 • VIETNAM CURRICULUM</span>
        <div className="flex items-center gap-3 text-indigo-500/80 font-bold">
          <span>40 CÂU TRẮC NGHIỆM A1–A2</span>
          <span>•</span>
          <span className="text-orange-500">6 KỸ NĂNG TRỌNG TÂM</span>
        </div>
      </footer>
    </div>
  );
}

