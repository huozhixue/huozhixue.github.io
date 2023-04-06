# 0962：最大宽度坡（★）


> <u>**[力扣第 116 场周赛第 2 题](https://leetcode.cn/problems/maximum-width-ramp/)**</u>

## 题目

<p>给定一个整数数组 <code>A</code>，<em>坡</em>是元组 <code>(i, j)</code>，其中  <code>i &lt; j</code> 且 <code>A[i] &lt;= A[j]</code>。这样的坡的宽度为 <code>j - i</code>。</p>

<p>找出 <code>A</code> 中的坡的最大宽度，如果不存在，返回 0 。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>[6,0,8,2,1,5]
<strong>输出：</strong>4
<strong>解释：</strong>
最大宽度的坡为 (i, j) = (1, 5): A[1] = 0 且 A[5] = 5.
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>[9,8,1,0,1,9,4,0,4,1]
<strong>输出：</strong>7
<strong>解释：</strong>
最大宽度的坡为 (i, j) = (2, 9): A[2] = 1 且 A[9] = 1.
</pre>



<p><strong>提示：</strong></p>

<ol>
<li><code>2 &lt;= A.length &lt;= 50000</code></li>
<li><code>0 &lt;= A[i] &lt;= 50000</code></li>
</ol>




## 分析

### #1

暴力法就是遍历位置 j，在 A[:j] 中找最小的 i 使得 A[i] <= A[j]。

注意到如果 x < y 且 A[x] <= A[y]，显然 y 不可能是答案。
因此可以维护一个严格递减的列表 tmp，保存有用的位置。
然后每轮在 tmp 中二分查找第一个小于等于 A[j] 的位置即可。

```python
def maxWidthRamp(self, A: List[int]) -> int:
	res, tmp = 0, []
	self.__class__.__getitem__ = lambda self, x: A[tmp[x]] <= A[j]
	for j in range(len(A)):
		pos = bisect_left(self, True, 0, len(tmp))
		if pos < len(tmp):
			res = max(res, j - tmp[pos])
		if not tmp or A[j] < A[tmp[-1]]:
			tmp.append(j)
	return res
```

536 ms

### #2

还有个巧妙地单调栈解法。

先一趟遍历得到完整的 tmp，最大宽度坡的开头必然在 tmp 中。
然后反向遍历 j，对于 tmp 中满足 A[i] <= A[j] 的位置 i， i 能对应的最大宽度坡的结尾即为 j，可以弹出 i。

## 解答

```python
def maxWidthRamp(self, A: List[int]) -> int:
	stack, n = [], len(A)
	for i in range(n):
		if not stack or A[i] < A[stack[-1]]:
			stack.append(i)
	res = 0
	for j in range(n-1, -1, -1):
		while stack and A[stack[-1]] <= A[j]:
			res = max(res, j-stack.pop())
	return res
```

308 ms
