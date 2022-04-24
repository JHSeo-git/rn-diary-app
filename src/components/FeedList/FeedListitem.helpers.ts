import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export function formatDate(date: string) {
  const d = new Date(date);
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000;

  if (diff < 60) {
    return '방금 전';
  }
  if (diff < 60 * 60 * 24 * 3) {
    return formatDistanceToNow(d, { addSuffix: true, locale: ko });
  }
  return format(d, 'PPP EEE p', { locale: ko });
}

export function truncate(text: string) {
  // 정규식을 사용해 모든 줄 바꿈 문자 제거
  const replaced = text.replace(/\n/g, ' ');
  if (replaced.length <= 100) {
    return replaced;
  }
  return replaced.slice(0, 100).concat('...');
}
