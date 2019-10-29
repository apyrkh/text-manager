import { assert } from 'chai';
import { insertParams } from '../../src';


describe(insertParams.name, () => {
  it('should return non-parameterized text', () => {
    const text = 'any text';

    assert.strictEqual(insertParams('ignored', text), text);
    assert.strictEqual(insertParams('ignored', text, { any: 'any value' }), text);
  });

  it('should return text with inserted named parameters', () => {
    const text = 'Hello {{value}}';

    assert.strictEqual(insertParams('ignored', text, { value: 'Peter' }), 'Hello Peter');
  });

  it('should return text with inserted numeric parameters', () => {
    const text = 'Hello {{0}}';

    assert.strictEqual(insertParams('ignored', text, ['Peter']), 'Hello Peter');
  });
});
