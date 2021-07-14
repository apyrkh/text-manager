import { TextParameters } from '../TextManager';


export default function insertParams(code: string, text: string, parameters?: TextParameters): string {
  let nextText = text;

  if (parameters) {
    for (const [key, value] of Object.entries(parameters)) {
      nextText = text.replace('{{' + key + '}}', value ? value.toString() : `${value}`);
    }
  }

  return nextText;
}
