#### 数组去重的方法：


```JavaScript
方法一：
function removeDup1 (arr) {
    // 用于存放的临时数组
    var temp = [];
    for (var i = 0; i < arr.length; i++) {
        //如果当前数组的第i已经保存进了临时数组，那么跳过，
        //否则把当前项push到临时数组里面
        if(temp.indexOf(arr[i]) == -1){
        temp.push(arr[i]);
        }
    }
    console.log(temp);
    return temp;
}
此方法有所局限性，不适用于数组中的Object去重，适用于Number，Boolen，String类型去重；例如：
1. var arr1 = [4, 9, 16, 25,4,9];
2. var arr2 = ['4', '9', '16', '25','4','9'];
3. var arr3 = [false,true,false,true,true,1,0]

```

```JavaScript
方法二：
function removeDup2(arr,id) {
    var h = {},      // 定义hash表
        temp = [];   // 定义临时数组
    for (var i = 0; i < arr.length; i++) {
      // 判断是否存在hash表中，不存在hash，则存入hash，存在则跳过
      if (!h[arr[i][id]]) {
        h[arr[i][id]] = true;
        temp.push(arr[i])
      }
    }
    console.log(temp);
    return temp;
}
例如：
var arr1 = [{
    "name": "name1",
    "age": "20",
    "gender": "AAAAAA.doc"
    }, {
    "name": "name2",
    "age": "21",
    "gender": "BBBBBB.doc"
    }, {
    "name": "name3",
    "age": "22",
    "gender": "CCCCCC.doc"
    }, {
    "name": "name1",
    "age": "23",
    "gender": "AAAAAA.doc"
    }];

此方法适用于数组中的对象去重，通过数组对象中是否存在唯一的id进行区分，id输入时为String；
若数组中的对象类型为Number，Boolean，String，可使用：

function removeDup3 (arr) {
    var h = {},      // 定义hash表
        temp = [];   // 定义临时数组
    for (var i = 0; i < arr.length; i++) {
      // 判断是否存在hash表中，不存在hash，则存入hash，存在则跳过
      if (!h[arr[i]]) {
        h[arr[i]] = true;
        temp.push(arr[i])
      }
    }
    console.log(temp);
    return temp;
  }

```
```JavaScript
方法三：
function removeDup4 (arr) {
    var temp = [];
    for (var i = 0; i < arr.length; i++) {
      //如果数组当前元素在此数组中第一次出现的位置不是i
      //那么我们可以判断第i项元素是重复的，否则直接存入临时数组
      if (arr.indexOf(arr[i]) == i ) {
        temp.push(arr[i])
      }
    }
    console.log(temp);
    return temp;
  }

此方法不适用于数组中的对象去重，适用于Number，Boolean，String类型去重；

```
```JavaScript
方法四（骚操作）：
function removeDup5 (arr) {
    var hash = {};
    // reduce方法：接收两个参数：1、每一项上调用的函数Fn，2、作为归并的初始值（可选）
    // 根据hash表匹配，类似方法二
    // 具体见reduce()用法
    arr.reduce(function(item,next){
      hash[next.name] ? '' : hash[next.name] = true && item.push(next);
      return item;
    },[])
  }

适用于各种类型去重，类似方法二，但是巧妙应用了reduce()；

```
```JavaScript
方法五（ES6）：
function  removeDup6 (arr) {
    // Set是ES6中的新对象，允许存储任意类型的唯一值（不能重复），无论是原始值还是对象的引用
    console.log(new Set(arr));
    // Array.from将set对象转变成Array
    return Array.from(new Set(arr))
  }

不适用于数组中的对象去重，适用于Number，Boolean，String类型；

```
