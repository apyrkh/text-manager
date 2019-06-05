export default function InsertParams(text, parameters, code) {
  if (!text) return text;
  if (!parameters) return text;
  if (typeof parameters !== 'object') throw new Error('InsertParams: parameters must be either an object or an array');

  // insert parameters
  let nextText = text;
  for (let key in parameters) {
    if (parameters.hasOwnProperty(key)) {
      nextText = text.replace('{{' + key + '}}', parameters[key]);
    }
  }

  return nextText;
}
