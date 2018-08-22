# Helper Data

# Data Context
Inside the helper functions `this` is set to the current data context.

```hbs
Handlebars.registerHelper('helper', function (options) {
	var context = this;
	return context.foo;
});
var rootContext = {foo: 'bar'};
var template = Handlebars.compile('{{helper}}');
template(rootContext); // => bar
```

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

You can pass special data between an outer block helper to inner helper.
```js
Handlebars.registerHelper('outer', function (options) {
	var ret = '', data;
	var context = this;
	if (options.data) {
		data = Handlebars.createFrame(options.data);
		data.foo = 'bar';
		options.data = data;
	}
	ret = options.fn(context, {data: data});
	return ret;
});
Handlebars.registerHelper('inner', function (options) {
	return options.data.foo;
});
var rootContext = {};
var template = Handlebars.compile('{{#outer}}{{inner}}{{/outer}}');
template(rootContext); // => bar
```
