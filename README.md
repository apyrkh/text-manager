# text-manager

Simple lightweight text manager allows to manage texts, e.g. localize texts in web application

## Installation

`npm i text-manager -S`

## TL;DR

```javascript
// 1. initialize TextManager
import { DefaultTextManager } from 'text-manager';
const textManager = new DefaultTextManager();

// 2. register text bundle
const buttonTexts = {
  'button.open': 'Open',
  'button.open_in': 'Open in {{0}} seconds',
  'button.close_in': 'Close in {{seconds}} seconds',
};
textManager.addTexts('buttons', buttonTexts);

// 3. use it
textManager.getText('button.open') === 'Open'; // get a text without parameters
textManager.getText('button.open_in', [5]) === 'Open in 5 seconds'; // get a text with ordered parameters
textManager.getText('button.close_in', { seconds: 5 }) === 'Close in 5 seconds'; // get a text with named parameters
```

## Getting started

In common case text manager is used to get a text or a parameterized text by the code.

### Texts bundle

Texts bundle is an object where a key is the `code` and a value is the `text`.
`text` may contain or may not contain parameters.
Parameter is a number or a variable name. Parameter must be surrounded with double braces `{{<parameter>}}`. 

Example:
```json
{
  "button.open": "Open",
  "button.open_in": "Open in {{0}} seconds",
  "button.close_in": "Close in {{seconds}} seconds"
}
```

## Advanced guide

### Default middleware

The following middleware is used in `DefaultTextManager`:
- `text-manager/middleware/InsertParams` - inserts params in the text
- `text-manager/middleware/UseCodeIfNoText` - returns the code if a text is not found

### Custom middleware

In some cases it's needed to specify custom set of middleware, e.g. parsing markdown, formatting numbers, dates and etc.
In this case text manager can be used with a custom set of middleware.

```javascript
import { TextManager } from 'text-manager';

function CustomMiddleware1(text, parameters, code) {
  return text + ' Hello';
}

function CustomMiddleware2(text, parameters, code) {
  return text + ' World!';
}

const buttonTexts = {
  'button.open': 'Open',
};
const textManager = new TextManager([CustomMiddleware1, CustomMiddleware2]);
textManager.addTexts('buttons', buttonTexts);

// get text
textManager.getText('button.open') === 'Open Hello World!';
```

## API

### TextManager API:

- `constructor(middleware)`
  - `middleware`, array of [middleware](#middleware) functions

- `addTexts(key, textsBundle)`
  - `key`, string - the key of a bundle
  - `textsBundle`, object - a flat object where key is a `code` and value is a `text`, e.g. `{ 'button.open': 'Open' }`

- `getText(code, parameters)`
  - `code`, string - the code of a text
  - `parameters`, array/object - parameters, e.g. `[5, 'abc']`, `{ seconds: 5 }`

### Middleware

Middleware is a function which gets `text`, `parameters` and `code` and returns text.

- `function(text, parameters, code)` - returns text
  - `text`, string - initial text or text from previous middleware
  - `parameters`, object/array - parameters
  - `code`, string - the code of a text
