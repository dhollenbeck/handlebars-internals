# Handlebars Data

>This is a study of passing data to Handlebars templates and how to access that data from the templates and from inside of helper functions.

There are two ways to pass data into Handlebars templates:
- Context: Is data passed into the template function as the first parameter.
- Context Config: Is data passed into the template function as the second parameter.

```js
var context = {foo: 'bar'};
var contextConfig = {data:{feature: true}};
var template = Handlebars.compile('{{foo}}');
template(context, contextConfig);
```

Topics include:
- Context Data
  - [In Expressions](./context.md#context-data-in-expressions)
  - [In Parial](./context.md#context-data-in-partials)
  - [In Helpers](./context.md#context-data-in-helpers)
- Context Config Data
  - [In Expressions](./context-config.md#config-data-in-expressions)
  - [Data Tracking](./context-config.md#data-tracking)
- Special @data Variables
  - [@root](http://handlebarsjs.com/reference.html#data-root)
  - [@first](http://handlebarsjs.com/reference.html#data-first)
  - [@index](http://handlebarsjs.com/reference.html#data-index)
  - [@key](http://handlebarsjs.com/reference.html#data-key)
  - [@last](http://handlebarsjs.com/reference.html#data-last)
  - [@level](http://handlebarsjs.com/reference.html#data-level)
- Custom Special @data Variables
  - [Block Helpers](./special.md)

