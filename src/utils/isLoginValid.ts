export function isLoginValid(login: string): boolean {
  return /@mail.ru/.test(login);
}
