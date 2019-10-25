import { StringArray } from '../TextManager';


export default function noTextFallback(text: string, parameters: StringArray, code: string): string {
  return text ? text : code;
}
