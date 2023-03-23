# 0465：最优账单平衡（★★）


> <u>**[力扣第 465 题](https://leetcode.cn/problems/optimal-account-balancing/)**</u>

## 题目

<p>给你一个表示交易的数组 <code>transactions</code> ，其中 <code>transactions[i] = [from<sub>i</sub>, to<sub>i</sub>, amount<sub>i</sub>]</code> 表示 <code>ID = from<sub>i</sub></code> 的人给 <code>ID = to<sub>i</sub></code> 的人共计 <code>amount<sub>i</sub> $</code> 。</p>

<p>请你计算并返回还清所有债务的最小交易笔数。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>transactions = [[0,1,10],[2,0,5]]
<strong>输出：</strong>2
<strong>解释：</strong>
#0 给 #1 $10 。
#2 给 #0 $5 。
需要进行两笔交易。一种结清债务的方式是 #1 给 #0 和 #2 各 $5 。</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>transactions = [[0,1,10],[1,0,1],[1,2,5],[2,0,5]]
<strong>输出：</strong>1
<strong>解释：</strong>
#0 给 #1 $10 。
#1 给 #0 $1 。
#1 给 #2 $5 。
#2 给 #0 $5 。
因此，#1 只需要给 #0 $4 ，所有的债务即可还清。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= transactions.length &lt;= 8</code></li>
<li><code>transactions[i].length == 3</code></li>
<li><code>0 &lt;= from<sub>i</sub>, to<sub>i</sub> &lt; 12</code></li>
<li><code>from<sub>i</sub> != to<sub>i</sub></code></li>
<li><code>1 &lt;= amount<sub>i</sub> &lt;= 100</code></li>
</ul>


## 分析

## 解答


```python
def minTransfers(self, transactions: List[List[int]]) -> int:
	d = defaultdict(int)
	for x, y, z in transactions:
		d[x] -= z
		d[y] += z
	A = [val for val in d.values() if val!=0]
	n = len(A)
	s, vis = [0]*(1<<n), set()
	for state in range(1, 1<<n):
		x = state.bit_length()-1
		s[state] = A[x]+s[state^(1<<x)]
		if s[state]==0:
			vis.add(state)
	dp = [0] * (1<<n)
	for state in range(1, 1<<n):
		if s[state]:
			continue
		dp[state] = 1+max(dp[state^st2] for st2 in vis if state | st2 == state)
	return n-dp[-1]
```

36 ms
