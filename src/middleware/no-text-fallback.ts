export default function noTextFallback(code: string, text: string): string {
  return text || code;
}
