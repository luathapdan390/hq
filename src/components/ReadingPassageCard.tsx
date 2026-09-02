import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { READING_PASSAGE } from '../data/questions';

interface ReadingPassageCardProps {
  defaultExpanded?: boolean;
}

export const ReadingPassageCard: React.FC<ReadingPassageCardProps> = ({ defaultExpanded = true }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <section
      id="reading-passage-section"
      className="bg-white rounded-3xl border-4 border-indigo-100 p-5 sm:p-6 flex flex-col shadow-sm mb-5 text-gray-800"
    >
      <div className="flex items-center justify-between gap-2 border-b-2 pb-3 mb-4 border-dashed border-indigo-200">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl" role="img" aria-label="Book">📖</span>
          <div>
            <span className="text-xs font-black tracking-widest text-indigo-500 uppercase">Phần Đọc hiểu</span>
            <h2 className="text-base sm:text-lg font-black text-indigo-950 tracking-tight uppercase">
              BÀI ĐỌC: {READING_PASSAGE.title}
            </h2>
          </div>
        </div>
        <button
          id="toggle-reading-passage-btn"
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors cursor-pointer"
        >
          {isExpanded ? (
            <>
              <span>Thu gọn</span>
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>Xem bài đọc</span>
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {isExpanded && (
        <div
          id="reading-passage-content"
          className="space-y-3 text-sm sm:text-base leading-relaxed text-gray-700 max-h-72 sm:max-h-80 overflow-y-auto pr-2 custom-scrollbar select-text"
        >
          <p className="font-extrabold text-base sm:text-lg text-center text-indigo-600 underline tracking-wider mb-2">
            {READING_PASSAGE.title}
          </p>
          {READING_PASSAGE.paragraphs.map((para, index) => (
            <p key={index} className="bg-[#FFFBEB]/70 p-3.5 rounded-2xl border border-amber-200/70 font-normal">
              {para}
            </p>
          ))}
        </div>
      )}
    </section>
  );
};

