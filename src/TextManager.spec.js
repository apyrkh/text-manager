import assert from 'assert';
import { describe } from 'mocha';
import TextManager from './TextManager';


const textsBundle = {
  'text.hello': 'Hello',
  'text.items_found': '{{0}} items found',
  'text.total_pages': '{{count}} pages',
};

describe('TextManager:', function() {
  describe('no middleware', function() {
    let l10n;
    beforeEach(function() {
      l10n = new TextManager();
    });

    const helloCode = 'text.hello';
    const helloText = 'Text';
    it('should return text by the code', function() {
      l10n.registerBundle('test', {
        [helloCode]: helloText
      });
      assert.strictEqual(l10n.getText(helloCode), helloText);
    });

    it(`should return undefined if text is unregistered`, function() {
      assert.strictEqual(l10n.getText(helloCode), undefined);
    });
  });
});
