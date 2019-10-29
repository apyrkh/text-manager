import { assert } from 'chai';
import { noTextFallback } from '../../src';


describe(noTextFallback.name, () => {
  it(`should return code if text is not falsy`, () => {
    const text = 'text';

    assert.strictEqual(noTextFallback('text.code', text), text);
  });

  it(`should return code if text has falsy value`, () => {
    const code = 'text.code';

    assert.strictEqual(noTextFallback(code, ''), code);
  });
});
