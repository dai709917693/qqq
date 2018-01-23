import axios from 'axios';
import {
  baseURL,
  proBaseURL,
  token,
  userName
} from '@/config/info';
import param from '@/modules/param';
import bridge from '@/modules/bridge'
var env = param.searchObj.env || process.env.NODE_ENV; //判断运行环境
//基础请求url,区分dfbase和base
let options = {
  baseURL: baseURL
}

if (env === 'production') {
  options.baseURL = proBaseURL;
}

//添加post请求头
let postOption = {
  transformRequest: [function(data) {
    // Do whatever you want to transform the data
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}
//创建实例
var instance = axios.create(options);
var access_token = '';
var requestHandle = function(config) {
  config.params = config.params || {};
  //post请求添加头信息
  if (config.method === 'post') {
    !config.headers['Content-Type'] && Object.assign(config, postOption);
  }
  if (env == 'dev' || env == 'development') {
    /*config.params.access_token = token;*/
    config.params.userName = userName;
  } else {
    //调原生bridge
    /*return bridge('getAccessToken', null)
      .then(function(token) {
        config.params.access_token = token;
        return Promise.resolve(config);
      }, function(err) {
        return Promise.reject(err);
      })*/
    //原生bridge getUserInfo
    return bridge('getUserInfo', null)
      .then(function(user) {
        console.log("user", user)
        if (user && typeof user == "string") {
          try {
            var userInfo = JSON.parse(user);
            config.params.userName = userInfo.userId;
          } catch (e) {
            console.log(e)
          }
        } else if (user) {
          config.params.userName = user.userId;
        }
        return Promise.resolve(config);
      }, function(err) {
        return Promise.reject(err);
      })
  }
  return config;
};
var responseHandle = function(response) {
  return response.data;
};
var errorHandle = function(error) {
  return Promise.reject(error);
};
instance.interceptors.request.use(requestHandle, errorHandle);

instance.interceptors.response.use(responseHandle, errorHandle);

export default instance;
