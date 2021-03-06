/**
 * function
 */
'use strict';
//参数默认值
{
	function log(x='hello',y='world'){
		console.log(x,y);
	}
	log();
}

//reset参数
{
	function log(start,...params){
		for(let item of params){
			console.log(item);
		}
	}
	log(1,2,3);
	//扩展参数运算符
	let array = ['a','b','c'];
	let arr = [];
	arr.push(...array);
	console.log(arr);
}

//箭头函数
{
	let log = (text)=>{
		console.log(text);
	}
	log('text');
	//由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号。
	log = (text)=>{
		return ({date:new Date(),text:text});
	}
	console.log(log('text2'));
	//简化回调函数
	['e','f','g'].map((item)=>{
		console.log(item);
	});

	//函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
	class Person{
		constructor(name){
			this.name = name;
		}
		test(){
			return ()=>{
				console.log(this.name);
			}
		}
	}
	let t0 = new Person('liy');
	let f0 = t0.test();
	f0();
	f0.bind({name:'tsm'})();
}

//函数绑定ES7

//尾调用
// {
// 	//尾调用不一定出现在函数尾部，只要是最后一步操作即可，比如：
// 	function m(x){
// 		console.log(x);
// 	}
// 	function n(x){
// 		console.log(x);
// 	}
// 	function g(x){
// 		return x;
// 	}
// 	function f(x) {
// 		'use strict';
// 		//f.caller;
// 			//f.arguments;
// 		if (x > 0) {
// 			return m(x);//尾调用
// 		}
// 		return n(x);//尾调用
// 	}
// 	f(5);
// 	//以下三种情况不属于尾调用
// 	//情况一
// 	// function f(x){
// 	// 	let y = g(x);
// 	// 	return y;
// 	// }
// 	// //情况二
// 	// function f(x){
// 	// 	return g(x) + 1;
// 	// }
// 	// //情况三
// 	// function f(x){
// 	// 	g(x);
// 	// }
// 	// //情况二等同于
// 	// function f(x){
// 	// 	let y = g(x)+1;
// 	// 	return y;
// 	// }
// 	// //情况三等同于
// 	// function f(x){
// 	// 	g(x);
// 	// 	return undefined;
// 	// }
// 	//尾调用优化
// 	//函数调用会在内存形成一个调用记录，又称调用帧，保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，那么在A的调用记录上方，还会形成一个B的调用记录。等到B运行结束，将结果返回到A，B的调用记录才会消失。如果函数B内部还调用函数C，那就还有一个C的调用记录栈，以此类推。所有的调用记录，就形成一个调用栈。
// 	//尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用记录，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用记录，取代外层函数的调用记录就可以了，即只保留内层函数的调用记录。
// 	//如果所有函数都是尾调用，那么完全可以做到每次执行时，调用记录只有一项，这将大大节省内存，这就是尾调用优化的意义。
// }
// //尾递归
// {
// 	//递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生栈溢出错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生栈溢出错误。
// 	{
// 		function factorial(n) {
// 			if (n === 1) return 1;
// 			return n * factorial(n - 1);//这里不是尾调用，需要保存n个调用记录，复杂度 O(n) 
// 		}
// 		factorial(5);
// 	}
// 	{
// 		function factorial(n, total) {
// 			if (n === 1) return total;
// 			return factorial(n - 1, n * total);
// 		}
// 		factorial(5, 1);//改写成尾递归，只保留一个调用记录，复杂度 O(1)
// 	}
// }