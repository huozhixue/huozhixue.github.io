# 0009：回文数


## 题目

判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

你能不将整数转为字符串来解决这个问题吗？
 
 <!--more--> 

示例 1:

	输入: 121
	输出: true
	
示例 2:

	输入: -121
	输出: false
	解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
	
示例 3:

	输入: 10
	输出: false
	解释: 从右向左读, 为 01 。因此它不是一个回文数。



## 分析

### #1

最简单的就是转为字符串判断。

```python
def isPalindrome(self, x: int) -> bool:
	return str(x) == str(x)[::-1]
```

80 ms


### #2

也可以按位得到倒序的数，再判断。

## 解答

```python
def isPalindrome(self, x: int) -> bool:
	if x < 0:
		return False
	y, tmp = 0, x
	while tmp:
		y = y * 10 + tmp % 10
		tmp //= 10
	return y == x
```

72 ms

