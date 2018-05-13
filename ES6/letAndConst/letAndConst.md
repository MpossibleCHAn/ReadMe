### [ES6之块级作用域](http://es6.ruanyifeng.com/#docs/let)

##### 1. 为什么需要块级作用域？

在ECMAScript6（以下简称ES6）之前，ECMAScript的作用域只有两种：

> 全局作用域

> 函数作用域

ES5只有全局作用域和函数作用域，没有`块级作用域`，会带来以下问题：

> 1.变量提升导致内层变量可能会覆盖外层变量

```js
var i = 1;  
function fu() {  
    console.log(i);  
    if (true) {  
        var i = 2;  
    }  
}  
func(); // undefined

假若如下:
var i = 1;  
function func() {  
    console.log(i);  
    if (true) {  
        i = 2;  
    }  
}  
func(); // 1
```

> 2.用来计数的循环变量泄露为全局变量

```js
for (var i = 0; i < 10; i++) {    
    console.log(i);    
}    
console.log(i);  // 10
```

正是因为有这两种作用域，所以在JavaScript中出现一术语:“`变量提升（hoisting）`”。例如：

```js
function func(){
    console.log(test);
    var test = 1;
};
func(); // undefined
```
之所以为“undefined”，原因就在于“变量提升”，在进入func函数时，将所有通过var声明的变量置前并赋予undefined的值。


但ES6的到来，为我们提供了‘块级作用域’。且‘块级作用域’并不影响var声明的变量。

##### 2.块级作用域

ES6中则新增了块级作用域这个概念，块级作用域由{}包着，if语句，for语句中的{}都是属于块级作用域。

##### 3. let命令

> let声明的变量只在所处的块级作用域中有效

> let没有“变量提升”，而是“暂时性死区”特性


###### 1、let声明的变量只在块级有效。

```js
'use strict';
function func(args){
    if(true){
        //let声明i
        let i = 6;
        //在if内打印i值
        console.log('inside: ' + i); // inside6
    }
    //在if外，再次打印i值
    console.log('outside: ' + i); // 提示错误，i没有定义（undefined）
};
func();
```

###### 2、let没有“变量提升”的特性，而却有“暂时性死区”的特性。

```js
'use strict';
function func(){
    //在let声明前，打印i
    console.log(i); // 提示错误，i没有定义（undefined）
    let i;
};
func();
```
> 在let声明变量前，使用该变量，它是会报错的，而不是像var那样会“变量提升”。其实说let没有“变量提升”的特性，不太对。或者说它提升了，但是ES6规定了在let声明变量前不能使用该变量。

如下面的例子：

```js
'use strict';
var test = 1;
function func(){
    //打印test的值
    console.log(test);
    let test = 2;
};
func(); // test is not defined
```
> 这里打印test出来会报错，加入let声明的变量没有“提升”，那么前面的var以定义的test在这里应该会打印1出来；而却报错，说明它是提升了，只是规定了不能再其声明之前使用而已，这个特征称为“`暂时性死区`”，

###### 3、let声明的变量，不允许在同一个块级作用域中重复声明
```js
'use strict';
function func() { // 报错  
    var i= 1;  
    let i = 1;  
}
function func() { // 报错  
    let i= 1;  
    let i = 1;  
}
```

##### 经典例子


```js
'use strict'
var arr = [];
for(var i = 0; i < 10; i++){
    arr[i] = function(){
        console.log(i);
    };
};
arr[1](); // 10
```
> 按照我开始的理解，这里应该是会输出‘1’，但是却输出‘10’。原因是var所声明的变量会变量提升，当执行完arr[1]函数时，i取自于夫函数的i，此时i已经为10，所以会打印‘10’。

为了避免JavaScript的函数污染，我们以往的做法是可以使用闭包：

```js
'use strict'
var arr = [];
for(var i = 0; i < 10; i++){
    arr[i] = (function(i){
        return function () {
          console.log(i);
        }
    })(i);
};
a[1](); // 1
a[2](); // 2
```
而现在可以直接使用ES6的let，因为let所声明的变量只能作用于块级作用域中，所以可以避免了变量污染；

```js
'use strict'
var arr = [];
for (let i = 0; i < 10; i++) {
  arr[i] = function () {
    console.log(i);
  }
}
```

##### 4. const命令

const命令与let命令一样，声明的变量，其作用域都是块级。

所以const遵循的规则与let相差无二，只是，const是用来声明恒定变量的。

且用const声明恒定变量，声明的同时就必须赋值，否则会报错。


```js
'use strict'
const a;
a = 10; // error
```
> const必须赋值，正确写法

```js
'use strict'
const a = 10;
```

const声明的常量不能重复声明：

```js
var message = "Hello!";
let age = 25;

//以下两行都会报错
const message = "Goodbye!";
const age = 30;
```


> const声明一个只读的常量。一旦声明，常量的值就不能改变。

```js
const msg = 'hello';
msg = 'hi'; // TypeError: Assignment to constant variable.
```

> const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值
```
const age; // SyntaxError: Missing initializer in const declaration
```

##### 重点：const本质

const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。对于`简单类型的数据`（数值、字符串、布尔值），值就保存在变量指向的那个`内存地址`，因此等同于常量。但对于`复合类型的数据`（主要是`对象`和`数组`），变量指向的内存地址，保存的只是一个指针，const只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。


```js
const person = {
    name : 'chan',
    age : 24
}
person.name = 'hai';
person.age = 10;
console.log(person); // {name:'hai',age:10}
```
> 指针依旧指向person存储的地址，只是地址中的数据被改变了；


```js
const person = {
    name : 'chan',
    age : 24
}
person = {
    name : 'fong'
}
// TypeError: Assignment to constant variable.
```
> 将person指向另一个对象，就会报错；


```js
const arr = [];
arr.push('a');
console.log(arr.length); // 1
a = ['b']; // ReferenceError: a is not defined
```
> 上面代码中，常量arr是一个数组，这个数组本身是可写的，但是如果将另一个数组赋值给arr，就会报错；
