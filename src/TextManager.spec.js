import assert from 'assert';
import { describe } from 'mocha';
import TextManager from './TextManager';


describe('TextManager tests', function() {
  let l10n;

  describe('without middleware', function() {
    beforeEach(function() {
      l10n = new TextManager();
    });

    const textCode = 'code.code';
    const text = 'Text';
    it('should return text by the code', function() {
      l10n.registerBundle('test', {
        [textCode]: text
      });
      assert.strictEqual(l10n.getText(textCode), text);
    });

    it(`should return undefined if text with the code is not registered`, function() {
      assert.strictEqual(l10n.getText(textCode), undefined);
    });
  });

  describe('with middleware', function() {
    function addZeroMiddleware(text) {
      return text + '0';
    }

    function addOneMiddleware(text) {
      return text + '1';
    }

    beforeEach(function() {
      l10n = new TextManager([addZeroMiddleware, addOneMiddleware]);
    });

    const textCode = 'code.code';
    const text = 'Text';
    it(`should return modified by the middleware text by the code`, function() {
      l10n.registerBundle('test', {
        [textCode]: text
      });
      assert.strictEqual(l10n.getText(textCode), `${text}01`);
    });

    it(`should use middleware even if text with the code is not registered`, function() {
      assert.strictEqual(l10n.getText(textCode), 'undefined01');
    });
  });
});
