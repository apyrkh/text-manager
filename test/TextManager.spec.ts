import { assert } from 'chai';
import TextManager from '../src/TextManager';


const textCode = 'text.hello';
const text = 'Hello';

function addZeroMiddleware(text: string) {
  return text + '0';
}

function addOneMiddleware(text: string) {
  return text + '1';
}

describe(TextManager.name, function() {
  let textManager: TextManager;

  describe('without middleware', function() {
    beforeEach(function() {
      textManager = new TextManager();
    });

    it(`should return empty string if text with the code is not registered`, function() {
      assert.strictEqual(textManager.getText(textCode), '');
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
      assert.strictEqual(textManager.getText(newCode), '');
    });
  });

  describe('with middleware', function() {
    beforeEach(function() {
      textManager = new TextManager([addZeroMiddleware, addOneMiddleware]);
    });

    it(`should use middleware if text with the code is not registered`, function() {
      assert.strictEqual(textManager.getText(textCode), '01');
    });

    it(`should return modified by the middleware text by the code`, function() {
      textManager.addTexts('test', {
        [textCode]: text
      });

      assert.strictEqual(textManager.getText(textCode), `${text}01`);
    });
  });
});
