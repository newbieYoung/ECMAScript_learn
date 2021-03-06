'use strict';
//Symbol是一种类似于字符串的数据类型
{
	let s = Symbol();
	console.log(typeof s);
	//let a = new Symbol();//Symbol函数前不能使用new命令，否则会报错
	//s.type = 'Symbol';//由于Symbol值不是对象，所以不能添加属性
	//Symbol函数可以接受一个字符串作为参数，表示对Symbol实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分
	let a = Symbol('a');
	let b = Symbol('a');
	console.log(a.toString()+' '+b.toString());
	console.log(a===b);//Symbol函数的参数只是表示对当前Symbol值的描述，因此相同参数的Symbol函数的返回值是不相等的
	//Symbol值不能与其他类型的值进行运算，会报错
	//console.log(`a symbol is ${a}`);
	console.log(a.toString());//Symbol值可以显式转为字符串
	console.log(new Boolean(a));//Symbol值可以显式转为boolean类型
}
//Symbol值作为属性名
{
	let person = {};
	let name = Symbol('name');
	let age = Symbol('age');
	person[name] = 'liy';
	person[age] = 24;
	console.log(person[name]+' '+person[age]);
	console.log(person.name+' '+person.age);//Symbol值作为属性名时不能使用点运算符获取
	console.log(person['name']+' '+person['age']);
	//在对象的内部，使用Symbol值定义属性时，Symbol值必须放在方括号之中
	let student = {
		name:'tsm',//如果name不放在方括号中，该属性的键名就是字符串name，而不是name所代表的那个Symbol值
		[name]:'lyz'
	}
	console.log(student.name+' '+student[name]);
}
//Symbol属性名遍历
{
	let birthday = Symbol('birthday');
	let mom = {
		name:'童世美',
		age:55,
		[birthday]:'2015-11-20'
	}
	//forin不能遍历出Symbol属性
	for(let i in mom){
		console.log(mom[i]);
	}
	//forof+Object.keys不能遍历Symbol属性
	for(let i of Object.keys(mom)){
		console.log(mom[i]);
	}
	//forof+Object.getOwnPropertyNames不能遍历Symbol属性
	for(let i of Object.getOwnPropertyNames(mom)){
		console.log(mom[i]);
	}
	//Object.getOwnPropertySymbols方法，可以获取指定对象的所有Symbol属性
	for(let i of Object.getOwnPropertySymbols(mom)){
		console.log(mom[i]);
	}
}
//Symbol.for、Symbol.keyFor
{
	//使用Symbol方法创建的值不会被登记到全局环境中供搜索，但是Symbol.for创建的值会被登记到全局环境中供搜索
	let a = Symbol('symbol');
	//Symbol.for接受一个字符串作为参数，然后搜索有没有使用Symbol.for创建的以该参数作为名称的Symbol值，如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值。
	let c = Symbol.for('symbol');
	let d = Symbol.for('symbol');
	console.log(a===c);
	console.log(d===c);
	//Symbol.keyFor方法返回一个已登记的Symbol类型值的key。
	console.log(Symbol.keyFor(a));
	console.log(Symbol.keyFor(c));
}
//内置Symbol
{
	
}