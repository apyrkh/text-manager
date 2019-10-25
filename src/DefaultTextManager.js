import insertParams from './middleware/insert-params';
import noTextFallback from './middleware/no-text-fallback';
import TextManager from './TextManager';


export default function DefaultTextManager() {
  return new TextManager([insertParams, noTextFallback]);
}
