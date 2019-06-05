export default function TextManager(middlewares) {
  const keys = [];
  const bundleTexts = {};

  function applyMiddlewares(text, parameters, code) {
    if (!middlewares) return text;

    return middlewares.reduce((prevText, middleware, index) => {
      if (typeof middleware !== 'function') throw new Error('TextManager: middleware [' + index + '] is not a function');

      return middleware(prevText, parameters, code);
    }, text);
  }

  return {
    registerBundle(key, bundle) {
      // skip if resources with given key have been already registered
      if (keys.indexOf(key) > -1) return;

      if (typeof bundle !== 'object') throw new Error('TextManager: parameters is neither an object nor an array');

      // extend bundleTexts
      for (let key in bundle) {
        if (bundle.hasOwnProperty(key)) {
          bundleTexts[key] = bundle[key];
        }
      }
      keys.push(key);
    },
    getText(code, parameters) {
      return applyMiddlewares(bundleTexts[code], parameters, code);
    }
  };
}
