export function decodeToken(token: string) {
  const base64 = token.split(".")[1];

  const decoded = window.atob(base64);

  console.log(decoded);

  return JSON.parse(decoded);
}
