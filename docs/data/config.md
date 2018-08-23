
# Config Data in Expressions

Config data is not directly accessible from expressions.

```js
var context = {};
var contextConfig = {data: {foo: 'bar'}};
var template = Handlebars.compile('{{foo}}');
template(context, contextConfig); // => ''
```

However, you can access config data via the special '@' identifier.

```js
var context = {};
var contextConfig = {data: {foo: 'bar'}};
var template = Handlebars.compile('{{@foo}}');
template(context, contextConfig); // => 'bar'
```

You can access config data via helper params and partials as well.

```hbs
{{@foo}}
{{helper @foo}}
{{helper param1=@foo}}
{{>partial @foo param1=@foo}}
```

# Config Data in Partials

You can access config data using the special '@' identifier regardless of the context.

```js
Handlebars.registerPartial('partial', '{{@feature}},');
var context = {stooges: ['Larry', 'Curly', 'Moe'], dogs: ['Lilly', 'Moca'], author: 'Dan'};
var contextConfig = {data: {feature: 'yes'}};
var template = Handlebars.compile('{{#each stooges}}{{#each ../dogs}}{{> partial}}{{/each}}{{/each}}');
template(context, contextConfig); // => "yes,yes,yes,yes,yes,yes,"
```

# Config Data in Helpers

You can access config data in helpers

```js
Handlebars.registerHelper('helper', function(options) {
  return options.data.feature;
});
var context = {stooges: ['Larry', 'Curly', 'Moe'], dogs: ['Lilly', 'Moca'], author: 'Dan'};
var contextConfig = {data: {feature: 'yes'}};
var template = Handlebars.compile('{{helper}}');
template(context, contextConfig); // => 'yes'
```

Config data can't conflict with the context data in helpers.

```js
Handlebars.registerHelper('helper', function(options) {
  return options.data.feature + options.data.root.feature;
});
var context = {feature: 'no'};
var contextConfig = {data: {feature: 'yes'}};
var template = Handlebars.compile('{{helper}}');
template(context, contextConfig); // => 'yesno'
```
# Context Config Data Tracking

You can turn off context-config data being passed to helpers by setting the compile-config data to false.

```js
Handlebars.registerHelper('helper', function(options) {
  return options.data.feature
    + options.data.root.feature;
});
var context = {feature: 'no'};
var contextConfig = {data: {feature: 'yes'}};
var compileConfig = {data: false};
var template = Handlebars.compile('{{helper}}', compileConfig);
template(context, contextConfig); // => throws exception
```
