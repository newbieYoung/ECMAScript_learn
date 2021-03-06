//ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构
//数组解构
{
	let [a, b, c] = [1, 2, 3];
	console.log(a);
	console.log(b);
	console.log(c);
	let [foo, [[bar], baz]] = ['foo', [['bar'], 'baz']];
	console.log(foo);
	console.log(bar);
	console.log(baz);
}
//如果解构不成功，变量的值就等于undefined
{
	let [a,b,c] = [];
	console.log(a);
	console.log(b);
	console.log(c);
}
//不完全解构
{
	let [a, [b], d] = [1, [2, 3], 4];
	console.log(a);
	console.log(b);
	console.log(d);
}
//如果解构表达式等号的右边是不可遍历类型，那么将会报错
{
	//let [a,b,c] = 1;
}
//解构赋值允许指定默认值
{
	let [a='a'] = [];
	console.log(a);
	//如果解构后的值严格等于undifined，则默认值生效，反之不生效
	let [b='b'] = [undefined];
	console.log(b);
	let [c='c'] = [null];
	console.log(c);
	//默认值可以是表达式
	let d = 3;
	let e = 4;
	let [f=(d+e)] = [undefined];
	console.log(f);
	let func = function(){
		console.log('func');
	}
	let [g=func] = [undefined];
	g();
	//默认值可以是函数
	let [h=function(){console.log('function')}] = [undefined];
	h();
}
//对象解构
{
	//对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
	let {a,b,c} = {
		a:'a',
		c:'c',
		b:'b'
	}
	console.log(a);
	console.log(b);
	console.log(c);
}
//用途
{
	//交换变量的值
	let a = 1;
	let b = 2;
	[a,b] = [b,a];
	console.log(a+' '+b);
	//解析函数返回多个值
	function func(){
		return [3,4];
	}
	[a,b] = func();
	console.log(a+' '+b);
	//解析函数参数
	function fun([a,b]){
		console.log(a+' '+b);
	}
	func([a,b]);
	//提取json数据
	var jsonData = {
		x:5,
		y:6
	}
	var {x,y} = jsonData;
	console.log(x+' '+y);
}