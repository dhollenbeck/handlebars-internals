# Handlebars Data

>This is a study of passing data to Handlebars templates and how to access that data from the templates and from inside of helper functions.

There are many different Handlebars data:
- **Context:** refers to the data passed into the template function as the first parameter.
- **Config:** refers to data passed into the template function as the second parameter.
- **Private:** refers to the data created by handlebars helpers and accessed via the `@` prefix.
- **Settings:** refers to the compiler options.
- **Options:** refers to the last argument of any helper function.

```js
var context = {foo: 'bar'};
var config = {data:{feature: true}};
var settings = {};
var template = Handlebars.compile('{{foo}}', settings);
template(context, config);
```

Topics include:
- Context Data
  - [In Expressions](./context.md#context-data-in-expressions)
  - [In Parial](./context.md#context-data-in-partials)
  - [In Helpers](./context.md#context-data-in-helpers)
- Config Data
  - [In Expressions](./config.md#config-data-in-expressions)
  - [Data Tracking](./context-config.md#data-tracking)
- Helper Data
  - [Context Data] (helpers.md#context-data)
  - [Scoped Private @data](./helpers.md#scoped)
- Private @data Variables
  - [@root](http://handlebarsjs.com/reference.html#data-root)
  - [@first](http://handlebarsjs.com/reference.html#data-first)
  - [@index](http://handlebarsjs.com/reference.html#data-index)
  - [@key](http://handlebarsjs.com/reference.html#data-key)
  - [@last](http://handlebarsjs.com/reference.html#data-last)
  - [@level](http://handlebarsjs.com/reference.html#data-level)

