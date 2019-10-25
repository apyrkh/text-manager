import assert from 'assert';
import { describe } from 'mocha';
import TextManager from '../src/TextManager';


const textCode = 'text.hello';
const text = 'Hello';

function addZeroMiddleware(text) {
  return text + '0';
}

function addOneMiddleware(text) {
  return text + '1';
}

describe('TextManager tests', function() {
  let textManager;

  describe('no middleware', function() {
    beforeEach(function() {
      textManager = new TextManager();
    });

    it(`should return undefined if text with the code is not registered`, function() {
      assert.strictEqual(textManager.getText(textCode), undefined);
    });

    it('should return text by the code', function() {
      textManager.addTexts('test', {
        [textCode]: text
      });
      assert.strictEqual(textManager.getText(textCode), text);
    });

    it('should skip multiple registrations for the same key', function() {
      textManager.addTexts('test', {
        [textCode]: text
      });

      const newCode = 'code.new_text';
      textManager.addTexts('test', {
        [textCode]: 'Overridden text',
        [newCode]: 'Multi registration'
      });
      assert.strictEqual(textManager.getText(textCode), text);
      assert.strictEqual(textManager.getText(newCode), undefined);
    });
  });

  describe('middleware', function() {
    beforeEach(function() {
      textManager = new TextManager([addZeroMiddleware, addOneMiddleware]);
    });

    it(`should use middleware if text with the code is not registered`, function() {
      assert.strictEqual(textManager.getText(textCode), 'undefined01');
    });

    it(`should return modified by the middleware text by the code`, function() {
      textManager.addTexts('test', {
        [textCode]: text
      });
      assert.strictEqual(textManager.getText(textCode), `${text}01`);
    });
  });
});
