const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

const code = `function mirror(something) {
  return something
}`;
const ast = parser.parse(code, {
  sourceType: 'module',
});
const strNode = t.stringLiteral('mirror');
const visitor = {
  ReturnStatement(path) {
    path.traverse({
      Identifier(cpath) {
        console.log(cpath);
        cpath.replaceWith(strNode);
      },
    });
  },
};
traverse(ast, visitor);
const transformedCode = generate(ast).code;
console.log(transformedCode);
