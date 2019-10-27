import insertParams from './middleware/insert-params';
import noTextFallback from './middleware/no-text-fallback';
import TextManager from './TextManager';


function createDefaultTextManager() {
  return new TextManager([insertParams, noTextFallback]);
}


export default TextManager;
export { createDefaultTextManager, insertParams, noTextFallback };
