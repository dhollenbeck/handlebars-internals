# Compiler Options

>This is a study of Handlebars compiler options.

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

Helper functions can be invoked from any number of contexts (eg parials and loops) within a template. Therefore, Handlebars sets the **this** context of the helper function to the current template data context. Therefore, helpers are fully aware of the **current** template data context aware even if you don't directly pass any data to a helper.

```js
Handlebars.registerHelper('fullName', function(person) {

  // `person` is was passed to the handlebars helper
  // via {{fullName person}}, `this` is the current
  // template data context
  Assert.equal(person.firstName, this.person.firstName);
  Assert.equal(person.lastName, this.person.lastName);

  // You can access any other template data context value that was
  // not explicity passed to the helper.  Therefore, helpers are
  // fully data context aware.
  Assert.equal(this.company.name, 'Acme, Inc.');
});
```
Helper functions options.data argument by default are contain:
- current data context
- context tracking (eg data source map) information

```js
Handlebars.registerHelper('hello', function(options) {
  console.log(options.data); // ==> {adjective:'happy', _parent:{adjective: 'happy'}, root:{ noun: 'cat'}}

});
```
The helper function would access this the data context via the helper argument `options.data`. You can not pass the data context to the helpers by setting compiler `data` option to false.

## Compiler Option: Compat

## Compiler Option: KnownHelpers

## Compiler Option: knownHelpersOnly

## Compiler Option: No Escape

##
