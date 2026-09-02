import { SubmissionPayload } from '../types';

const SUBMISSION_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbw00EtPyhylfx8ZUg3o7CFvc5g44RK17byvTJqy8kMY6grcfIVpTAT7Enu9NenGnBFR/exec';

export async function submitExamResults(payload: SubmissionPayload): Promise<boolean> {
  console.log('Đang gửi kết quả bài làm về hệ thống...', payload);

  const payloadString = JSON.stringify(payload);

  try {
    // Attempt standard POST request first
    const response = await fetch(SUBMISSION_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payloadString,
    });

    if (response.ok) {
      console.log('Gửi kết quả thành công qua POST tiêu chuẩn');
      return true;
    }
  } catch (err) {
    console.warn('POST JSON standard threw error, attempting fallback send:', err);
  }

  // Fallback for Google Apps Script CORS redirection quirks
  try {
    await fetch(SUBMISSION_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: payloadString,
    });
    console.log('Gửi kết quả thành công qua fallback no-cors');
    return true;
  } catch (fallbackErr) {
    console.error('Không thể gửi kết quả về Google Sheet / Telegram:', fallbackErr);
    return false;
  }
}
