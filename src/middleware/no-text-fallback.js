export default function noTextFallback(text, parameters, code) {
  return text ? text : code;
}
