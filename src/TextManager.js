export default function TextManager(middleware) {
  if (middleware && !Array.isArray(middleware))
    throw new Error('TextManager middleware has wrong type (must be an array or undefined)');

  const keys = [];
  const bundleTexts = {};

  function applyMiddleware(text, parameters, code) {
    if (!middleware) return text;

    return middleware.reduce((prevText, middlewareItem, index) => {
      if (typeof middlewareItem !== 'function')
        throw new Error('TextManager middleware[' + index + '] has wrong type (must be a function)');

      return middlewareItem(prevText, parameters, code);
    }, text);
  }

  return {
    registerBundle(key, bundle) {
      // skip if resources with given key have been already registered
      if (keys.indexOf(key) > -1) return;

      if (typeof bundle !== 'object') throw new Error('TextManager: parameters is neither an object nor an array');

      // extend bundleTexts
      for (let code in bundle) {
        if (bundle.hasOwnProperty(code)) {
          bundleTexts[code] = bundle[code];
        }
      }
      keys.push(key);
    },
    getText(code, parameters) {
      return applyMiddleware(bundleTexts[code], parameters, code);
    }
  };
}
