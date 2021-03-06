/**
 * set
 */
'use strict';
//set常用属性和方法
{
	let set = new Set();
	set.add(5);
	set.add('5');
	//向Set加入值的时候，不会发生类型转换，所以5和'5'是两个不同的值
	console.log(set);
	//Set内部判断两个值是否不同，使用的算法类似于精确相等运算符（===）
	set.add(NaN);
	set.add(NaN);
	console.log(set);
	//唯一的例外是NaN等于自身（精确相等运算符认为NaN不等于自身）
	console.log(NaN===NaN);
	console.log(set.has('5'));
	console.log(set.size);
	console.log(set.delete('5'));
	console.log(set.has('5'));
	set.clear();
	console.log(set);
}
//数组和set
{
	let set = new Set([1,2,3,4,5,6]);
	console.log(set);
	console.log(Array.from(set));
	//数组去重
	console.log(Array.from(new Set([1,2,3,3,2,5])));
}
//遍历
{	
	let set = new Set([1,2,3,4,5]);
	//keys返回一个键名的遍历器
	for(let item of set.keys()){
		console.log(item);
	}
	//values返回一个键值的遍历器
	for(let item of set.values()){
		console.log(item);
	}
	//entries返回一个键值对的遍历器
	for(let item of set.entries()){
		console.log(item);//由于Set结构没有键名，只有键值（或者说键名和键值是同一个值）
	}
	//它的默认遍历器生成函数就是它的values方法
	console.log(Set.prototype[Symbol.iterator] === Set.prototype.values);
	for(let item of set){
		console.log(item);
	}
}
/**
 * WeakSet和Set主要有两个方面的区别：
 * 1、WeakSet的成员只能是对象，而不能是其他类型的值；
 * 2、WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中。这个特点意味着，无法引用WeakSet的成员，因此WeakSet是不可遍历的。
 */
{
	let ws = new WeakSet();
	//Invalid value used in weak set
	//ws.add(1);//Number
	//ws.add('str');//String
	//ws.add(true);//Boolean
	//ws.add(Symbol());//Symbol
	//ws.add(undefined);//undefined
	//ws.add(null);//Null
	ws.add(function(){});//Function
	ws.add({});//Object
	//WeakSet的一个用处，是储存DOM节点，而不用担心这些节点从文档移除时，会引发内存泄漏。
}