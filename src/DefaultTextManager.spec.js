import assert from 'assert';
import { describe } from 'mocha';
import DefaultTextManager from './DefaultTextManager';


const textsBundle = {
  'text.hello': 'Hello',
  'text.hello_with_numeric_parameter': 'Hello {{0}}',
  'text.hello_with_named_parameter': 'Hello {{value}}',
};

describe('DefaultTextManager tests', function() {
  let textManager;

  beforeEach(function() {
    textManager = new DefaultTextManager();
    textManager.addTexts('text', textsBundle);
  });

  it(`should return code if text with the code is not registered`, function() {
    const notExistentCode = 'nonexistent.code';
    assert.strictEqual(textManager.getText(notExistentCode), notExistentCode);
  });

  it('should return text by the code', function() {
    const textCode = 'text.hello';
    assert.strictEqual(textManager.getText(textCode), 'Hello');
  });

  it('should return text by the code with numeric parameter', function() {
    const textCode = 'text.hello_with_numeric_parameter';
    assert.strictEqual(textManager.getText(textCode, ['Peter']), 'Hello Peter');
  });

  it('should return text by the code with named parameter', function() {
    const textCode = 'text.hello_with_named_parameter';
    assert.strictEqual(textManager.getText(textCode, { value: 'Peter' }), 'Hello Peter');
  });
});
