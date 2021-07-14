import { assert } from 'chai';
import { noTextFallback } from '../../src';


describe(noTextFallback.name, () => {
  const code = 'text.code';

  it(`should return text if it is not blank`, () => {
    const text = 'text';

    assert.strictEqual(noTextFallback(code, text), text);
  });

  it(`should return code if text is blank`, () => {
    assert.strictEqual(noTextFallback(code, ''), code);
  });
});
