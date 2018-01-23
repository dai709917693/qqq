/**
 * Created by lixinyu on 2017/4/13.
 */
var isInitAndroid = false;
function setupWebViewJavascriptBridge(device, callback) {
  if (device == 'android') {
    if (window.WebViewJavascriptBridge) {
      if (!isInitAndroid) {
          WebViewJavascriptBridge.init();
          isInitAndroid = true;
      }
      callback(WebViewJavascriptBridge);
    } else {
      if (!window.WVJBCallbacks) {
        window.WVJBCallbacks = [callback];
        document.addEventListener('WebViewJavascriptBridgeReady', function() {
          WebViewJavascriptBridge.init();
            isInitAndroid = true;
          for (var i = 0, l = window.WVJBCallbacks.length; i < l; i++) {
            window.WVJBCallbacks[i](WebViewJavascriptBridge);
          }
        }, false)
      } else {
        window.WVJBCallbacks.push(callback);
      }
    }
    return;
  }
  if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
  if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }

  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)

}
export default setupWebViewJavascriptBridge;
