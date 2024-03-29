# 0386：字典序排数（★）


> <u>**[力扣第 386 题](https://leetcode.cn/problems/lexicographical-numbers/)**</u>

## 题目

<p>给你一个整数 <code>n</code> ，按字典序返回范围 <code>[1, n]</code> 内所有整数。</p>

<p>你必须设计一个时间复杂度为 <code>O(n)</code> 且使用 <code>O(1)</code> 额外空间的算法。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 13
<strong>输出：</strong>[1,10,11,12,13,2,3,4,5,6,7,8,9]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 2
<strong>输出：</strong>[1,2]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 5 * 10<sup>4</sup></code></li>
</ul>


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



