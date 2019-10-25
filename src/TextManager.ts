import insertParams from './middleware/insert-params';
import noTextFallback from './middleware/no-text-fallback';


export type Middleware = (text: string, parameters: StringMap<string>, code: string) => string;

export interface StringMap<T> {
  [x: string]: T;
}

export default class TextManager {
  public static createDefaultTextManager() {
    return new TextManager([insertParams, noTextFallback]);
  }

  private keys: string[] = [];
  private texts: StringMap<string> = {};
  private readonly middleware: Middleware[] | undefined;

  constructor(middleware?: Middleware[]) {
    if (middleware && !Array.isArray(middleware)) throw new TypeError('TextManager: middleware must be an array or undefined');

    this.middleware = middleware;
  }

  public addTexts(key: string, texts: StringMap<string>) {
    if (typeof texts !== 'object') throw new TypeError('TextManager: texts must be an object');

    // skip if resources with given key have been already registered
    if (this.keys.indexOf(key) > -1) return;

    // extend texts
    for (const code in texts) {
      if (texts.hasOwnProperty(code)) {
        this.texts[code] = texts[code];
      }
    }
    this.keys.push(key);
  }

  public getText(code: string, parameters: StringMap<string>): string {
    return this.applyMiddleware(this.texts[code], parameters, code);
  }

  private applyMiddleware(text: string, parameters: StringMap<string>, code: string) {
    if (!this.middleware) return text;

    return this.middleware.reduce((prevText, middlewareItem, index) => {
      if (typeof middlewareItem !== 'function') throw new TypeError('TextManager: middleware[' + index + '] must be a function');

      return middlewareItem(prevText, parameters, code);
    }, text);
  }
}
