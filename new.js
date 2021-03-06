'use strict';
//js中使用new来调用函数，会自动执行下面的操作
//1、创建一个全新的对象
//2、该对象的原型指向person的原型
//3、函数的this指向该对象
//4、如果函数没有返回其他对象，那么new表达式中的函数会自动返回这个新对象
{
	function person(name,age){
		this.name = name;
		this.age = age;
		//返回undefined、Null、String、Boolean、Number、Symbol基本类型也属于没有返回其他对象
		//return Symbol();
	}
	let liy = new person('liy',24);
	console.log(person.prototype);
	console.log(Object.getPrototypeOf(liy));
	console.log(liy.__proto__);
	console.log(liy.name+' '+liy.age);
}