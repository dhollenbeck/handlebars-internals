# awesome-handlebarsjs
Awesome list for Handlebars.js internals. Well not really a curation, but really a collection of resources.

# Decorators
- [Technical Documentation](https://github.com/wycats/handlebars.js/blob/master/docs/decorators-api.md)
- [API Documentation](https://handlebarsjs.com/reference.html)
- [Example](https://github.com/wycats/handlebars.js/blob/master/lib/handlebars/decorators/inline.js)

# AST
- [Technical Documentation](https://github.com/wycats/handlebars.js/blob/master/docs/compiler-api.md)
- [Recursive Node Search Function](https://github.com/SlexAxton/require-handlebars-plugin/blob/master/hbs.js#L224)

# Compiler
[Unit Tests](https://github.com/wycats/handlebars.js/blob/master/spec/compiler.js)

Form reading unit tests:
```js
var html = '{{#if a}}{{/if}}';
var ast = Handlebars.parse(string);
var out1 = new Handlebars.compile(ast, {});
var out2 = new Handlebars.Compiler().compile(ast, {});
Assert.notEqual(out1, out2);
```

# Linters
- https://www.npmjs.com/package/provejs-handlebars

# Tools and Integrations
- https://github.com/tildeio/htmlbars
- https://github.com/stevenvachon/handlebars-html-parser
- https://github.com/SlexAxton/require-handlebars-plugin
- https://github.com/fivetanley/i18nliner-handlebars

# Logic
- https://github.com/wycats/handlebars.js/issues/616#issuecomment-26661146
- https://github.com/wycats/handlebars.js/issues/616#issuecomment-26661146
- https://gist.github.com/pheuter/3515945
