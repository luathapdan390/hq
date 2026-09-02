import React, { useEffect, useState, useMemo } from 'react';
import {
  Trophy,
  RotateCcw,
  CheckCircle,
  XCircle,
  Award,
  Sparkles,
  BookOpen,
  Filter,
  Check,
  X,
  User,
  ExternalLink
} from 'lucide-react';
import { ExamQuestion, StudentAnswers, ChiTietResult, SkillType } from '../types';
import { SKILL_METADATA, READING_PASSAGE } from '../data/questions';
import { submitExamResults } from '../utils/submission';

interface ResultScreenProps {
  studentName: string;
  questions: ExamQuestion[];
  answers: StudentAnswers;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  studentName,
  questions,
  answers,
  onRestart,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'correct' | 'incorrect'>('all');
  const [hasSent, setHasSent] = useState<boolean>(false);
  const [showReadingModal, setShowReadingModal] = useState<boolean>(false);

  // Calculate detailed scores
  const { totalCorrect, chiTiet, questionResults } = useMemo(() => {
    const details: ChiTietResult = {
      PHATAM: { dung: 0, tong: 6 },
      TUVUNG: { dung: 0, tong: 8 },
      THI: { dung: 0, tong: 8 },
      GIOITU: { dung: 0, tong: 6 },
      GIAOTIEP: { dung: 0, tong: 6 },
      DOC: { dung: 0, tong: 6 },
    };

    const results = questions.map((q, index) => {
      const selected = answers[index] || '';
      // Compare strictly by content string
      const isCorrect = selected.trim() === q.correctAnswerText.trim();

      if (isCorrect && details[q.kyNang]) {
        details[q.kyNang].dung += 1;
      }

      return {
        index,
        originalCau: q.originalCau,
        kyNang: q.kyNang,
        hoi: q.hoi,
        selectedAnswer: selected,
        correctAnswerText: q.correctAnswerText,
        isCorrect,
        options: q.options,
      };
    });

    let correctCount = 0;
    Object.values(details).forEach((item) => {
      correctCount += item.dung;
    });

    return {
      totalCorrect: correctCount,
      chiTiet: details,
      questionResults: results,
    };
  }, [questions, answers]);

  // Send results to Google Apps Script / Telegram on mount
  useEffect(() => {
    if (!hasSent) {
      setHasSent(true);
      const payload = {
        ten: studentName,
        lop: '6',
        diem: totalCorrect,
        tongCau: 40,
        url: window.location.href,
        chiTiet: chiTiet,
      };

      submitExamResults(payload).catch((err) => {
        console.error('Lỗi khi gửi kết quả về Google Sheet / Telegram:', err);
      });
    }
  }, [studentName, totalCorrect, chiTiet, hasSent]);

  const skillOrder: SkillType[] = ['PHATAM', 'TUVUNG', 'THI', 'GIOITU', 'GIAOTIEP', 'DOC'];

  const filteredQuestions = useMemo(() => {
    if (filterMode === 'correct') {
      return questionResults.filter((q) => q.isCorrect);
    }
    if (filterMode === 'incorrect') {
      return questionResults.filter((q) => !q.isCorrect);
    }
    return questionResults;
  }, [questionResults, filterMode]);

  const getEvaluation = (score: number) => {
    if (score >= 36) return { text: 'Xuất sắc! Em học rất giỏi!', color: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-800' };
    if (score >= 30) return { text: 'Giỏi lắm! Kết quả rất tốt!', color: 'text-teal-600', badge: 'bg-teal-100 text-teal-800' };
    if (score >= 24) return { text: 'Khá tốt! Hãy tiếp tục phát huy nhé!', color: 'text-blue-600', badge: 'bg-blue-100 text-blue-800' };
    if (score >= 18) return { text: 'Đạt yêu cầu! Em cần ôn thêm một chút!', color: 'text-amber-600', badge: 'bg-amber-100 text-amber-800' };
    return { text: 'Cố gắng lên em nhé! Luyện tập thêm để tiến bộ!', color: 'text-rose-600', badge: 'bg-rose-100 text-rose-800' };
  };

  const evaluation = getEvaluation(totalCorrect);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 sm:py-10">
      {/* Result Hero Header */}
      <div className="bg-[#4F46E5] rounded-3xl text-white p-6 sm:p-8 text-center shadow-lg border-4 border-indigo-300 mb-6 relative overflow-hidden">
        <div className="absolute top-2 right-3 opacity-10 pointer-events-none text-white">
          <Trophy className="w-48 h-48" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xs font-black text-xs sm:text-sm mb-3">
          <User className="w-4 h-4" />
          <span>HỌC SINH: {studentName.toUpperCase()}</span>
          <span>• LỚP 6</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-2">
          Em đúng {totalCorrect}/40 câu
        </h2>

        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="px-5 py-2 rounded-2xl bg-white text-indigo-950 font-black text-sm sm:text-lg shadow-md">
            {evaluation.text}
          </span>
        </div>

        {/* Quick Restart Button */}
        <div className="mt-6 flex justify-center">
          <button
            id="restart-exam-top-button"
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-black text-base shadow-[0_6px_0_0_#15803D] hover:shadow-[0_4px_0_0_#15803D] hover:translate-y-0.5 active:shadow-none active:translate-y-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>LÀM LẠI TỪ ĐẦU</span>
          </button>
        </div>
      </div>

      {/* Six Skills Breakdown Table / Grid */}
      <div className="bg-white rounded-3xl shadow-sm border-4 border-indigo-100 p-5 sm:p-7 mb-6">
        <div className="flex items-center justify-between gap-2 border-b-2 border-dashed border-indigo-100 pb-3 mb-5">
          <h3 className="text-lg sm:text-xl font-black text-indigo-950 flex items-center gap-2 uppercase tracking-wide">
            <Award className="w-6 h-6 text-indigo-600" />
            <span>Kết quả theo 6 nhóm kỹ năng</span>
          </h3>
          <span className="text-xs font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-xl border border-orange-200">
            Tổng 40 câu
          </span>
        </div>

        <div className="space-y-3.5">
          {skillOrder.map((key) => {
            const skill = SKILL_METADATA[key];
            const detail = chiTiet[key];
            const percent = Math.round((detail.dung / detail.tong) * 100);

            return (
              <div
                key={key}
                id={`skill-breakdown-${key}`}
                className="p-4 rounded-2xl bg-[#FFFBEB]/70 border-2 border-amber-200/80"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-3 py-1 rounded-xl text-xs font-black bg-indigo-100 text-indigo-800 border border-indigo-200"
                    >
                      {key}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-gray-800">
                      {skill.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-black text-indigo-950">
                      {detail.dung}/{detail.tong}
                    </span>
                    <span className="text-xs font-bold text-gray-500">({percent}%)</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white border border-gray-200 rounded-full h-3 overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      percent === 100
                        ? 'bg-[#22C55E]'
                        : percent >= 70
                        ? 'bg-emerald-500'
                        : percent >= 50
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-white rounded-3xl shadow-sm border-4 border-indigo-100 p-5 sm:p-7 mb-6">
        {/* Header & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-dashed border-indigo-100 pb-4 mb-5">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-indigo-950 flex items-center gap-2 uppercase tracking-wide">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Chi tiết bài làm từng câu</span>
            </h3>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Đối chiếu đáp án em đã chọn với đáp án chính xác của bài thi.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#FFFBEB] border-2 border-amber-200 rounded-2xl">
            <button
              id="filter-all-btn"
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-indigo-900'
              }`}
            >
              Tất cả (40)
            </button>
            <button
              id="filter-correct-btn"
              type="button"
              onClick={() => setFilterMode('correct')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
                filterMode === 'correct'
                  ? 'bg-[#22C55E] text-white shadow-xs'
                  : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>Đúng ({totalCorrect})</span>
            </button>
            <button
              id="filter-incorrect-btn"
              type="button"
              onClick={() => setFilterMode('incorrect')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
                filterMode === 'incorrect'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-rose-700 hover:bg-rose-50'
              }`}
            >
              <X className="w-3.5 h-3.5" />
              <span>Sai ({40 - totalCorrect})</span>
            </button>
          </div>
        </div>

        {/* Question Review List */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const skill = SKILL_METADATA[q.kyNang];

            return (
              <div
                key={q.index}
                id={`review-question-card-${q.index + 1}`}
                className={`p-4 sm:p-5 rounded-3xl border-4 transition-all ${
                  q.isCorrect
                    ? 'bg-white border-green-200 shadow-xs'
                    : 'bg-white border-rose-200 shadow-xs'
                }`}
              >
                {/* Header row: Question # + Skill + Status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-xl text-xs font-black flex items-center justify-center ${
                        q.isCorrect ? 'bg-[#22C55E] text-white' : 'bg-rose-600 text-white'
                      }`}
                    >
                      {q.index + 1}
                    </span>
                    <span
                      className="px-2.5 py-0.5 rounded-lg border text-xs font-bold bg-indigo-50 text-indigo-700 border-indigo-200"
                    >
                      {skill.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {q.kyNang === 'DOC' && (
                      <button
                        type="button"
                        onClick={() => setShowReadingModal(true)}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline flex items-center gap-1 cursor-pointer mr-1"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Bài đọc</span>
                      </button>
                    )}

                    {q.isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Đúng</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-black text-rose-800 bg-rose-100 px-3 py-1 rounded-full border border-rose-300">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Sai</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Prompt */}
                <h4 className="text-base sm:text-lg font-black text-gray-900 mb-3.5 select-text">
                  {q.hoi}
                </h4>

                {/* Answers Comparison */}
                <div className="space-y-2 text-xs sm:text-sm">
                  <div
                    className={`p-3 rounded-2xl border-2 flex items-start gap-2.5 ${
                      q.isCorrect
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                        : 'bg-rose-50 border-rose-300 text-rose-950'
                    }`}
                  >
                    <span className="font-black shrink-0">Đáp án em chọn:</span>
                    <span className="font-bold">{q.selectedAnswer || '(Chưa chọn)'}</span>
                  </div>

                  {!q.isCorrect && (
                    <div className="p-3 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 flex items-start gap-2.5 font-bold">
                      <span className="font-black text-emerald-800 shrink-0">Đáp án chính xác:</span>
                      <span className="text-emerald-900 font-extrabold">{q.correctAnswerText}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-3xl p-5 sm:p-6 border-4 border-indigo-100 shadow-sm">
        <div className="text-center sm:text-left">
          <h4 className="text-base sm:text-lg font-black text-indigo-950">Em muốn luyện tập lại?</h4>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">Hệ thống sẽ trộn mới toàn bộ thứ tự câu hỏi và đáp án ngẫu nhiên.</p>
        </div>

        <button
          id="restart-exam-bottom-button"
          type="button"
          onClick={onRestart}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-black text-base shadow-[0_6px_0_0_#15803D] hover:shadow-[0_4px_0_0_#15803D] hover:translate-y-0.5 active:shadow-none active:translate-y-1.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          <span>LÀM LẠI TỪ ĐẦU</span>
        </button>
      </div>

      {/* Reading Passage Modal */}
      {showReadingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-4 border-indigo-100 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b-2 border-dashed border-indigo-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl" role="img" aria-label="Book">📖</span>
                <h3 className="font-black text-indigo-950 text-lg uppercase">BÀI ĐỌC: {READING_PASSAGE.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowReadingModal(false)}
                className="w-8 h-8 rounded-full bg-indigo-50 hover:bg-indigo-100 flex items-center justify-center text-indigo-700 cursor-pointer font-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 overflow-y-auto text-sm sm:text-base leading-relaxed text-gray-700 pr-2 custom-scrollbar">
              {READING_PASSAGE.paragraphs.map((p, idx) => (
                <p key={idx} className="bg-[#FFFBEB]/80 p-3.5 rounded-2xl border border-amber-200">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t">
              <button
                type="button"
                onClick={() => setShowReadingModal(false)}
                className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm cursor-pointer shadow-md"
              >
                ĐÓNG BÀI ĐỌC
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
