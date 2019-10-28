export type Middleware = (text: string, parameters: StringMap<string>, code: string) => string;

// either object or array like object
export interface StringMap<T> {
  [x: string]: T;
}


export default class TextManager {
  private keys: string[] = [];
  private texts: { [key: string]: string } = {};
  private readonly middleware: Middleware[] = [];

  constructor(middleware?: Middleware[]) {
    if (middleware) {
      this.middleware.push(...middleware);
    }
  }

  public addTexts(key: string, texts: { [key: string]: string }): void {
    // skip if resources with given key have been already registered
    if (this.keys.indexOf(key) > -1) return;

    for (const [key, value] of Object.entries(texts)) {
      this.texts[key] = value;
    }

    this.keys.push(key);
  }

  public getText(code: string, parameters?: StringMap<string>): string {
    return this.applyMiddleware(this.texts[code] || '', parameters || Object.create(null), code);
  }

  private applyMiddleware(text: string, parameters: StringMap<string>, code: string): string {
    if (this.middleware.length === 0) return text;

    return this.middleware.reduce((prevText, middlewareItem) => middlewareItem(prevText, parameters, code), text);
  }
}
