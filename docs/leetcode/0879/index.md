# 0879：盈利计划（2204 分）


> <u>**[力扣第 95 场周赛第 4 题](https://leetcode.cn/problems/profitable-schemes/)**</u>

## 题目

<p>集团里有 <code>n</code> 名员工，他们可以完成各种各样的工作创造利润。</p>

<p>第 <code>i</code> 种工作会产生 <code>profit[i]</code> 的利润，它要求 <code>group[i]</code> 名成员共同参与。如果成员参与了其中一项工作，就不能参与另一项工作。</p>

<p>工作的任何至少产生 <code>minProfit</code> 利润的子集称为 <strong>盈利计划</strong> 。并且工作的成员总数最多为 <code>n</code> 。</p>

<p>有多少种计划可以选择？因为答案很大，所以<strong> 返回结果模 </strong><code>10^9 + 7</code><strong> 的值</strong>。</p>

<div class="original__bRMd">
<div>


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 5, minProfit = 3, group = [2,2], profit = [2,3]
<strong>输出：</strong>2
<strong>解释：</strong>至少产生 3 的利润，该集团可以完成工作 0 和工作 1 ，或仅完成工作 1 。
总的来说，有两种计划。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 10, minProfit = 5, group = [2,3,5], profit = [6,7,8]
<strong>输出：</strong>7
<strong>解释：</strong>至少产生 5 的利润，只要完成其中一种工作就行，所以该集团可以完成任何工作。
有 7 种可能的计划：(0)，(1)，(2)，(0,1)，(0,2)，(1,2)，以及 (0,1,2) 。</pre>
</div>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= n <= 100</code></li>
<li><code>0 <= minProfit <= 100</code></li>
<li><code>1 <= group.length <= 100</code></li>
<li><code>1 <= group[i] <= 100</code></li>
<li><code>profit.length == group.length</code></li>
<li><code>0 <= profit[i] <= 100</code></li>
</ul>




## 分析

### #1

- 令 f[i][j] 代表 利润>=i，成员<=j 的计划数，遍历工作 <利润 a,成员 b>，即得到递推式
	- f[i][j] = f[i][j]+f[i-a][j-b]
	- 注意边界，当 i<a 时，f[i][j] = f[i][j]+f[0][j-b]，因为初始利润为 0

```python
class Solution:
    def profitableSchemes(self, n: int, minProfit: int, group: List[int], profit: List[int]) -> int:
        mod = 10**9+7
        m = minProfit
        f = [[0]*(n+1) for _ in range(m+1)]
        f[0] = [1]*(n+1)
        for a,b in zip(profit,group):
            for i in range(m,-1,-1):
                for j in range(n,b-1,-1):
                    f[i][j] += f[max(0,i-a)][j-b]
                    f[i][j] %= mod
        return f[-1][-1]
```
986 ms

## 解答

### #2

- 还有个巧妙的容斥方法
	- (利润>=i，成员<=j)=(成员<=j )-(利润<=i-1,成员<=j)
- 因此令 g[j] 代表成员<=j 的计划数，令 f[i][j] 代表利润<=i，成员<=j 的计划数，分别递推再相减即可
- 注意 minProfit 为 0 时，f 不存在

```python
class Solution:
    def profitableSchemes(self, n: int, minProfit: int, group: List[int], profit: List[int]) -> int:
        mod = 10**9+7
        m = minProfit
        g = [1]*(n+1)
        for a in group:
            for j in range(n,a-1,-1):
                g[j] += g[j-a]
                g[j] %= mod
        if m==0:
            return g[-1]
        f = [[1]*(n+1) for _ in range(m)]
        for a,b in zip(profit,group):
            for i in range(m-1,a-1,-1):
                for j in range(n,b-1,-1):
                    f[i][j] += f[i-a][j-b]
                    f[i][j] %= mod
        return (g[-1]-f[-1][-1])%mod
```
439 ms

