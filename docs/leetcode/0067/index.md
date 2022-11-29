# 0067：二进制求和


## 题目

给你两个二进制字符串，返回它们的和（用二进制表示）。

输入为 非空 字符串且只包含数字 1 和 0。


示例 1:

	输入: a = "11", b = "1"
	输出: "100"
	
示例 2:

	输入: a = "1010", b = "1011"
	输出: "10101"

提示：
- 每个字符串仅由字符 '0' 或 '1' 组成。
- 1 <= a.length, b.length <= 10^4
- 字符串如果不是 "0" ，就都不含前导零。

## 分析

### #1

可以直接调库。

```python
def addBinary(self, a: str, b: str) -> str:
	return bin(int(a, 2)+int(b, 2))[2:]
```
40 ms

### #2

也可以模拟进位加法，将除数换成 2 即可。

```python
def addBinary(self, a: str, b: str) -> str:
	res, carry, i, j = '', 0, len(a)-1, len(b)-1
	while i>=0 or j>=0 or carry:
		x = int(a[i]) if i>=0 else 0
		y = int(b[j]) if j>=0 else 0
		s = x+y+carry
		res += str(s%2)
		carry = s//2
		i -= 1
		j -= 1
	return res[::-1]
```
36 ms
