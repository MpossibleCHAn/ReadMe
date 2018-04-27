#### 分割URL的方法：


>

```JavaScript
function parseUrl(url) {
  var obj = {},
    proInd = url.indexOf('://'),
    ipInd = null,
    queryInd = url.indexOf('?'),
    fragInd = url.indexOf('#');

  // 网络协议
  obj.protocol = url.substr(0, proInd);
  ipInd = url.indexOf('/', proInd + 3);
  // ip地址
  obj.ip = ipInd != -1 ? url.substr(proInd + 3, ipInd - proInd - 3) : url.substr(proInd + 3);
  if (obj.ip.indexOf(':') != -1) {
    obj.hostname = obj.ip.split(':')[0];
    obj.port = obj.ip.split(':')[1];
  }
  if (queryInd != -1) {
    obj.path = url.substr(ipInd, queryInd - ipInd);
    var temp;
    temp = fragInd == -1 ? url.substr(queryInd + 1).split('&') : url.substr(queryInd + 1, fragInd - queryInd - 1).split('&');
    var query = {};
    for (var i = 0; i < temp.length; i++) {
      query[temp[i].split('=')[0]] = temp[i].split('=')[1];
    }
    obj.query = query;
  } else {
    obj.path = fragInd != -1 ? url.substr(ipInd, fragInd - ipInd) : url.substr(ipInd);
  }
  obj.fragment = fragInd != -1 ? url.substr(fragInd + 1) : '';
  console.log(obj);
  return obj;
}
```
