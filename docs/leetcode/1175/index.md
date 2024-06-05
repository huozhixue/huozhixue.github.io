# 1175：质数排列（1489 分）


> <u>**[力扣第 152 场周赛第 1 题](https://leetcode.cn/problems/prime-arrangements/)**</u>

## 题目

<p>请你帮忙给从 <code>1</code> 到 <code>n</code> 的数设计排列方案，使得所有的「质数」都应该被放在「质数索引」（索引从 1 开始）上；你需要返回可能的方案总数。</p>

<p>让我们一起来回顾一下「质数」：质数一定是大于 1 的，并且不能用两个小于它的正整数的乘积来表示。</p>

<p>由于答案可能会很大，所以请你返回答案 <strong>模 mod <code>10^9 + 7</code></strong> 之后的结果即可。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>n = 5
<strong>输出：</strong>12
<strong>解释：</strong>举个例子，[1,2,5,4,3] 是一个有效的排列，但 [5,2,3,4,1] 不是，因为在第二种情况里质数 5 被错误地放在索引为 1 的位置上。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>n = 100
<strong>输出：</strong>682289015
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 100</code></li>
</ul>


## 分析

显然是一个排列问题。如果质数个数为 k，那么结果应该为 k!*(n-k)!。求质数个数可以直接调用 0204 的代码。

## 解答


```python
def numPrimeArrangements(self, n: int) -> int:
	def countPrimes(n):
		flags = [0] * 2 + [1] * (n-2)
		for i in range(2, int(sqrt(n))+1):
			if flags[i]:
				flags[i*i:n:i] = [0] * ((n-1-i*i)//i + 1)
		return sum(flags)
	
	k, M = countPrimes(n+1), 10**9+7
	return reduce(lambda x, y: x*y % M, list(range(2, k+1))+list(range(2, n-k+1)), 1)
```

36 ms
