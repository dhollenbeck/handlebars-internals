# Compiler Options

>This is a study of Handlebars compiler options.

You can compile Handlebars templates in Node.js like:
```hs
var html = '...';
var options = {...};
var template = Handlebars.complile(html, options);
```

The options values are:
- **data** (boolean): Defaults to true. Set to false to disable special @data variable tracking.

- **compat** (boolean): Set to true to enable recursive field lookup. Handlebars deviates from Mustache slightly in that it does not perform recursive lookup by default. The compile time `compat` flag must be set to enable this functionality. Users should note that there is a performance cost for enabling this flag. The exact cost varies by template, but it's recommended that performance sensitive operations should avoid this mode and instead opt for explicit path references.

- **knownHelpers** (hash): Hash containing list of helpers that are known to exist (truthy) at template execution time. Passing this allows the compiler to optimize a number of cases. Builtin helpers are automatically included in this list and may be omitted by setting that value to false.

- **knownHelpersOnly** (boolean): Set to true to allow further optimzations based on the known helpers list.

- **noEscape** (boolean): Set to true to not HTML escape any content.

- **strict** (boolean): Run in strict mode. In this mode, templates will throw rather than silently ignore missing fields. This has the side effect of disabling inverse operations such as {{^foo}}{{/foo}} unless fields are explicitly included in the source object.

- **assumeObjects** (boolean): Removes object existence checks when traversing paths. This is a subset of strict mode that generates optimized templates when the data inputs are known to be safe.

- **preventIndent** (boolean): By default, an indented partial-call causes the output of the whole partial being indented by the same amount. This can lead to unexpected behavior when the partial writes pre-tags. Setting this option to true will disable the auto-indent feature.

- **ignoreStandalone** (boolean): Disables standalone tag removal when set to true. When set, blocks and partials that are on their own line will not remove the whitespace on that line.

- **explicitPartialContext** (boolean): Disables implicit context for partials. When enabled, partials that are not passed a context value will execute against an empty object.

# Example: High Performance Document Rendering Engine

For performance sensitive applications should pass in a hash of known helper names to the computer.

```js
var legalTemplate = '...';
var template = Handlebars.compile(html, {
  data: false, // turn off @data variable tracking
  compat: false, // use explict paths
  strict: false, // silently ignore missing fields
  knownHelpersOnly: true,
  knownHelpers: {
    helper1: true,
    helper2: true
  },
  preventIndent: true, // each subtemplate will not be indented
  noEscape: true, // danger here


});
```