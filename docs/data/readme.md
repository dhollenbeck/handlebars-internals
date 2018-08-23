# Handlebars Data

>This is a study of passing data to Handlebars templates and how to access that data from the templates and from inside of helper functions.

There are many different Handlebars data:
- **Context:** Is data passed into the template function as the first parameter.
- **Config:** Is data passed into the template function as the second parameter.
- **Special:** Is the data created by handlebars helpers and accessed via the `@` prefix.
- **Options:** Is the compiler options.

```js
var context = {foo: 'bar'};
var config = {data:{feature: true}};
var options = {};
var template = Handlebars.compile('{{foo}}', options);
template(context, config);
```

Topics include:
- Context Data
  - [In Expressions](./context.md#context-data-in-expressions)
  - [In Parial](./context.md#context-data-in-partials)
  - [In Helpers](./context.md#context-data-in-helpers)
- Config Data
  - [In Expressions](./context-config.md#config-data-in-expressions)
  - [Data Tracking](./context-config.md#data-tracking)
- Helper Data
  - [Context Data] (helpers.md#context-data)
  - [Scoped Special @data](./special.md#scoped)
- Special @data Variables
  - [@root](http://handlebarsjs.com/reference.html#data-root)
  - [@first](http://handlebarsjs.com/reference.html#data-first)
  - [@index](http://handlebarsjs.com/reference.html#data-index)
  - [@key](http://handlebarsjs.com/reference.html#data-key)
  - [@last](http://handlebarsjs.com/reference.html#data-last)
  - [@level](http://handlebarsjs.com/reference.html#data-level)

