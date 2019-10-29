import { assert } from 'chai';
import TextManager from '../src/TextManager';


function addZeroMiddleware(code: string, text: string) {
  return text + '0';
}

function addOneMiddleware(code: string, text: string) {
  return text + '1';
}

describe(TextManager.name, () => {
  let textManager: TextManager;

  const textCode = 'text.hello';
  const text = 'Hello';


  describe('without middleware', () => {
    beforeEach(() => {
      textManager = new TextManager();
    });

    it('should return empty string if there is no text for the given code', () => {
      assert.strictEqual(textManager.getText(textCode), '');
    });

    it('should return text for the given code', () => {
      textManager.addTexts('test', {
        [textCode]: text,
      });

      assert.strictEqual(textManager.getText(textCode), text);
    });

    it('should not add texts for the same id multiple times', () => {
      textManager.addTexts('test', {
        [textCode]: text,
      });

      const newCode = 'code.new_text';
      textManager.addTexts('test', {
        [textCode]: 'Overridden text',
        [newCode]: 'Multi registration',
      });

      assert.strictEqual(textManager.getText(textCode), text);
      assert.strictEqual(textManager.getText(newCode), '');
    });
  });

  describe('with middleware', () => {
    beforeEach(() => {
      textManager = new TextManager([addZeroMiddleware, addOneMiddleware]);
    });

    it('should apply middleware if there is no text for the given code', () => {
      assert.strictEqual(textManager.getText(textCode), '01');
    });

    it('should apply middleware if there is a text for the given code', () => {
      textManager.addTexts('test', {
        [textCode]: text,
      });

      assert.strictEqual(textManager.getText(textCode), `${text}01`);
    });
  });
});
