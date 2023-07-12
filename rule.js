module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce that decorators Controller, Injectable, Processor have scope configured as Scope.REQUEST",
    },
    fixable: "code",
    schema: [],
    messages: {
      scopeMessage:
        "Decorator {{ decorator }} require scope REQUEST, actual scope is '{{ scope }}'",
    },
  },
  create(context) {
    return {
      ClassDeclaration(node) {
        if (node && node.decorators) {
          let isValid = true;
          let scope = "Without SCOPE";
          let decorator = "Without DECORATOR";

          for (let decorator of node.decorators) {
            if (!isValid) continue;

            decorator = decorator.expression?.callee?.name ?? "";

            if (
              !["Controller", "Injectable", "Processor"].includes(decorator)
            ) {
              continue;
            }

            if (
              decorator.expression &&
              decorator.expression.arguments &&
              decorator.expression.arguments[0]
            ) {
              const argument = decorator.expression.arguments[0];

              if (argument.properties) {
                for (let property of argument.properties) {
                  const key = property.key?.name;

                  if (key === "scope") {
                    scope = property.value ?? property.value.property?.name;
                    if (scope !== "REQUEST") {
                      isValid = false;
                    }
                  }
                }
              }
            }
          }

          if (!isValid) {
            context.report({
              node,
              messageId: "scopeMessage",
              data: {
                scope,
                decorator,
              },
            });
          }
        }
      },
    };
  },
};
