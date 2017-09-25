/* @flow */

function transform(babel) {
  const t = babel.types;

  function splitCharCodes(string) {
    return string.split('').map((x) => x.charCodeAt());
  }

  function getCharCodeAtNode(on, key) {
    const memberExpr = t.memberExpression(on, t.identifier('charCodeAt'));
    const fn = t.callExpression(memberExpr, [t.numericLiteral(key)]);

    return fn;
  }

  function toLogicalExpr(l, r) {
    return t.logicalExpression('&&', l, r);
  }

  return {
    visitor: {

      CallExpression(path) {
        const callee = path.node.callee;
        const args = path.node.arguments;

        const name = callee.property ? callee.property.name : '';
        const predicate = args[0] ? args[0].value : null;
        const on = callee.object;

        if (name === 'startsWith' && predicate) {

          const charCodes =
            splitCharCodes(predicate)
            .map((x) => t.identifier(x))
            .map((x, k) => {
              const fn = getCharCodeAtNode(on, k);

              return t.binaryExpression('===', fn, x);
            });

          path.replaceWith(charCodes.reduce(toLogicalExpr));
        }
      }
    }
  };
}

module.exports = transform;
