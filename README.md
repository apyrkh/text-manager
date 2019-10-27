# Text manager

[![npm version](https://badge.fury.io/js/text-manager.svg)](https://badge.fury.io/js/text-manager)
[![npm](https://img.shields.io/npm/dm/text-manager.svg?colorB=brightgreen)](https://www.npmjs.com/package/text-manager)

[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

Lightweight extensible text manager allows to manage texts, e.g. localize texts in web application


## Installation

`npm i text-manager -S`


## TL;DR

```javascript
// 1. initialize
import { createDefaultTextManager } from 'text-manager';
const textManager = createDefaultTextManager();

// 2. register texts
const buttonTexts = {
  'button.open': 'Open',
  'button.open_in': 'Open in {{0}} seconds',
  'button.close_in': 'Close in {{seconds}} seconds',
};
textManager.addTexts('buttons', buttonTexts);

// 3. use
textManager.getText('button.open') === 'Open'; // get a text without parameters
textManager.getText('button.open_in', [5]) === 'Open in 5 seconds'; // get a text with ordered parameters
textManager.getText('button.close_in', { seconds: 5 }) === 'Close in 5 seconds'; // get a text with named parameters
```


## Getting started

Text manager is used to get a text or a parameterized text by the code.
It can also be extended for additional text changes or modifications via middleware, e.g. hiding sensitive information.

### Texts bundle

Texts bundle is a plain object where a key is the `code` and a value is the `text`.
Text may contain or may not contain parameters. Parameter must be surrounded with double braces `{{<parameter>}}`.
Parameter must be specified by the name or a sequence number. 

Example:
```json
{
  "button.open": "Open",
  "button.open_in": "Open in {{0}} seconds",
  "button.close_in": "Close in {{seconds}} seconds"
}
```

### Default text manager

Default `TextManager` is used get a parameterized text by the code. If a text is not found it returns the code.

Example:
```javascript
import { createDefaultTextManager } from 'text-manager';
const textManager = createDefaultTextManager();
textManager.addTexts('buttons', buttonTexts);

textManager.getText('button.open'); // 'Open'
textManager.getText('button.open_in', [5]); // 'Open in 5 seconds'
textManager.getText('button.close_in', { seconds: 5 }); // 'Close in 5 seconds'
textManager.getText('button.save'); // 'button.save' - there is no text for the code
```

### Middleware

In some cases addition text modifications are needed, e.g. parsing markdown, formatting numbers, dates and etc.
This can be reached by extending `TextManager` with a custom list of [middleware](#middleware).

Middleware is a function which receives `text`, `parameters` and `code` and must return a text.
Middleware functions are being executed one by one in sequence. Each of them receives text from the previous one.
The first one receives original text or `undefined` if it doesn't exist.
The result of the last one will be returned by `TextManger.getText`.

The following middleware functions are built-in and used in `createDefaultTextManager`
- `import { insert-params } from 'text-manage'` - inserts params in the text
- `import { no-text-fallback } from 'text-manage'` - returns the code if a text is not found

Example:
```javascript
import TextManager from 'text-manager';

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

### TextManager

- `constructor(middleware)`
  - `middleware`, array of middleware functions

- `addTexts(key, texts)`
  - `key`, string - required, the key of a bundle
  - `texts`, object - required, a flat object where key is a `code` and value is a `text`, e.g. `{ 'button.open': 'Open' }`

- `getText(code, parameters)`
  - `code`, string - required, the code of a text
  - `parameters`, array/object - parameters, e.g. `[5, 'abc']`, `{ seconds: 5 }`

### Middleware

- `function(text, parameters, code)` - returns string
  - `text`, string - initial text or text from previous middleware
  - `parameters`, object/array - parameters
  - `code`, string - the code of a text
