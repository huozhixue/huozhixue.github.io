# 0739：每日温度（★）


> <u>**[力扣第 739 题](https://leetcode.cn/problems/daily-temperatures/)**</u>

## 题目

<p>给定一个整数数组 <code>temperatures</code> ，表示每天的温度，返回一个数组 <code>answer</code> ，其中 <code>answer[i]</code> 是指对于第 <code>i</code> 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 <code>0</code> 来代替。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> <code>temperatures</code> = [73,74,75,71,69,72,76,73]
<strong>输出:</strong> [1,1,4,2,1,1,0,0]
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> temperatures = [30,40,50,60]
<strong>输出:</strong> [1,1,1,0]
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> temperatures = [30,60,90]
<strong>输出: </strong>[1,1,0]</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= temperatures.length &lt;= 10<sup>5</sup></code></li>
<li><code>30 &lt;= temperatures[i] &lt;= 100</code></li>
</ul>


**相似问题：**
- [0496：下一个更大元素 I](/leetcode/0496)
- [0901：股票价格跨度（1708 分）](/leetcode/0901)


## 分析

### #1

注意到气温的范围较小，所以对每个位置 i，可以遍历比 T[i] 更高的温度，比较在 T[i+1:] 中的位置即可。
而查询位置可以通过反向遍历并维护哈希表，在 O(1) 时间内完成。

```python
def dailyTemperatures(self, T: List[int]) -> List[int]:
	n = len(T)
	res, d = [0] * n, defaultdict(int)
	for i in range(n-1, -1, -1):
		d[T[i]] = i
		nxt = min(j if t > T[i] else float('inf') for t, j in d.items())
		res[i] = nxt - i if nxt < float('inf') else 0
	return res
```

时间复杂度 O(N*M)，1504 ms

### #2

本题还有个巧妙的单调栈解法。

假设在 T[i+1:] 内存在 x < y, T[x] >= T[y]，显然对于任意 i 前面的位置，y 都不可能是答案。

所以如果反向遍历位置 i，并维护一个去掉这种 y 的列表 tmp，位置 i 对应的答案必然在 tmp 中。
显然 tmp 保持严格单调递减，故位置 i 对应的答案就是 tmp[-1]。

注意遍历到位置 i 时，tmp 中要去掉的都是末尾的一部分元素，因此 tmp 就是一个单调栈。
每个元素最多入栈出栈一次，因此时间复杂度 O(N)。

```python
def dailyTemperatures(self, T: List[int]) -> List[int]:
	n = len(T)
	res, stack = [0] * n, []
	for i in range(n-1, -1, -1):
		while stack and T[stack[-1]] <= T[i]:
			stack.pop()
		res[i] = stack[-1] - i if stack else 0
		stack.append(i)
	return res
```

512 ms

### #3

其实也可以正向遍历。

用 tmp 保存还没有确定结果的位置。遍历到位置 i 时，tmp 中所有满足 T[j] < T[i] 的位置 j，T[j] 的下一个更高气温就是 T[i]，将 j 弹出。

显然 tmp 是一个不严格递减的单调栈。

## 解答

```python
def dailyTemperatures(self, T: List[int]) -> List[int]:
	n = len(T)
	res, stack = [0] * n, []
	for i in range(n):
		while stack and T[stack[-1]] < T[i]:
			j = stack.pop()
			res[j] = i-j
		stack.append(i)
	return res
```

476 ms

