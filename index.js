const loaderUtils = require('loader-utils');
const replaceMap = require('./replaceMap');

module.exports = function (source) {
    const options = Object.assign(
            {},
            {
                base: '',
                replace: false,
                test: false
            },
            loaderUtils.getOptions
                ? loaderUtils.getOptions(this)
                : loaderUtils.parseQuery(this.resourceQuery)
        ),
        themes = JSON.parse(source) || null,
        output = []
        post = options.base ? '/' + options.base : '';

    if (!themes) {
        this.emitWarning(this.resource + ' does not contain valid json.');
        return source;
    }

    themes.map(function ($_theme) {
        output.push(
            '@import "'
            + options.replace ? replaceMap($_theme, options.replace) : $_theme
            + post
            + '";'
        );
    });

    return output.join();
}
