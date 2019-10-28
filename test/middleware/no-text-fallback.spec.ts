import { assert } from 'chai';
import { noTextFallback } from '../../src';


describe(noTextFallback.name, () => {
  it(`should return code if text is not falsy`, function() {
    const text = 'text';

    assert.strictEqual(noTextFallback(text, {}, 'text.code'), text);
  });

  it(`should return code if text has falsy value`, function() {
    const code = 'text.code';

    assert.strictEqual(noTextFallback('', {}, code), code);
  });
});
