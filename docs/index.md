# Helpers

Helpers come in two types:
- Inline Expression Helpers (`{{myHelper foo}}`)
- Block Expression Helpers (`{{#myHelper foo}}...{{/myHelper}}`)

Helpers can have two visability:
- Global Helpers: registered via Handlebars.registerHelper() and is visible to all templates and partials.
- Private Helplers: registered via template execution config and is visible to current template and all sub partials.

# Example Register Global Inline Helper
```js
Handlebars.registerHelper('helper', function (options) {
  var context = this;
  return context.foo;
});
var rootContext = {foo: 'bar'};
var template = Handlebars.compile('{{helper}}');
template(rootContext); // => bar
```

# Example Register Private Inline Helper
```js
var config = {
	helpers: {
		helper: function (options) {
			var context = this;
			return context.foo;
		}
	}
};
var context = {foo: 'bar'};
var template = Handlebars.compile('{{helper}}');
template(context, config); // => bar
```
