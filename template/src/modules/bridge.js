/**
 * Created by lixinyu on 2017/4/13.
 */
import setupWebViewJavascriptBridge from './bridgeReady.js';
import UA from 'ua-device';
var client = new UA(navigator.userAgent);
const $device = client.os.name === 'iOS' ? 'ios' : client.os.name === 'Android' ? 'android' : 'pc';

function bridge(method, param, cb, option) {
    var device = $device;
  var flag = false;
  setupWebViewJavascriptBridge(device, function(bridge) {
    bridge.callHandler(method, param || '', function(response) {
      if (flag) { // 已经timeout了
        return;
      }
      flag = true;
      cb && cb(response);
    });
  });
  setTimeout(function() {
    if (!flag) {
      flag = true;
      cb && cb({
        $error: true,
        $errorCode: 'timeout',
        $msg: 'bridge "' + method + '" request timeout'
      });
      throw new Error('bridge "' + method + '" request timeout');
    }
  }, option && option.timeout || 3000);
}
export default function (method, param, option) {
  return new Promise(function (resolve, reject) {
    bridge(method, param, function (res) {
      if (res && res.$error) {
        reject(new Error('bridge:"'+method+'" error'));
        return;
      }
      resolve(res);
    }, option);
  });
}
