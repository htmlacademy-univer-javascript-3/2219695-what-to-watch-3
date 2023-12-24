function checkNumbers(password: string): boolean {
  return /[0-9]+/i.test(password);
}

function checkLetters(password: string): boolean {
  return /[a-zA-zа-яА-я]+/i.test(password);
}

export function isPasswordValid(password: string): boolean {
  return checkNumbers(password) && checkLetters(password);
}
