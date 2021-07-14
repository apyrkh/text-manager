export type Middleware = (code: string, text: string, parameters?: TextParameters) => string;
export type TextParameters = Record<string, any> | [any];


export default class TextManager {
  keys: string[] = [];
  texts: Record<string, string> = {};
  middleware: Middleware[] = [];

  constructor(middleware?: Middleware[]) {
    if (middleware) {
      this.middleware.push(...middleware);
    }
  }

  addTexts(key: string, texts: Record<string, string>): void {
    // skip if texts with given key have been already registered
    if (this.keys.indexOf(key) > -1) return;

    for (const [key, value] of Object.entries(texts)) {
      this.texts[key] = value;
    }

    this.keys.push(key);
  }

  getText(code: string, parameters?: TextParameters): string {
    return this.applyMiddleware(code, this.texts[code] || '', parameters);
  }

  private applyMiddleware(code: string, text: string, parameters?: TextParameters): string {
    if (this.middleware.length === 0) return text;

    return this.middleware.reduce((prevText, middlewareItem) => middlewareItem(code, prevText, parameters), text);
  }
}
