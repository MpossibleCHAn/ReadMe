#### [深复制](https://www.zhihu.com/question/23031215)：

>对象拷贝(Object Copy)就是将一个对象的属性拷贝到另一个有着相同类类型的对象中去。在程序中拷贝对象是很常见的，主要是为了在新的上下文环境中复用对象的部分或全部数据。JavaScript中有两种类型的对象拷贝：浅拷贝(Shallow Copy)、深拷贝(Deep Copy)。

###### 深复制和浅复制的区别

> 深复制和浅复制最根本的区别在于是否是真正获取了一个对象的复制实体，而不是引用。

###### 浅复制:
> 只是拷贝了基本类型的数据(Number、String 、Boolean、Null和Undefined)，而引用类型数据(Object type，比如：Object 、Array 、Function 、Data等)，复制后也是会发生引用，换句话说，浅复制仅仅是指向被复制的内存地址，如果原地址中对象被改变了，那么浅复制出来的对象也会相应改变。


```JavaScript
var obj = {
  name:'chan',
  age:24,
  lang:[
    'chinese',
    'english'
  ],
  edu:true,
  clone:function () {
    console.log('clone');
  }
};

var shallowObj = shallowClone(obj2);
console.log(shallowObj);
// 基本数据类型能被拷贝
shallowObj.name = 'hai';
console.log(obj2.name);      // hai
// 引用数据类型的指向依旧相同
shallowObj.lang[0] = 'test';
console.log(obj2.lang[0]);   //  test

// 浅复制
function shallowClone(src) {
  var dst = {};
  for (var prop in src) {
    // 判断是否存在该属性
    if (src.hasOwnProperty(prop)) {
      dst[prop] = src[prop];
    }
  }
  return dst;
}
```

>因为浅复制只会将对象的各个属性进行依次复制，并不会进行递归复制，而 JavaScript 存储对象都是存地址的，所以浅复制会导致 obj 和 shallowObj 的属性都指向同一块内存地址，导致：

```JavaScript
shallowObj.lang[1] = 'test';
console.log(obj.lang[1]);   //  test
```

> 深复制：在计算机中开辟了一块新的内存地址用于存放复制的对象

```JavaScript
// 深复制
function deepClone(obj, temp) {
  // 定义temp
  var temp = temp || {};
  // 遍历对象
  for ( var i in obj ) {
    // 判断对象属性是否是object（objec，Array）
    if ( typeof obj[i] === 'object' ) {
      // 对象属性的构造函数是否是Array
      temp[i] = ( obj[i].constructor === Array ) ? [] : {};
      // 递归
      deepClone(obj[i], temp[i]);
    } else {
      temp[i] = obj[i];　　　
    }　　　　
  }　　
  return temp;　　
}
```

> 而深复制则不同，它不仅将原对象的各个属性逐个复制出去，而且将原对象各个属性所包含的对象也依次采用深复制的方法递归复制到新对象上。这就不会存在上面 obj 和 shallowObj 的 lang 属性指向同一个对象的问题。

```JavaScript
shallowObj.lang[0] = 'test';
console.log(obj2.lang[0]);   //  chinese
```
