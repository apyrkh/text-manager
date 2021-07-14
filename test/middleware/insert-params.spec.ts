import { assert } from 'chai';
import { insertParams } from '../../src';


describe(insertParams.name, () => {
  const code = 'any.code';

  it('should return non-parameterized text', () => {
    const text = 'any text';

    assert.strictEqual(insertParams(code, text), text);
    assert.strictEqual(insertParams(code, text, { any: 'any value' }), text);
  });

  it('should insert parameters from array', () => {
    const text = 'Hello {{0}}';

    assert.strictEqual(insertParams(code, text, ['Peter']), 'Hello Peter');
  });

  it('should insert parameters from object', () => {
    const text = 'Hello {{name}}';

    assert.strictEqual(insertParams(code, text, { name: 'Peter' }), 'Hello Peter');
  });

  it('should insert null parameter', () => {
    const text = 'Hello {{name}}';

    assert.strictEqual(insertParams(code, text, { name: null }), 'Hello null');
  });

  it('should insert undefined parameter', () => {
    const text = 'Hello {{name}}';

    assert.strictEqual(insertParams(code, text, { name: undefined }), 'Hello undefined');
  });
});
