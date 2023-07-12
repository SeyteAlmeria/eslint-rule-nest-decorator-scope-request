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
      scopeRequiredMessage:
        "Decorator {{ decorator }} require property scope with value Scope.REQUEST",
    },
  },
  create(context) {
    return {
      ClassDeclaration(node) {
        if (node && node.decorators) {
          let scope = "Without SCOPE";
          let decoratorName = "Without DECORATOR";

          for (let decorator of node.decorators) {
            decoratorName = decorator.expression?.callee?.name ?? "";

            if (
              !["Controller", "Injectable", "Processor"].includes(decoratorName)
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
                const property = argument.properties.find(
                  (p) => p.key?.name === "scope"
                );

                if (!property) {
                  context.report({
                    node,
                    messageId: "scopeRequiredMessage",
                    data: {
                      decorator: decoratorName,
                    },
                  });
                }

                if (property) {
                  scope = property.value.property?.name;
                  if (scope !== "REQUEST") {
                    context.report({
                      node,
                      messageId: "scopeMessage",
                      data: {
                        scope,
                        decorator: decoratorName,
                      },
                    });
                  }
                }
              } else {
                context.report({
                  node,
                  messageId: "scopeRequiredMessage",
                  data: {
                    decorator: decoratorName,
                  },
                });
              }
            }
          }
        }
      },
    };
  },
};
