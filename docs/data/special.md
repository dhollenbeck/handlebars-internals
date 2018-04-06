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

