// src/helpers/numberToWords.js

export function numberToWords(numStr) {
  const ones = [
    '', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'
  ];
  const tens = [
    '', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'
  ];

  if (!numStr) return 'Nombre invalide';

  // Supprimer les espaces pour pouvoir convertir le nombre correctement
  const cleanNum = parseInt(numStr.replace(/\s/g, ''), 10);

  if (isNaN(cleanNum)) return 'Nombre invalide';
  if (cleanNum === 0) return 'zéro';

  function getBelowThousand(n) {
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? '-' + ones[n % 10] : '');
    if (n < 200) return 'cent' + (n % 100 ? ' ' + getBelowThousand(n % 100) : '');
    return ones[Math.floor(n / 100)] + ' cent' + (n % 100 ? ' ' + getBelowThousand(n % 100) : '');
  }

  function getBelowMillion(n) {
    if (n < 1000) return getBelowThousand(n);
    if (n < 2000) return 'mille' + (n % 1000 ? ' ' + getBelowThousand(n % 1000) : '');
    return getBelowThousand(Math.floor(n / 1000)) + ' mille' + (n % 1000 ? ' ' + getBelowThousand(n % 1000) : '');
  }

  function getBelowBillion(n) {
    if (n < 1000000) return getBelowMillion(n);
    if (n < 2000000) return 'un million' + (n % 1000000 ? ' ' + getBelowMillion(n % 1000000) : '');
    return getBelowMillion(Math.floor(n / 1000000)) + ' million' + (n % 1000000 ? ' ' + getBelowMillion(n % 1000000) : '');
  }

  if (cleanNum < 1000000000) return getBelowBillion(cleanNum);
  return 'Nombre trop grand';
}
