import insertParams from './middleware/insert-params';
import noTextFallback from './middleware/no-text-fallback';
import TextManager from './TextManager';


export default TextManager;

export function createDefaultTextManager() {
  return new TextManager([insertParams, noTextFallback]);
}

export { insertParams, noTextFallback };
