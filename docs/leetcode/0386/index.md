# 0386：字典序排数（★）


> **第 1 场周赛第 1 题**

## 题目

给你一个整数 n ，按字典序返回范围 [1, n] 内所有整数。

你必须设计一个时间复杂度为 O(n) 且使用 O(1) 额外空间的算法。

 

示例 1：

	输入：n = 13
	输出：[1,10,11,12,13,2,3,4,5,6,7,8,9]

示例 2：

	输入：n = 2
	输出：[1,2]
 

提示：
- 1 <= n <= 5 * 10^4


 
## 分析

### #1

观察知道字典排序和字符串排序是一样的，可直接调包。

```python
def lexicalOrder(self, n: int) -> List[int]:
	return sorted(range(1, n+1), key=str)
```
44 ms

### #2

要求时间 O(N)，空间 O(1)，可以用 dfs 构造。

先考虑 '1'，然后在后面加 '0'，当大于 n 时就返回上一步，尝试加更大的数。

## 解答

```python
def lexicalOrder(self, n: int) -> List[int]:
	def dfs(i):
		for j in range(max(1, i*10), min(i*10+10, n+1)):
			res.append(j)
			dfs(j) 
	res = []
	dfs(0)
	return res
```
136 ms



