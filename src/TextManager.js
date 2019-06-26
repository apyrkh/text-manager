/**
 * @param middleware - array of functions, middleware
 */
export default function TextManager(middleware) {
  if (middleware && !Array.isArray(middleware))
    throw new Error('TextManager: middleware must be an array or undefined');

  const keys = [];
  const texts = {};

  function applyMiddleware(text, parameters, code) {
    if (!middleware) return text;

    return middleware.reduce((prevText, middlewareItem, index) => {
      if (typeof middlewareItem !== 'function')
        throw new Error('TextManager: middleware[' + index + '] must be a function');

      return middlewareItem(prevText, parameters, code);
    }, text);
  }

  /**
   * @param key - any, unique key of the texts bundle
   * @param textsBundle - plain object, object with texts like { [code]: <text> }
   */
  function addTexts(key, textsBundle) {
    // skip if resources with given key have been already registered
    if (keys.indexOf(key) > -1) return;

    if (typeof textsBundle !== 'object') throw new Error('TextManager: addTexts parameters must be an object or an array');

    // extend texts
    for (let code in textsBundle) {
      if (textsBundle.hasOwnProperty(code)) {
        texts[code] = textsBundle[code];
      }
    }
    keys.push(key);
  }

  /**
   * @param code - string, the code of the text
   * @param parameters - array/object, parameters if necessary
   * @returns string, text processed by the middleware
   */
  function getText(code, parameters) {
    return applyMiddleware(texts[code], parameters, code);
  }

  return {
    addTexts,
    getText,
  };
}
