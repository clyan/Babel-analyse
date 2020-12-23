const parser = require('@babel/parser');
const generate = require('@babel/generator').default;

const code = `function mirror(something) {
  return something
}`;
const ast = parser.parse(code, {
  sourceType: 'module',
});
const transformedCode = generate(ast).code;
console.log(transformedCode);
