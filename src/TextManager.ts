export type Middleware = (code: string, text: string, parameters?: { [key: string]: any } | [any]) => string;


export default class TextManager {
  textsSetIds: string[] = [];
  textsSet: { [key: string]: string } = {};
  middleware: Middleware[] = [];

  constructor(middleware?: Middleware[]) {
    if (middleware) {
      this.middleware.push(...middleware);
    }
  }

  addTexts(id: string, texts: { [key: string]: string }): void {
    // skip if resources with given id have been already registered
    if (this.textsSetIds.indexOf(id) > -1) return;

    for (const [key, value] of Object.entries(texts)) {
      this.textsSet[key] = value;
    }

    this.textsSetIds.push(id);
  }

  getText(code: string, parameters?: { [key: string]: any } | [any]): string {
    return this.applyMiddleware(code, this.textsSet[code] || '', parameters);
  }

  applyMiddleware(code: string, text: string, parameters?: { [key: string]: any } | [any]): string {
    if (this.middleware.length === 0) return text;

    return this.middleware.reduce((prevText, middlewareItem) => middlewareItem(code, prevText, parameters), text);
  }
}
