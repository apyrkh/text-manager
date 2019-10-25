export default class TextManager {
  constructor(middleware) {
    if (middleware && !Array.isArray(middleware)) throw new TypeError('TextManager: middleware must be an array or undefined');

    this.middleware = middleware;
    this.keys = [];
    this.texts = {};
  }

  applyMiddleware(text, parameters, code) {
    if (!this.middleware) return text;

    return this.middleware.reduce((prevText, middlewareItem, index) => {
      if (typeof middlewareItem !== 'function') throw new TypeError('TextManager: middleware[' + index + '] must be a function');

      return middlewareItem(prevText, parameters, code);
    }, text);
  }

  addTexts(key, textsBundle) {
    if (typeof textsBundle !== 'object') throw new TypeError('TextManager: addTexts parameters must be an object or an array');

    // skip if resources with given key have been already registered
    if (this.keys.indexOf(key) > -1) return;

    // extend texts
    for (let code in textsBundle) {
      if (textsBundle.hasOwnProperty(code)) {
        this.texts[code] = textsBundle[code];
      }
    }
    this.keys.push(key);
  }

  getText(code, parameters) {
    return this.applyMiddleware(this.texts[code], parameters, code);
  }
}
