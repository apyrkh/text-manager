import { StringMap } from '../TextManager';


export default function noTextFallback(text: string, parameters: StringMap<string> | undefined, code: string): string {
  return text ? text : code;
}
