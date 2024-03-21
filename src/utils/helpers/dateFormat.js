// dateUtils.js

import { format, parseISO } from 'date-fns';

export function formatDate(dateString, formatString = 'dd/MM/yyyy') {
  const date = parseISO(dateString);
  return format(date, formatString);
}

export function formatDateTime(dateString, formatString = 'dd/MM/yyyy HH:mm:ss') {
  const date = parseISO(dateString);
  return format(date, formatString);
}
