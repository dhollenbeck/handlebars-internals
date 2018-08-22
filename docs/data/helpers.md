# Helper Data

# Context Data
Inside the helper functions `this` is set to the current data context.

```js
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

```js
Handlebars.registerHelper('outer', function (options) {
	var data = Handlebars.createFrame(options.data);
	data.foo = 'bar'; // <--- set special data property
	return options.fn(this, {data: data});
});
var rootContext = {};
var template = Handlebars.compile('{{#outer}}{{@foo}}{{/outer}}');
template(rootContext); // => bar
```

# Passing Data Between Nested Helpers

You can pass special data between an outer block helper to inner helper.
```js
Handlebars.registerHelper('outer', function (options) {
	var data = Handlebars.createFrame(options.data);
	data.foo = 'bar'; // <--- set special data property
	return options.fn(this, {data: data});
});
Handlebars.registerHelper('inner', function (options) {
	return options.data.foo; // <--- access special data property
});
var rootContext = {};
var template = Handlebars.compile('{{#outer}}{{inner}}{{/outer}}');
template(rootContext); // => bar
```
