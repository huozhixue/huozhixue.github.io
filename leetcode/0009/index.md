# 0009：回文数


## 题目
给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。

回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。例如，121 是回文，而 123 不是。

提示：

-2^31 <= x <= 2^31 - 1

 <!--more--> 

示例 1：

    输入：x = 121
    输出：true

示例 2：
    
    输入：x = -121
    输出：false
    解释：从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。

示例 3：

    输入：x = 10
    输出：false
    解释：从右向左读, 为 01 。因此它不是一个回文数。

示例 4：
    
    输入：x = -101
    输出：false


## 分析

### #1

最简单的就是转为字符串判断。

```python
def isPalindrome(self, x: int) -> bool:
	return str(x) == str(x)[::-1]
```

80 ms

### #2

也可以类似 {{< lc "0007" >}} 将整数反转，判断是否相等。
注意负数必然不是回文数。

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

