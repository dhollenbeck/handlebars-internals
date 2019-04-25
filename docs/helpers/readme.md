# Helpers

Helpers have two **expressions**:
- **Inline Expression**: `{{myHelper foo}}`
- **Block Expression**: `{{#myHelper foo}}...{{/myHelper}}`

Helpers have two scopes:
- **Global Scope**: registered via Handlebars.registerHelper() and is visible to all templates and partials.
- **Private Scope**: registered via template execution config and is visible to current template and all sub partials.

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
