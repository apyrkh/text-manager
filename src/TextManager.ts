export type Middleware = (text: string, parameters: StringMap<string> | undefined, code: string) => string;

// either object or array like object
export interface StringMap<T> {
  [x: string]: T;
}


export default class TextManager {
  private keys: string[] = [];
  private texts: { [key: string]: string } = {};
  private readonly middleware: Middleware[] = [];

  constructor(middleware?: Middleware[]) {
    if (middleware && !Array.isArray(middleware)) throw new TypeError('TextManager: middleware must be either undefined or an array');

    if (middleware) {
      this.middleware.push(...middleware);
    }
  }

  public addTexts(key: string, texts: { [key: string]: string }): void {
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

  public getText(code: string, parameters?: StringMap<string>): string {
    return this.applyMiddleware(this.texts[code], parameters || undefined, code);
  }

  private applyMiddleware(text: string, parameters: StringMap<string> | undefined, code: string): string {
    if (this.middleware.length === 0) return text;

    return this.middleware.reduce((prevText, middlewareItem, index) => {
      if (typeof middlewareItem !== 'function') throw new TypeError('TextManager: middleware[' + index + '] must be a function');

      return middlewareItem(prevText, parameters, code);
    }, text);
  }
}
