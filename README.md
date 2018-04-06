# handlebars-internals

The missing Handlbars.js internal documentation.

# Compiler Options

You can compile Handlebars templates in Node.js like:
```hs
var html = '...';
var options = {...};
var template = Handlebars.complile(html, options);
```

The options values are:
- **data** (boolean): Set to false to disable @data tracking.
- **compat** (boolean): Set to true to enable recursive field lookup.
- **knownHelpers** (hash): Hash containing list of helpers that are known to exist (truthy) at template execution time. Passing this allows the compiler to optimize a number of cases. Builtin helpers are automatically included in this list and may be omitted by setting that value to false.
- **knownHelpersOnly** (boolean): Set to true to allow further optimzations based on the known helpers list.
- **noEscape** (boolean): Set to true to not HTML escape any content.
- **strict** (boolean): Run in strict mode. In this mode, templates will throw rather than silently ignore missing fields. This has the side effect of disabling inverse operations such as {{^foo}}{{/foo}} unless fields are explicitly included in the source object.
- **assumeObjects** (boolean): Removes object existence checks when traversing paths. This is a subset of strict mode that generates optimized templates when the data inputs are known to be safe.
- **preventIndent** (boolean): By default, an indented partial-call causes the output of the whole partial being indented by the same amount. This can lead to unexpected behavior when the partial writes pre-tags. Setting this option to true will disable the auto-indent feature.
- **ignoreStandalone** (boolean): Disables standalone tag removal when set to true. When set, blocks and partials that are on their own line will not remove the whitespace on that line.
- **explicitPartialContext** (boolean): Disables implicit context for partials. When enabled, partials that are not passed a context value will execute against an empty object.

## Compiler Option: Data Tracking

## Compiler Option: Compat

## Compiler Option: KnownHelpers

## Compiler Option: knownHelpersOnly

## Compiler Option: No Escape

## 

# Custom Compiler


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

```js
out1: function ret(context, execOptions) {
    if (!compiled) {
      compiled = compileInput();
    }
    return compiled.call(this, context, execOptions);
  }
```
```js
out2: { sourceNode: [],
  opcodes:
   [ { opcode: 'getContext', args: [Array], loc: [Object] },
     { opcode: 'lookupOnContext', args: [Array], loc: [Object] },
     { opcode: 'pushProgram', args: [Array], loc: [Object] },
     { opcode: 'pushProgram', args: [Array], loc: [Object] },
     { opcode: 'emptyHash', args: [Array], loc: [Object] },
     { opcode: 'invokeKnownHelper', args: [Array], loc: [Object] },
     { opcode: 'append', args: [], loc: [Object] } ],
  children:
   [ { sourceNode: [],
       opcodes: [],
       children: [],
       options: [Object],
       stringParams: undefined,
       trackIds: undefined,
       isSimple: false,
       blockParams: 0 } ],
  options:
   { blockParams: [],
     knownHelpers:
      { helperMissing: true,
        blockHelperMissing: true,
        each: true,
        if: true,
        unless: true,
        with: true,
        log: true,
        lookup: true } },
  stringParams: undefined,
  trackIds: undefined,
  guid: 1,
  usePartial: undefined,
  useDepths: undefined,
  isSimple: true,
  blockParams: 0 }
``


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
