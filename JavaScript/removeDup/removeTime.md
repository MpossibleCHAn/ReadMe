## [数组去重的性能对比](https://juejin.im/post/5b0284ac51882542ad774c45)：

随机取100000个正整数：
```JavaScript
    console.time('createTime');
    const arr = [];
    for (let i = 0; i < 100000; i++) {
      arr.push(Math.floor(100000 * Math.random()))
    }
    console.log(arr);
    console.timeEnd('createTime'); // 生成100000个正整数所需时间大概 18ms
```

本次实验采用改写引用类型Array的prototype属性，亦可外部定义function进行调用；

##### 一、双重循环（最简单的一种去重，但性能非常差）
```JavaScript

    // 判断循环对象的状态，进行去重
    Array.prototype.unique = function() {
      const newArray = [];
      let isRepeat;
      for (let i = 0; i < this.length; i++) {
        isRepeat = false;
        for (let j = 0; j < newArray.length; j++) {
          if (this[i] === newArray[j]) {
            isRepeat = true;
            break;
          }
        }
        if (!isRepeat) {
          newArray.push(this[i]);
        }
      }
      return newArray;
    }
    console.time('removeTime');
    console.log(arr.unique1());
    console.timeEnd('removeTime'); // time: 2500ms
```
> 消耗时间大概为：```2500ms```

```JavaScript

    // 另一种双重循环
    Array.prototype.unique = function() {
      const newArr = [];
      let isRepeat;
      for (let i = 0; i < this.length; i++) {
        isRepeat = false;
        for (let j = i + 1; j < this.length; j++) {
          if (this[i] === this[j]) {
            isRepeat = true;
            break;
          }
        }
        if (!isRepeat) {
          newArr.push(this[i]);
        }
      }
      return newArr;
    }
    console.time('removeTime');
    console.log(arr.unique());
    console.timeEnd('removeTime'); // time: 3246ms
```
> 消耗时间大概为：```3246ms```

```JavaScript

    // 另一种双重循环（非常慢）
    Array.prototype.unique = function() {
      const newArr = [];
      for (let i = 0; i < this.length; i++) {
        isRepeat = false;
        for (let j = i + 1; j < this.length; j++) {
          if (this[i] === this[j]) {
            j = ++i
          }
        }
        newArr.push(this[i]);
      }
      return newArr;
    }
    console.time('removeTime');
    console.log(arr.unique());
    console.timeEnd('removeTime'); // time: 6139ms
```
> 消耗时间大概为：```6139ms```

##### 二、indexOf()： 如果索引不是第一个索引，说明是重复值
```JavaScript

    // 利用Array.prototype.filter()过滤功能
    // Array.prototype.indexOf()返回的是第一个索引值
    // 只将数组中元素第一次出现的返回
    // 之后出现的将被过滤掉
    Array.prototype.unique = function() {
      return this.filter((item, index) => {
        return this.indexOf(item) === index;
      })
    }
    console.time('removeTime');
    console.log(arr.unique());
    console.timeEnd('removeTime'); // time: 4139ms
```
> 消耗时间大概为：```4139ms```

```JavaScript

    // 另一种indexO()
    Array.prototype.unique = function() {
      const newArray = [];
      this.forEach(item => {
        if (newArray.indexOf(item) === -1) {
          newArray.push(item);
        }
      });
      return newArray;
    }
    console.time('removeTime');
    console.log(arr.unique());
    console.timeEnd('removeTime'); // time: 3234ms
```
> 消耗时间大概为：```3234ms```

##### 三、sort():先对原数组进行排序，然后再进行元素比较。
```JavaScript

    //
    Array.prototype.unique = function() {
      const newArray = [];
      this.sort();
      for (let i = 0; i < this.length; i++) {
        if (this[i] !== this[i + 1]) {
          newArray.push(this[i]);
        }
      }
      return newArray;
    }
    console.time('removeTime');
    console.log(arr.unique());
    console.timeEnd('removeTime'); // time: 116ms
```
> 消耗时间大概为：```116ms```

```JavaScript

    //
    Array.prototype.unique = function() {
      const newArr = [];
      this.sort();
      for (let i = 0; i < this.length; i++) {
        if (this[i] !== newArr[newArr.length - 1]) {
          newArr.push(this[i])
        }
      }
      return newArr;
    }
    console.time('removeTime');
    console.log(arr.unique());
    console.timeEnd('removeTime'); // time: 109ms
```
> 消耗时间大概为：```109ms```

##### 四、includes()
```JavaScript

    //
    Array.prototype.unique = function() {
      const newArray = [];
      this.forEach(item => {
        if (!newArray.includes(item)) {
          newArray.push(item);
        }
      });
      return newArray;
    }
    console.time('removeTime');
    console.log(arr.unique());
    console.timeEnd('removeTime'); // time: 3521ms
```
> 消耗时间大概为：```3521ms```

##### 五、reduce()
```JavaScript

    //
    Array.prototype.unique = function() {
      return this.sort().reduce((init, current) => {
        if (init.length === 0 || init[init.length - 1] !== current) {
          init.push(current);
        }
        return init;
      }, []);
    }
    console.time('removeTime');
    console.log(arr.unique());
    console.timeEnd('removeTime'); // time: 75ms
```
> 消耗时间大概为：```75ms```

##### 六、对象键值对
```JavaScript

    //
    Array.prototype.unique = function() {
      const newArray = [];
      const tmp = {};
      for (let i = 0; i < this.length; i++) {
        if (!tmp[typeof this[i] + this[i]]) {
          tmp[typeof this[i] + this[i]] = 1;
          newArray.push(this[i]);
        }
      }
      return newArray;
    }
    console.time('removeTime');
    console.log(arr.unique());
    console.timeEnd('removeTime'); // time: 66ms
```
> 消耗时间大概为：```66ms```

##### 七、Map
```JavaScript

    //
    Array.prototype.unique = function() {
      const newArray = [];
      const tmp = new Map();
      for (let i = 0; i < this.length; i++) {
        if (!tmp.get(this[i])) {
          tmp.set(this[i], 1);
          newArray.push(this[i]);
        }
      }
      return newArray;
    }
    console.time('removeTime');
    console.log(arr.unique());
    console.timeEnd('removeTime'); // time: 16ms
```
> 消耗时间大概为：```16ms```

```JavaScript

    //
    Array.prototype.unique = function() {
      const tmp = new Map();
      return this.filter(item => {
        return !tmp.has(item) && tmp.set(item, 1);
      })
    }
    console.time('removeTime');
    console.log(arr.unique());
    console.timeEnd('removeTime'); // time: 16ms
```
> 消耗时间大概为：```16ms```

##### 八、Set：ES6的语法
```JavaScript

    //
    Array.prototype.unique = function() {
      const set = new Set(this);
      return Array.from(set);
    }

    Array.prototype.unique = function() {
      return [...new Set(this)];
    }
    console.time('removeTime');
    console.log(arr.unique());
    console.timeEnd('removeTime'); // time: 20ms
```
> 消耗时间大概为：```20ms```

## 总结

最优的数组去重算法是采用Map数据结构实现的算法。
