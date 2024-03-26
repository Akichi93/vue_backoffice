import moment from 'moment';

export function formatDate(dateString, formatString = 'DD/MM/yyyy') {
  return moment(dateString).format(formatString);
}

export function formatDateTime(dateString, formatString = 'DD/MM/yyyy HH:mm:ss') {
  return moment(dateString).format(formatString);
}