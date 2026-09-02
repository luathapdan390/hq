import React from 'react';
import { ChevronRight, Send, Sparkles } from 'lucide-react';
import { ExamQuestion, StudentAnswers } from '../types';
import { SKILL_METADATA } from '../data/questions';
import { ReadingPassageCard } from './ReadingPassageCard';

interface ExamScreenProps {
  studentName: string;
  questions: ExamQuestion[];
  currentIndex: number;
  answers: StudentAnswers;
  onSelectAnswer: (questionIndex: number, answerText: string) => void;
  onNextQuestion: () => void;
  onSubmit: () => void;
}

export const ExamScreen: React.FC<ExamScreenProps> = ({
  studentName,
  questions,
  currentIndex,
  answers,
  onSelectAnswer,
  onNextQuestion,
  onSubmit,
}) => {
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const selectedAnswerText = answers[currentIndex];
  const isAnswered = Boolean(selectedAnswerText);
  const skillMeta = SKILL_METADATA[currentQuestion.kyNang];

  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleOptionClick = (optionText: string) => {
    onSelectAnswer(currentIndex, optionText);
  };

  const handleNextOrSubmit = () => {
    if (!isAnswered) return;
    if (isLastQuestion) {
      onSubmit();
    } else {
      onNextQuestion();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 sm:py-8">
      {/* Sub-header Bar: Progress & Skill */}
      <div className="bg-[#E0E7FF] rounded-3xl border-4 border-indigo-200 p-4 sm:p-5 mb-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-100 px-4 py-1 rounded-full text-indigo-800 text-xs sm:text-sm font-black border border-indigo-300">
              {skillMeta.name.toUpperCase()}
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs sm:text-sm font-black text-indigo-950 uppercase tracking-wide">
              Tiến trình: Câu {currentIndex + 1} / {totalQuestions}
            </span>
          </div>
        </div>

        {/* Visual 3D Progress Bar */}
        <div className="w-full bg-white rounded-full h-3.5 overflow-hidden border-2 border-indigo-200/80 p-0.5">
          <div
            className="bg-[#22C55E] h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Reading Passage if question is DOC */}
      {currentQuestion.kyNang === 'DOC' && (
        <ReadingPassageCard defaultExpanded={true} />
      )}

      {/* Question Card */}
      <div
        id={`question-box-${currentIndex + 1}`}
        className="bg-white rounded-3xl border-4 border-orange-200 p-5 sm:p-8 mb-5 shadow-sm"
      >
        {/* Question Header Pill */}
        <div className="mb-4">
          <span className="inline-block bg-orange-100 text-orange-700 px-3.5 py-1 rounded-xl text-xs font-black tracking-wider uppercase mb-2">
            CÂU HỎI {currentIndex + 1}
          </span>
          <h3 className="text-lg sm:text-2xl font-black text-gray-800 leading-snug select-text">
            {currentQuestion.hoi}
          </h3>
        </div>

        {/* Options List */}
        <div className="space-y-3.5">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswerText === option.text;

            return (
              <button
                key={option.key + '-' + option.text}
                id={`option-button-${option.key}`}
                type="button"
                onClick={() => handleOptionClick(option.text)}
                className={`w-full text-left p-4 sm:p-5 rounded-3xl border-4 transition-all flex items-center gap-4 cursor-pointer group ${
                  isSelected
                    ? 'bg-indigo-50/90 border-indigo-500 shadow-md active:scale-98'
                    : 'bg-white border-gray-100 hover:border-indigo-300 hover:bg-indigo-50/30 shadow-xs active:scale-98'
                }`}
              >
                {/* Option Letter Badge */}
                <div
                  className={`h-10 w-10 sm:h-12 sm:w-12 rounded-2xl font-black text-lg sm:text-xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-50 text-gray-400 group-hover:text-indigo-600 group-hover:bg-indigo-50'
                  }`}
                >
                  {option.key}
                </div>

                {/* Option Text */}
                <span
                  className={`text-base sm:text-xl flex-1 ${
                    isSelected
                      ? 'text-indigo-950 font-black'
                      : 'text-gray-700 font-bold group-hover:text-gray-900'
                  }`}
                >
                  {option.text}
                </span>

                {/* Selected Indicator Circle */}
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-600'
                      : 'border-gray-300 group-hover:border-indigo-400'
                  }`}
                >
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="flex items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border-4 border-indigo-100 shadow-sm">
        <div className="text-xs sm:text-sm font-bold pl-2">
          {isAnswered ? (
            <span className="text-emerald-600 flex items-center gap-1.5 font-black">
              <Sparkles className="w-4 h-4" />
              Đã chọn đáp án
            </span>
          ) : (
            <span className="text-orange-600 font-extrabold">Vui lòng chọn 1 đáp án</span>
          )}
        </div>

        <button
          id={isLastQuestion ? 'submit-exam-button' : 'next-question-button'}
          type="button"
          onClick={handleNextOrSubmit}
          disabled={!isAnswered}
          className={`px-6 sm:px-10 py-3.5 sm:py-4 rounded-2xl font-black text-sm sm:text-lg flex items-center gap-2.5 transition-all ${
            isAnswered
              ? isLastQuestion
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-[0_6px_0_0_#BE123C] hover:shadow-[0_4px_0_0_#BE123C] hover:translate-y-0.5 active:shadow-none active:translate-y-1.5 cursor-pointer'
                : 'bg-[#22C55E] hover:bg-[#16A34A] text-white shadow-[0_6px_0_0_#15803D] hover:shadow-[0_4px_0_0_#15803D] hover:translate-y-0.5 active:shadow-none active:translate-y-1.5 cursor-pointer'
              : 'bg-gray-200 text-gray-400 border-2 border-gray-300 shadow-none cursor-not-allowed'
          }`}
        >
          {isLastQuestion ? (
            <>
              <span>NỘP BÀI</span>
              <Send className="w-5 h-5" />
            </>
          ) : (
            <>
              <span>CÂU TIẾP THEO</span>
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

