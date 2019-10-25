import insertParams from './middleware/insert-params';
import noTextFallback from './middleware/no-text-fallback';


export type Middleware = (text: string, parameters: StringArray, code: string) => string;

export interface StringArray {
  [key: string]: string | number;

  [index: number]: string;
}

export interface StringMap {
  [key: string]: string;
}

export default class TextManager {
  public static createDefaultTextManager() {
    return new TextManager([insertParams, noTextFallback]);
  }

  private keys: string[] = [];
  private texts: StringMap = {};
  private readonly middleware: Middleware[] | undefined;

  constructor(middleware?: Middleware[]) {
    if (middleware && !Array.isArray(middleware)) throw new TypeError('TextManager: middleware must be an array or undefined');

    this.middleware = middleware;
  }

  public addTexts(key: string, textsBundle: StringMap) {
    if (typeof textsBundle !== 'object') throw new TypeError('TextManager: textsBundle must be an object');

    // skip if resources with given key have been already registered
    if (this.keys.indexOf(key) > -1) return;

    // extend texts
    for (const code in textsBundle) {
      if (textsBundle.hasOwnProperty(code)) {
        this.texts[code] = textsBundle[code];
      }
    }
    this.keys.push(key);
  }

  public getText(code: string, parameters: StringArray): string {
    return this.applyMiddleware(this.texts[code], parameters, code);
  }

  private applyMiddleware(text: string, parameters: StringArray, code: string) {
    if (!this.middleware) return text;

    return this.middleware.reduce((prevText, middlewareItem, index) => {
      if (typeof middlewareItem !== 'function') throw new TypeError('TextManager: middleware[' + index + '] must be a function');

      return middlewareItem(prevText, parameters, code);
    }, text);
  }
}
