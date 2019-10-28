import { StringMap } from '../TextManager';


export default function insertParams(text: string, parameters?: StringMap<string>): string {
  let nextText = text;

  if (parameters) {
    for (const [key, value] of Object.entries(parameters)) {
      nextText = text.replace('{{' + key + '}}', value.toString());
    }
  }

  return nextText;
}
