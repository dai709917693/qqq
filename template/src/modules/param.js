/**
 * Created by lixinyu on 2017/4/13.
 */
import decodeUrlParams from './decodeUrlParams.js';
var param = {
  search: location.search?location.search.slice(1): '',
  hash: location.hash?location.hash.slice(1):''
};
param.searchObj = decodeUrlParams(param.search);
param.hashObj = decodeUrlParams(param.hash);

export default param;
