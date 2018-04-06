# Precompiler Options

>This is a study of Handlebars precompiler options.

You can compile Handlebars templates in Node.js like:
```hs
var html = '...';
var options = {...};
var templateSpec = Handlebars.precomplile('{{}}', options);
```

The output templateSpec would look like:
```text
"{"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.foo || (depth0 != null ? depth0.foo : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"foo","hash":{},"data":data}) : helper)));
},"useData":true}"
```

Options include:

- **srcName** (string): Passed to generate the source map for the input file. When run in this manner, the return structure is {code, map} with code containing the template definition and map containing the source map.

- **destName** (string): Optional parameter used in conjunction with srcName to provide a destination file name when generating source maps.



