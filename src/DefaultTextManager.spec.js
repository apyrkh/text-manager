import assert from 'assert';
import { describe } from 'mocha';
import DefaultTextManager from './DefaultTextManager';


const textsBundle = {
  'code.text': 'Text',
  'code.text_with_numeric_parameter': 'Text {{0}}',
  'code.text_with_named_parameter': 'Text {{value}}',
};

describe('DefaultTextManager tests', function() {
  let textManager;

  beforeEach(function() {
    textManager = new DefaultTextManager();
    textManager.registerTexts('text', textsBundle);
  });

  it(`should return code if text with the code is not registered`, function() {
    const notExistentCode = 'nonexistent.code';
    assert.strictEqual(textManager.getText(notExistentCode), notExistentCode);
  });

  it('should return text by the code', function() {
    const textCode = 'code.text';
    assert.strictEqual(textManager.getText(textCode), textsBundle[textCode]);
  });

  it('should return text by the code with numeric parameter', function() {
    const textCode = 'code.text_with_numeric_parameter';
    const parameter = 'test';
    assert.strictEqual(textManager.getText(textCode, [parameter]), textsBundle[textCode].replace('{{0}}', parameter));
  });

  it('should return text by the code with named parameter', function() {
    const textCode = 'code.text_with_numeric_parameter';
    const parameter = 'test';
    assert.strictEqual(textManager.getText(textCode, { value: parameter }), textsBundle[textCode].replace('{{value}}', parameter));
  });
});
