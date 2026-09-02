export type SkillType = 'PHATAM' | 'TUVUNG' | 'THI' | 'GIOITU' | 'GIAOTIEP' | 'DOC';

export interface RawQuestion {
  cau: number;
  kyNang: SkillType;
  hoi: string;
  A: string;
  B: string;
  C: string;
  D: string;
  dapAn: 'A' | 'B' | 'C' | 'D';
}

export interface PreparedOption {
  key: string; // Dynamic label in current display (A, B, C, D)
  text: string; // The option content
}

export interface ExamQuestion {
  originalCau: number;
  kyNang: SkillType;
  hoi: string;
  options: PreparedOption[];
  correctAnswerText: string;
}

export interface StudentAnswers {
  [questionIndex: number]: string; // stores chosen option text
}

export interface SkillDetail {
  dung: number;
  tong: number;
}

export interface ChiTietResult {
  PHATAM: SkillDetail;
  TUVUNG: SkillDetail;
  THI: SkillDetail;
  GIOITU: SkillDetail;
  GIAOTIEP: SkillDetail;
  DOC: SkillDetail;
}

export interface SubmissionPayload {
  ten: string;
  lop: string;
  diem: number;
  tongCau: number;
  url: string;
  chiTiet: ChiTietResult;
}
