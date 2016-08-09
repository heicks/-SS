#### JavaScript  变量作用域与变量提升
[[参考地址]JavaScript Scoping and Hoisting](http://www.jb51.net/article/30718.htm)<br>
你知道下面的JavaScript代码执行后会alert出什么值吗？
```javascript
var foo = 1;
function bar(){
    if(!foo){
        var foo = 10;
    }
    alert(foo);
}
bar();
```
如果答案是"10"令你感到惊讶的话，那么下面的这个会让你更加困惑：
```javascript
var a = 1;
function b(){
    a = 10;
    return;
    function a(){}
}
b();
alert(a);
```
浏览器会alert"1"。那么，到底是怎么了？这篇文章试着去解释这种JavaScript机制，但是首先，让我们对JavaScript的scoping做一些了解
    
##### Scoping in JavaScript (变量作用域)
JavaScript的scoping如此复杂的原因是因为它看上去非常像C系语言的成员。请看下面的C程序：
```C
#inclue<stdio.h>
int main(){
    int x = 1;
    printf("%d,",x);  // 1
    if(1){
    int x = 2;
    printf("%d,",x);  // 2
    }
    printf("%d\n",x); // 1
}
```
这段程序输出的是1,2,1。这是因为在C系语言有块级作用域(block-level scope),当进入到一个块时，就像if语句，在这个块级作用域中会声明新的变量，这些变量不会影响到外部作用域。但是JavaScript却不这样。在Firebug中试试下面的代码:
```javascript
var a = 1;
console.log(x); //1
if(true){
var x = 2;
console.log(x); // 2
}
cosole.log(x);  // 2
```
在这段代码中，Firebug显示1,2,2。这是因为javascript是函数作用域(function-level scope)。这和C系语言是完全不同的。块，就像if语句，并不会创建一个新的作用域。只有函数才会执行新的作用域。<br>
对于这个问题，我们有一个解决方案。如果你必须在函数中创建一个临时的作用域，请像下面这样：
```javascript
function foo(){
var x=1;
if(x){
(function(){
var x=2;
// do some other code
}());
}
// x is still 1.
}
```
##### javascript　函数提升
在JavaScript中，一个作用域(scope)中的名称(name)有以下四种:<br>
1、语言自身定义(Language-defined):所有的作用域默认都会包含this和arguments<br>
2、函数形参(Formal parameters):函数又名字的形参会进入到函数体的作用域内。<br>
3、函数声明(Function decalrations):通过function foo{}的形式。<br>
4、变量声明(Variable declarations):通过var foo;的形式.<br>
函数声明和变量声明总是被JavaScript解释器隐式的提升(hoist)到包含他们的作用域的最顶端。很明显的，语言自身定义和形参已经处于作用域顶端。就像下面这样：
```javascript
function foo(){
bar();
var x=1;
}
```
实际上被解释成像下面这样:
```javascript
function foo(){
var x;
bar();
x=1;
}
```
结果是不管声明是否被执行都没有影响。下面的两端代码是等价的：
```javascript
function foo(){
if(false){
var x=1;
}
return;
var y=1;
}

function foo(){
var x;
var y;
if(false){
x=1;
}
return;
y=1;
}
```
注意到声明的赋值部分并没有被提升(hoist)。只有声明的名称被提升了。这和函数声明不同，函数声明中，整个函数体也都会被提升。但是请记住，声明一个函数一般来说有两种方式。考虑下面的JavaScript代码： <br>
```javascript
function test() {
foo(); // TypeError "foo is not a function"
bar(); // "this will run!"
var foo = function () { // 函数表达式被赋值给变量'foo'
alert("this won't run!");
}
function bar() { // 名为'bar'的函数声明
alert("this will run!");
}
}
test(); 
```
##### 特殊情况 名称解析顺序(Name Resolution Order)
记住一个名称进入一个作用域一共有四种方式。我上面列出的顺序就是他们解析的顺序。总的来说，如果一个名称已经被定义了，他绝不会被另一个拥有不用属性的同名名称覆盖。这就意味着，函数声明比变量声明具有更高的优先级。但是这却不意味着对这个名称的赋值无效，仅仅是声明的部分会被忽略而已。但是有下面几个例外：<br>
内置的名称arguments的行为有些怪异。他似乎是在形参之后，函数声明之前被声明。这就意味着名为arguments的形参会比内置的arguments具有更高的优先级，即使这个形参是undefined。这是一个不好的特性，不要使用arguments作为形参。<br>
任何地方试图使用this作为一个标识都会引起语法错误，这是一个好的特性。<br>
如果有多个同名形参，那位于列表最后的形参拥有最高的优先级，即使它是undefined。<br>
##### 函数表达式 Name Function Expressions 
你可以在函数表达式中给函数定义名称，就像函数声明的语句一样。但这并不会使它成为一个函数声明，并且这个名称也不会被引入到作用域中，而且，函数体也不会被提升(hoist)。这里有一些代码可以说明我说的是什么意思： 
```javascript
foo(); // TypeError "foo is not a function"
bar(); // valid
baz(); // TypeError "baz is not a function"
spam(); // ReferenceError "spam is not defined"
var foo = function () {}; // 匿名函数表达式('foo'被提升)
function bar() {}; // 函数声明('bar'和函数体被提升)
var baz = function spam() {}; // 命名函数表达式(只有'baz'被提升)
foo(); // valid
bar(); // valid
baz(); // valid
spam(); // ReferenceError "spam is not defined" 
```
##### How to Code With This Knowledge 
现在你明白了作用域和提升，那么这对编写JavaScript代码意味着什么呢？最重要的一条是声明变量时总是使用var语句。我强烈的建议你在每个作用域中都只在最顶端使用一个var。如果你强制自己这么做，你永远也不会被提升相关的问题困扰。尽管这么做会使的跟踪当前作用域实际声明了哪些变量变得更加困难。我建议在JSLint使用onevar选项。如果你做了所有前面的建议，你的代码看起来会是下面这样： 
```javascript
/*jslint onevar: true [...] */
function foo(a, b, c) {
var x = 1,
bar,
baz = "something";
} 
```



























