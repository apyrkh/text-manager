export default function insertParams(code: string, text: string, parameters?: { [key: string]: any } | [any]): string {
  let nextText = text;

  if (parameters) {
    for (const [key, value] of Object.entries(parameters)) {
      nextText = text.replace('{{' + key + '}}', value.toString());
    }
  }

  return nextText;
}
