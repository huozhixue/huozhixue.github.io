# 1124：表现良好的最长时间段（★）


> <u>**[力扣第 145 场周赛第 3 题](https://leetcode.cn/problems/longest-well-performing-interval/)**</u>

## 题目

<p>给你一份工作时间表 <code>hours</code>，上面记录着某一位员工每天的工作小时数。</p>

<p>我们认为当员工一天中的工作小时数大于 <code>8</code> 小时的时候，那么这一天就是「<strong>劳累的一天</strong>」。</p>

<p>所谓「表现良好的时间段」，意味在这段时间内，「劳累的天数」是严格<strong> 大于</strong>「不劳累的天数」。</p>

<p>请你返回「表现良好时间段」的最大长度。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>hours = [9,9,6,0,6,6,9]
<strong>输出：</strong>3
<strong>解释：</strong>最长的表现良好时间段是 [9,9,6]。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>hours = [6,6,6]
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= hours.length &lt;= 10<sup>4</sup></code></li>
<li><code>0 &lt;= hours[i] &lt;= 16</code></li>
</ul>


## 分析

数据规模是 10^4，直接暴力会超时。为了方便，可以将大于 8 的位置赋值 1，其它的位置赋值 -1。问题即是求最长的子数组，其和大于 0。

有关子数组的和的问题，首先想到前缀和。得到前缀数组 pre 后，问题即是求最大的 j-i 使得 pre[i] < pre[j]。

现在的问题非常类似 {{< lc "0962" >}} ，用单调栈即可在 O(N) 时间解决。


## 解答

```python
def longestWPI(self, hours: List[int]) -> int:
	pre = list(accumulate([0]+hours, lambda x, y: x+(1 if y > 8 else -1)))
	stack, n = [], len(pre)
	for i in range(n):
		if not stack or pre[stack[-1]] > pre[i]:
			stack.append(i)
	res = 0
	for j in range(n-1, -1, -1):
		while stack and pre[stack[-1]] < pre[j]:
			res = max(res, j-stack.pop())
	return res
```

220 ms

