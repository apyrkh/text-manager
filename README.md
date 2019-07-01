# text-manager

Lightweight extensible text manager allows to manage texts, e.g. localize texts in web application


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

Text manager is used to get a text or a parameterized text by the code.
It can also be extended for additional text changes or modifications.

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

`DefaultTextManager` is used get a parameterized text by the code. If a text is not found it returns the code.

Example:
```javascript
import { DefaultTextManager } from 'text-manager';
const textManager = new DefaultTextManager();
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
The first one receives original text(or `undefined` if it's not found).

The following middleware functions are built-in and used in `DefaultTextManager`:
- `text-manager/middleware/InsertParams` - inserts params in the text
- `text-manager/middleware/UseCodeIfNoText` - returns the code if a text is not found

The result of execution of the last one will be returned by `TextManger`.

Example:
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

### TextManager

- `constructor(middleware)`
  - `middleware`, array of [middleware](#middleware) functions

- `addTexts(key, textsBundle)`
  - `key`, string - the key of a bundle
  - `textsBundle`, object - a flat object where key is a `code` and value is a `text`, e.g. `{ 'button.open': 'Open' }`

- `getText(code, parameters)`
  - `code`, string - the code of a text
  - `parameters`, array/object - parameters, e.g. `[5, 'abc']`, `{ seconds: 5 }`

### Middleware

- `function(text, parameters, code)` - returns string
  - `text`, string - initial text or text from previous middleware
  - `parameters`, object/array - parameters
  - `code`, string - the code of a text
