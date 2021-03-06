/**
 * 二进制相关
 */
'use strict';
//简单综合例子
{
    let buffer = new ArrayBuffer(2);
    //ArrayBuffer为只读二进制数组，只能通过DataView赋值
    new DataView(buffer).setInt16(0, 256, true); //第三个参数表示写入顺序
    //此时该buffer中的二进制数据为 00000001 00000000
    let int16Array = new Int16Array(buffer);
    console.log(int16Array);
    let int8Array = new Int8Array(buffer);
    //Int8Array表示每8位保存为一个整数且从低数位往高数位遍历，所以int8Array数组为[0,1]
    console.log(int8Array);
}
//常用属性
{
    let buffer = new ArrayBuffer(4);
    console.log(buffer.byteLength);//byteLength
    let newBuffer = buffer.slice(0, 3);
    console.log(newBuffer.byteLength);
    console.log(buffer.byteLength);
}
//常用方法
{
    let buffer = new ArrayBuffer(4);
    console.log(ArrayBuffer.isView(buffer));//ArrayBuffer.isView判断是否为TypedArray实例或DataView实例
    let init16Array = new Int16Array(buffer);
    console.log(ArrayBuffer.isView(init16Array));
    console.log(init16Array.length);
    //TypedArray.prototype.set用于复制数组，它是整段内存的复制，比一个个拷贝成员的那种复制快得多
    let i16 = new Int16Array(2);
    i16.set(init16Array);
}
//构造TypedArray
{
    //TypedArray(buffer, startNo, length)
    let buffer = new ArrayBuffer(16);
    let i16 = new Int16Array(buffer, 2, 2);
    console.log(i16.length);
    //TypedArray(length)
    let i32 = new Int32Array(8);
    console.log(i32.byteLength);
    console.log(i32.length);
    console.log(i32[7]);
    console.log(i32[8]);
    //TypedArray(typedArray)新数组会开辟一段新的内存储存数据，不会在原数组的内存之上建立视图
    let i8 = new Int8Array(new Int8Array(8));
    console.log(i8.length);
    let i64 = new Float64Array(i8.buffer); //和i8基于同一段内存
    console.log(i64.length);
    //TypedArray(arrayLikeObject)
    let u8 = new Uint8Array([0, 1, 2, 3]); //TypedArray视图会重新开辟内存，不会在原数组的内存上建立视图
    console.log(u8.length);
    console.log(u8.byteLength);
    //与普通数组相比，TypedArray数组的最大优点就是可以直接操作内存，不需要数据类型转换，所以速度快得多
}
//普通数组的方法对TypedArray完全适用
//字节序指的是数值在内存中的表示方式
{
    let buffer = new ArrayBuffer(4);
    //x86体系的计算机都采用小端字节序，相对重要的字节排在后面的内存地址，相对不重要字节排在前面的内存地址，比如0x12345678，在内存的实际存储顺序为87654321，对数值大小影响小的位数排前边
    //00000000 00000010 00000000 00000000
    let i32 = new Int32Array(buffer);
    for (let i = 0; i < i32.length; i++) {
        i32[i] = (i + 1) * 2;
    }
    let i16 = new Int16Array(buffer);
    console.log(i16);
}
//每一种视图的构造函数，都有一个BYTES_PER_ELEMENT属性，表示这种数据类型占据的字节数
{
    console.log(Int8Array.BYTES_PER_ELEMENT);
    console.log(Uint8Array.BYTES_PER_ELEMENT);
    console.log(Int16Array.BYTES_PER_ELEMENT);
    console.log(Uint16Array.BYTES_PER_ELEMENT);
    console.log(Int32Array.BYTES_PER_ELEMENT);
    console.log(Uint32Array.BYTES_PER_ELEMENT);
    console.log(Float32Array.BYTES_PER_ELEMENT);
    console.log(Float64Array.BYTES_PER_ELEMENT);
}
//ArrayBuffer与字符串的互相转换
{
    // ArrayBuffer转为字符串，参数为ArrayBuffer对象
    function ab2str(buf) {
        return String.fromCharCode.apply(null, new Uint16Array(buf));
    }

    // 字符串转为ArrayBuffer对象，参数为字符串
    function str2ab(str) {
        var buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
        var bufView = new Uint16Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }
    console.log(ab2str(str2ab('liy')));
}
//在同一段内存之中，可以依次存放不同类型的数据，这叫做复合视图
{
	let buffer = new ArrayBuffer(24);
	let u32 = new Uint32Array(buffer,0,1);//1位4字节的32位无符号整数
	let u8 = new Uint8Array(buffer,4,16);//16位1字节的8位无符号整数
	let f32 = new Float32Array(buffer,20,1);//1位4字节的32位浮点数
}
//DataView
{
	console.log('dataview');
	let buffer = new ArrayBuffer(24);
	let dv = new DataView(buffer);
	// 在第1个字节，以大端字节序写入值为25的32位整数
	dv.setInt32(0, 25, false);
	// 在第5个字节，以大端字节序写入值为25的32位整数
	dv.setInt32(4, 25);
	// 在第9个字节，以小端字节序写入值为2.5的32位浮点数
	dv.setFloat32(8, 2.5, true);
	// 从第1个字节读取一个8位无符号整数
	console.log(dv.getUint8(0));
	// 从第2个字节读取一个16位无符号整数
	console.log(dv.getUint16(1));
	// 从第4个字节读取一个16位无符号整数
	console.log(dv.getUint16(3));
}
//应用场景
{
	//AJAX、Canvas、WebSocket、Fetch API、File API等
}