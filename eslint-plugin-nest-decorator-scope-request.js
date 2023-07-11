const fooBarRule = require("./nest-decorator-scope-request");
const plugin = { rules: { "decorator-scope-request": fooBarRule } };
module.exports = plugin;
