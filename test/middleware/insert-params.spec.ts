import { assert } from 'chai';
import { insertParams } from '../../src';


const texts = {
  'text.hello': 'Hello',
  'text.hello_with_numeric_parameter': 'Hello {{0}}',
  'text.hello_with_named_parameter': 'Hello {{value}}',
};

describe(insertParams.name, () => {
  it('should not modify text', function() {
    const text = 'any text';

    assert.strictEqual(insertParams(text), text);
    assert.strictEqual(insertParams(text, { any: 'any value' }), text);
  });

  it('should insert numeric parameters', function() {
    const text = 'Hello {{0}}';

    // @ts-ignore
    assert.strictEqual(insertParams(text, ['Peter']), 'Hello Peter');
  });

  it('should insert named parameters', function() {
    const text = 'Hello {{value}}';

    assert.strictEqual(insertParams(text, { value: 'Peter' }), 'Hello Peter');
  });
});
