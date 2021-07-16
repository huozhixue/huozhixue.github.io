# 0415：字符串相加


## 题目

给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和。

- num1 和num2 都不包含任何前导零
- 你不能使用任何內建 BigInteger 库， 也不能直接将输入的字符串转换为整数形式

<!--more--> 

## 分析

和 0067 类似，将除数换成 10 即可。


## 解答

```python
def addStrings(self, num1: str, num2: str) -> str:
	res, carry, i, j = '', 0, len(num1)-1, len(num2)-1
	while i>=0 or j>=0 or carry:
		x = int(num1[i]) if i>=0 else 0
		y = int(num2[j]) if j>=0 else 0
		s = x+y+carry
		res += str(s%10)
		carry = s//10
		i -= 1
		j -= 1
	return res[::-1]
```

40 ms

