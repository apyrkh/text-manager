import { StringArray } from '../TextManager';


export default function insertParams(text: string, parameters?: StringArray): string {
  if (!text) return text;
  if (!parameters) return text;

  if (typeof parameters !== 'object') throw new TypeError('InsertParams: parameters must be either an object or an array');

  // insert parameters
  let nextText = text;
  for (const key in parameters) {
    if (parameters.hasOwnProperty(key)) {
      nextText = text.replace('{{' + key + '}}', parameters[key].toString());
    }
  }

  return nextText;
}
