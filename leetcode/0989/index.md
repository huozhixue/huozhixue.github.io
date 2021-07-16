# 0989：数组形式的整数加法




## 题目

对于非负整数 X 而言，X 的数组形式是每位数字按从左到右的顺序形成的数组。例如，如果 X = 1231，那么其数组形式为 [1,2,3,1]。

给定非负整数 X 的数组形式 A，返回整数 X+K 的数组形式。


 <!--more--> 
 
示例 1：

	输入：A = [1,2,0,0], K = 34
	输出：[1,2,3,4]
	解释：1200 + 34 = 1234
	
示例 2：

	输入：A = [2,7,4], K = 181
	输出：[4,5,5]
	解释：274 + 181 = 455
	
示例 3：

	输入：A = [2,1,5], K = 806
	输出：[1,0,2,1]
	解释：215 + 806 = 1021
	
示例 4：

	输入：A = [9,9,9,9,9,9,9,9,9,9], K = 1
	输出：[1,0,0,0,0,0,0,0,0,0,0]
	解释：9999999999 + 1 = 10000000000


## 分析

### #1

最简单的就是把 A 变回 X，相加后再把结果变为数组形式

```python
def addToArrayForm(self, A: List[int], K: int) -> List[int]:
	X = int(''.join(map(str, A)))
	return list(map(int, str(X+K)))
```

368 ms

### #2

也可以模拟进位加法，和 0415 相似

## 解答

```python
def addToArrayForm(self, A: List[int], K: int) -> List[int]:
	res, carry, i = [], 0, len(A)-1
	while i>=0 or K>0 or carry:
		x = A[i] if i>=0 else 0
		y = K%10
		s = x+y+carry
		res.append(s%10)
		carry = s//10
		i -= 1
		K //= 10
	return res[::-1]
```

316 ms
