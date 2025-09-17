export function getDayDeclension(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'дней';
  }

  if (lastDigit === 1) {
    return 'день';
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return 'дня';
  } else {
    return 'дней';
  }
}
export function getWordDeclension(count: number, forms: [string, string, string]): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return forms[2];
  }

  if (lastDigit === 1) {
    return forms[0];
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return forms[1];
  } else {
    return forms[2];
  }
}
