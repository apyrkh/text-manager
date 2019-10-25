import { assert } from 'chai';
import TextManager from '../dist/TextManager';


const textsBundle = {
  'text.hello': 'Hello',
  'text.hello_with_numeric_parameter': 'Hello {{0}}',
  'text.hello_with_named_parameter': 'Hello {{value}}',
};

describe('DefaultTextManager', function() {
  let textManager;

  beforeEach(function() {
    textManager = TextManager.createDefaultTextManager();
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
