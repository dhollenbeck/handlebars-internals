
# Config Data in Expressions

Config data is not directly accessible from expressions.

```js
var context = {};
var config = {data: {foo: 'bar'}};
var template = Handlebars.compile('{{foo}}');
template(context, config); // => ''
```

However, you can access config data via the special '@' identifier.

```js
var context = {};
var config = {data: {foo: 'bar'}};
var template = Handlebars.compile('{{@foo}}');
template(context, config); // => 'bar'
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
var config = {data: {feature: 'yes'}};
var template = Handlebars.compile('{{#each stooges}}{{#each ../dogs}}{{> partial}}{{/each}}{{/each}}');
template(context, config); // => "yes,yes,yes,yes,yes,yes,"
```

# Config Data in Helpers

You can access config data in helpers

```js
Handlebars.registerHelper('helper', function(options) {
  return options.data.feature;
});
var context = {stooges: ['Larry', 'Curly', 'Moe'], dogs: ['Lilly', 'Moca'], author: 'Dan'};
var config = {data: {feature: 'yes'}};
var template = Handlebars.compile('{{helper}}');
template(context, config); // => 'yes'
```

Config data can't conflict with the context data in helpers.

```js
Handlebars.registerHelper('helper', function(options) {
  return options.data.feature + options.data.root.feature;
});
var context = {feature: 'no'};
var config = {data: {feature: 'yes'}};
var template = Handlebars.compile('{{helper}}');
template(context, config); // => 'yesno'
```
# Context Config Data Tracking

You can turn off config data being passed to helpers by setting the compile `data` option to false.

```js
Handlebars.registerHelper('helper', function(options) {
  return options.data.feature
    + options.data.root.feature;
});
var context = {feature: 'no'};
var config = {data: {feature: 'yes'}};
var options = {data: false};
var template = Handlebars.compile('{{helper}}', options);
template(context, config); // => throws exception
```
