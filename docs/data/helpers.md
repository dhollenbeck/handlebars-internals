# Helper Data

# Scoped Custom Special Data Identifiers

You can create a block helper which scopes your custom special data.

```hbs
Handlebars.registerHelper('outer', function (options) {
	var ret = '', data;
	var context = this;
	if (options.data) {
		data = Handlebars.createFrame(options.data);
		data.foo = 'bar'; // <--- set special data property
		options.data = data;
	}
	ret = options.fn(context, {data: data});
	return ret;
});
var rootContext = {};
var template = Handlebars.compile('{{#outer}}{{@foo}}{{/outer}}');
template(rootContext); // => bar
```

# Passing Data Between Nested Helpers

