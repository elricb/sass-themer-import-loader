# sass-themer-import

Creates a list of scss @import statements prior to sass parsing.  Intended to be run prior to the  [sass-loader](https://github.com/webpack-contrib/sass-loader).

## Options & Defaults

### Replace (optional)

[object] Replace can take variables (like webpack parameters) and integrate them into the import statements.

The below example replaces instances of "#{VAR1}" with the defined HOST and "#{VAR2}" with "test".

```javascript
    loader: 'sass-themer-loader',
    options: {
        replace: {
            '#{VAR1}': process.env.HOST,
            '#{VAR2}': 'test',
            'abc':     '123'
        }
    }
```


## Sample Of use

### webpack.config.js

Inside your webpack config (webpack.config.js). Add the loader and set your options.


```javascript
export.default = {
    //...
    module: {
        //...
        {
            test: /scss\.json$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'style-loader',
                    options: {}
                },
                {
                    loader: 'css-loader',
                    options: {}
                },
                {
                    loader: 'postcss-loader',
                    options: {}
                },
                {
                    loader: 'sass-loader',
                    options: {}
                },
                {
                    loader: 'sass-themer-import',
                    options: {
                        replace: {
                            '${ENV}' : process.env.npm_lifecycle_event,
                            '${TEST}' : 'abc123'
                        }
                    }
                }
            ]
        }
    }
};
```

### scss.json

This file is in json array format.  Inside your sass.json file (or whatever you want to name it), set the path to your sass file (without the .scss).
```json
[
    "~public/scss/themes/default/${TEST}/index",
    "~public/scss/themes/greyform/index",
    "~public/scss/themes/mysite/index"
]
```

### output

Here's an example of what the sass parser will receive.  All global variables and mix-ins will be shared/passed down.  All paths are mandatory, so just insert a blank index.scss if the path isn't used.

```scss
@import '~public/scss/themes/default/abc123/index';
@import '~public/scss/themes/greyform/index';
@import '~public/scss/themes/mysite/index';
```
