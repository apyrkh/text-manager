module.exports = {
  require: [
    'ts-node/register'
  ],
  recursive: true,
  spec: [
    'test/**/*.spec.ts'
  ],
  timeout: 5000,
}
