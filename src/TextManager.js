export default function TextManager(middleware) {
  if (middleware && !Array.isArray(middleware))
    throw new Error('TextManager middleware has wrong type (must be an array or undefined)');

  const keys = [];
  const texts = {};

  function applyMiddleware(text, parameters, code) {
    if (!middleware) return text;

    return middleware.reduce((prevText, middlewareItem, index) => {
      if (typeof middlewareItem !== 'function')
        throw new Error('TextManager middleware[' + index + '] has wrong type (must be a function)');

      return middlewareItem(prevText, parameters, code);
    }, text);
  }

  return {
    registerTexts(key, textsBundle) {
      // skip if resources with given key have been already registered
      if (keys.indexOf(key) > -1) return;

      if (typeof textsBundle !== 'object') throw new Error('TextManager: parameters is neither an object nor an array');

      // extend texts
      for (let code in textsBundle) {
        if (textsBundle.hasOwnProperty(code)) {
          texts[code] = textsBundle[code];
        }
      }
      keys.push(key);
    },
    getText(code, parameters) {
      return applyMiddleware(texts[code], parameters, code);
    }
  };
}
