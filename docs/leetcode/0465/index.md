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

先计算出每人的总债务，该收钱的即为正，该换钱的即为负
- 假如 k 个人的债务和为 0，那么 k-1 次交易即可将这 k 个清零，节省一次交易
- 因此找到一种划分，使得和为 0 的子集数最多， 即得到最小交易数
- 集合划分容易想到状压 dp，令 dp[st] 表示集合 st 最多能划分的和为 0 的子集数，即可递推
- 还可以提前存储集合 st 的和，优化递推时间

## 解答


```python
class Solution:
    def minTransfers(self, transactions: List[List[int]]) -> int:
        ct = defaultdict(int)
        for a,b,w in transactions:
            ct[a] -= w
            ct[b] += w
        A = [a for a in ct.values() if a]
        m = len(A)
        d = defaultdict(int)
        for st in range(1,1<<m):
            x = st.bit_length()-1
            d[st] = d[st^1<<x]+A[x]
        dp = [0]*(1<<m)
        for st in range(1,1<<m):
            dp[st] = (d[st]==0)+max(dp[st^1<<j] for j in range(m) if st&1<<j)
        return m-dp[-1]
```

60 ms
