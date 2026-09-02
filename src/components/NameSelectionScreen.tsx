import React, { useState } from 'react';
import { ArrowRight, Award, CheckCircle2, BookOpen, Clock, UserCheck, Sparkles } from 'lucide-react';
import { SKILL_METADATA } from '../data/questions';
import { SkillType } from '../types';

interface NameSelectionScreenProps {
  onStart: (name: string) => void;
}

export const NameSelectionScreen: React.FC<NameSelectionScreenProps> = ({ onStart }) => {
  const [selectedName, setSelectedName] = useState<string>('');

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedName.trim()) {
      onStart(selectedName.trim());
    }
  };

  const skillKeys: SkillType[] = ['PHATAM', 'TUVUNG', 'THI', 'GIOITU', 'GIAOTIEP', 'DOC'];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 sm:py-12">
      {/* Top Welcome Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-800 border-2 border-indigo-200 font-extrabold text-xs sm:text-sm mb-4 shadow-xs">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>CHƯƠNG TRÌNH THCS • TRÌNH ĐỘ A1–A2</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-indigo-950 tracking-tight leading-snug">
          Luyện Tập Tiếng Anh Lớp 6
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-md mx-auto font-medium">
          Hệ thống 40 câu trắc nghiệm với 6 nhóm kỹ năng quan trọng giúp em củng cố kiến thức và tự tin đạt điểm cao!
        </p>
      </div>

      {/* Main Form Box */}
      <div className="bg-white rounded-3xl shadow-md border-4 border-indigo-100 p-6 sm:p-8 mb-8">
        <form onSubmit={handleStart} className="space-y-6">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="student-name-select"
                className="flex items-center gap-2 text-base font-black text-gray-800"
              >
                <div className="w-7 h-7 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
                <span>Chọn tên của em</span>
                <span className="text-rose-500 font-black">*</span>
              </label>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                Bắt buộc
              </span>
            </div>

            <div className="relative">
              <select
                id="student-name-select"
                value={selectedName}
                onChange={(e) => setSelectedName(e.target.value)}
                className="w-full h-14 pl-4 pr-10 text-base sm:text-lg font-bold text-gray-800 bg-[#FFFBEB]/70 border-4 border-orange-200 rounded-2xl focus:border-indigo-500 focus:bg-white focus:outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="">-- Nhấp để chọn tên của em --</option>
                <option value="Hoàng Quân">Hoàng Quân</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-orange-600 font-black">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 pl-1 font-medium">
              Vui lòng chọn tên để hệ thống chấm điểm và ghi nhận kết quả bài làm của em.
            </p>
          </div>

          <button
            id="start-exam-button"
            type="submit"
            disabled={!selectedName}
            className={`w-full h-14 sm:h-15 rounded-2xl font-black text-base sm:text-xl flex items-center justify-center gap-3 transition-all ${
              selectedName
                ? 'bg-[#22C55E] hover:bg-[#16A34A] text-white shadow-[0_6px_0_0_#15803D] hover:shadow-[0_4px_0_0_#15803D] hover:translate-y-0.5 active:shadow-none active:translate-y-1.5 cursor-pointer'
                : 'bg-gray-200 text-gray-400 border-2 border-gray-300 shadow-none cursor-not-allowed'
            }`}
          >
            <span>BẮT ĐẦU LÀM BÀI</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {/* Feature badges */}
        <div className="mt-7 pt-6 border-t-2 border-dashed border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-indigo-50/70 border-2 border-indigo-100 font-bold text-indigo-900">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>40 câu trắc nghiệm</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-amber-50/70 border-2 border-amber-100 font-bold text-amber-900">
            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Không giới hạn giờ</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-50/70 border-2 border-emerald-100 font-bold text-emerald-900">
            <Award className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Tự động chấm điểm</span>
          </div>
        </div>
      </div>

      {/* Skills breakdown overview */}
      <div className="bg-white rounded-3xl border-4 border-indigo-100 p-5 sm:p-6 shadow-sm">
        <h3 className="text-sm sm:text-base font-black text-indigo-950 mb-3.5 flex items-center gap-2 uppercase tracking-wide">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <span>Cấu trúc 6 nhóm kỹ năng:</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {skillKeys.map((key) => {
            const skill = SKILL_METADATA[key];
            return (
              <div
                key={key}
                className="p-3 rounded-2xl bg-[#FFFBEB]/70 border-2 border-amber-200/80 flex flex-col justify-between"
              >
                <span className="text-xs font-bold text-gray-800 line-clamp-1">{skill.name}</span>
                <span className="text-[11px] font-black text-orange-600 mt-1">{skill.total} câu hỏi</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

