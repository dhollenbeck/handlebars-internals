# Special Data Identifiers


# @root

Handlebars supports path expressions to navigate up data context. For example:
```hbs
{{../../foo.bar}}
```

It also supports:
```hbs
{{@root.foo.bar}}
{{helper @root.foo.bar}}
{{helper param1=@root.foo.bar}}
```

```js
var context = {stooges: ['Larry', 'Curly', 'Moe'], dogs: ['Lilly', 'Moca'], author: 'Dan'};
var template = Handlebars.compile('{{#each stooges}}{{#each ../dogs}}{{@root.author}},{{/each}}{{/each}}');
template(context); // => "Dan,Dan,Dan,Dan,Dan,Dan,"
```
# Custom Special Data Identifiers

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
var rootContext = {dog: 'lilly'};
var template = Handlebars.compile('{{#outer}}{{dog}},{{@foo}}{{/outer}}');
template(rootContext); // => lilly,bar
```
