# 0007：整数反转


## 题目

给你一个 32 位的有符号整数 x ，返回 x 中每位上的数字反转后的结果。

如果反转后整数超过 32 位的有符号整数的范围 $[−2^{31}, 2^{31}−1]$，就返回 0。

假设环境不允许存储 64 位整数（有符号或无符号）。


 <!--more--> 

示例 1：

	输入：x = 123
	输出：321
	
示例 2：

	输入：x = -123
	输出：-321
	
示例 3：

	输入：x = 120
	输出：21
	
示例 4：

	输入：x = 0
	输出：0



## 分析

### #1

python 中最直接的就是当成字符串反转，再判断是否溢出。

```python
def reverse(self, x: int) -> int:
	y = int(str(x)[::-1] if x>=0 else '-'+str(-x)[::-1])
	return y if -2**31 <= y <= 2**31-1 else 0
```

40 ms

### #2

也可以按位依次构建，python 中不需要担心溢出。


## 解答

```python
def reverse(self, x: int) -> int:
	flag = -1 if x < 0 else 1
	Max = 2**31 if x < 0 else 2**31-1
	x, y = abs(x), 0
	while x:
		y = y * 10 + x % 10
		if y > Max:
			return 0
		x //= 10
	return y*flag
```

28 ms


