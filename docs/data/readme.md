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
  - [In Expressions](./context#context-data-in-expressions)
  - [In Parial](./context#context-data-in-partials)
  - [In Helpers](./context#context-data-in-helpers)
- Context Config Data
  - [In Expressions](./context-config#config-data-in-expressions)
  - [Data Tracking](./context-config#data-tracking)
- Special Identifiers
  - [@root](./special#@root)

