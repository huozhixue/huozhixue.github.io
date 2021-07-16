# 0029：两数相除（★★）


## 题目

给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。

返回被除数 dividend 除以除数 divisor 得到的商。

整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) = -2

- 被除数和除数均为 32 位有符号整数。
- 除数不为 0。
- 假设我们的环境只能存储 32 位有符号整数，其数值范围是 $[−2^{31},  2^{31} − 1]$。本题中，如果除法结果溢出，则返回 $2^{31} − 1$。


<!--more--> 

示例 1:

	输入: dividend = 10, divisor = 3
	输出: 3
	解释: 10/3 = truncate(3.33333..) = truncate(3) = 3
	
示例 2:

	输入: dividend = 7, divisor = -3
	输出: -2
	解释: 7/-3 = truncate(-2.33333..) = -2
 
## 分析

### #1 

最简单的想法就是把两个数都变成正的，然后被除数不断的减去除数直到小于除数为止，最后再加上正负号。

可以用异或判断两个数的正负性是否相同，而溢出的唯一可能是结果等于 $2^{31}$。

```python
def divide(self, dividend: int, divisor: int) -> int:
	m, n, flag = abs(dividend), abs(divisor), int(dividend^divisor >=0)
	res = 0
	while m >= n:
		m -= n
		res += 1
	return min([-res, res][flag], 2147483647)
```

用例 (-2147483648, -1) 超时了

### #2

显然超时是因为两个数的逼近太慢。因为不能用除法，改变被除数 m 就必须用减法，太慢了。

所以考虑改变除数 n，可以不断的自加，相当于乘 2，就可以快速的逼近被除数了。

- 比如 m=100、n=2，n 不断自加最多到 64 (再自加就大于 100 了)，那么 m 就应该先减去 64 以最快逼近。而减去 64 就相当于减去 32 个 2，结果应该加上 32。
- 但因为不能用除法，32 不是显然得到的，所以还需要一个变量 w 初始为 1，随着 n 自加而自加，以表示当前 n 代表的原除数个数。
- 然后再把 n 重置为原除数 2，现在 m=36、n=2，开始下一轮循环。

进一步的，后面每轮的计算明显都和第一轮重复了，所以可以把第一轮中的所有 (n、w) 存储下来，节省时间。


## 解答

```python
def divide(self, dividend: int, divisor: int) -> int:
	m, n, flag = abs(dividend), abs(divisor), int(dividend^divisor >=0)
	d, w = [], 1
	while n <= m:
		d.append((n, w))
		n += n
		w += w
	res = 0
	for n, w in d[::-1]:
		if m >= n:
			m -= n
			res += w
	return min([-res, res][flag], 2147483647)
```

36 ms
