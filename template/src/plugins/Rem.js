export default {
    install(Vue, options) {
        var designWidth = 375;
        var baseFontSize = 20;
        if (options && typeof options === 'object' && !isNaN(options.designWidth) && !isNaN(options.baseFontSize)) {
            designWidth = +options.designWidth;
            baseFontSize = +options.baseFontSize;
        }
        var clientWidth = document.body.clientWidth;
        document.documentElement.style.fontSize = clientWidth / designWidth * baseFontSize + 'px';
    }
}